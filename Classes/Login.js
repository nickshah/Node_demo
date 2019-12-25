'use strict';

var JwtTokenGenerator = require('./Util/JwtTokenGenerator');
var Response = require('./Util/Response');
var EmailEvents = require('./Util/EmailEvents');
var CallApi = require('./Util/CallApi');
var RbacController = require('../Controllers/RbacController');
var Venue = require('../Classes/Db/Venue');

var PendingEmails = require('./Db/PendingEmails');


class Login{

    constructor( data ) {

        this.login_url = config.util.user_management_url + 'login';
        this.update_password = config.util.user_management_url + 'updatepassword';
        this.forgot_password = config.util.user_management_url + 'forgotpassword';
        this.verify_email = config.util.user_management_url + 'verifyemail';

        //Attributes

        this.email = data.email != undefined ? data.email : null ;
        this.password = data.password != undefined ? data.password : null ;
        this.organization_id = data.organization_id != undefined ? data.organization_id : null ;

        this.token = data.token != undefined ? data.token : null;
        this.encrypted_user_id = data.encrypted_user_id != undefined ? data.encrypted_user_id : null;

    }

    makeLogin(hostname, success , error ) {

        try {

            var data = {
                email: this.email,
                password: this.password
            };

            if (this.organization_id != null)
                data.organization_id = this.organization_id;

            var api_call = new CallApi( "POST" , this.login_url , data  );

            api_call.makeRequest(function( success_data ){

                var role = {
                    role_id : success_data.result.role_id
                };

                RbacController.getFeaturesByRole(role, function(response){

                    var features_list = response;

                    console.log("hostname: ", hostname);
                    console.log("config.util.manager_host: ", config.util.manager_host);

                    if(hostname == config.util.manager_host)
                    {
                        var tempList = [];
                        var manager_roles = config.util.manager_roles;
                        console.log("manager_roles: ", manager_roles);
                        console.log("features_list: ", features_list);
                        for (var i = 0; i < manager_roles.length; i++)
                        {
                            for (var j = 0; j < features_list.length; j++)
                            {
                                if(features_list[j].name == manager_roles[i].name)
                                {
                                    console.log("features_list[j]: ", features_list[j]);
                                    tempList.push(features_list[j]);
                                    break;
                                }
                            }
                        }
                        features_list = tempList;
                    }
                    else
                    {
                        var tempList = [];
                        var manager_roles = config.util.manager_roles;
                        for (var i = 0; i < features_list.length; i++)
                        {
                            var is_present = false;
                            for (var j = 0; j < manager_roles.length; j++)
                            {
                                if(features_list[i].name == manager_roles[j].name)
                                {
                                    is_present = true;
                                    break;
                                }
                            }

                            if(!is_present)
                            {
                                console.log("features_list[i]: ", features_list[i]);
                                tempList.push(features_list[i]);
                            }
                        }
                        features_list = tempList;
                    }

                    console.log("Response from RBAC: ", features_list);
                    success_data.result.features = features_list;
                    success_data.result.token = JwtTokenGenerator.createToken(success_data.result.id, success_data.result.group, success_data.result.role_id);
                    delete success_data.result.password;
                    success(success_data);
                });

            },function(error_data){

                
                if(error_data.result != null && error_data.status_code == status_codes.BAD_REQUEST)
                {
                    
                    console.log("inside if  --- ");
                    var venue = new Venue({});

                    console.log("inside if 2 --- ");
                    var venue_list = error_data.result;

                    venue.getAllVenues(function(venue_success_data){

                        console.log("inside getAllVenues  --- ");

                        var venue_data = venue_success_data.result;

                        console.log("venue_data --- ", venue_data);
                        var tempList = [];
                        for(var i = 0; i < venue_list.length; i++)
                        {
                            var temp = venue_list[i];
                            for(var j = 0; j < venue_data.length; j++)
                            {
                                if(venue_data[j].venue_id == venue_list[i].organization_id)
                                {
                                    temp.address = venue_data[j].address;
                                }
                            }
                            
                            tempList.push(temp);
                        }

                        error_data.result = tempList;
                        error(error_data);
                        console.log("ERRORR: ", error_data);
                    }, function(venue_error_data){
                        console.log("inside error clause --- ");
                        error(error_data);
                        console.log("ERRORR: ", error_data);
                    });
                }
                else {
                    error(error_data);
                }

            });
        }catch (err) {

            console.log(err.message);
            console.log("Login.js failure Data: ", err);
            error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
        }
    };

    updatePassword( success , error  ) {

        try {

            var data = {
                encrypted_user_id: this.encrypted_user_id,
                token: this.token,
                password : this.password
            };

            var api_call = new CallApi( "POST" , this.update_password , data  );
            api_call.makeRequest(function( success_data ){

                success(success_data);
            },function(error_data){

                error(error_data);
            });

        }catch (err) {

            error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
        }
    };

    forgotPassword( success , error ) {

        try {

            var data = {
                email : this.email
            };

            var api_call = new CallApi( "POST" , this.forgot_password , data  );
            api_call.makeRequest(function( data ){

                var token = data.result.forgot_password_email_data.verification_token;
                var encrypted_user_id = data.result.forgot_password_email_data.encrypted_user_id;

                var url = config.util.url_forgot + "/" + token + "/" + encrypted_user_id;
                console.log('url: ', url);
                var send_email_data = {
                    url: url
                };

                var event_data = {
                    email : data.result.email,
                    email_template  : EmailEvents.forgot_password.template,
                    email_event  : EmailEvents.forgot_password.subject,
                    data : send_email_data
                };

                emitter.emit('send_mail', JSON.stringify(event_data));
                success(Response.sendResponse(true,null,custom_message.FORGOT_PASSWORD_LINK_SENT,status_codes.OK));

            },function(error_data){

                error(error_data);
            });
        }catch (err) {

            error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
        }
    };


    verifyEmail ( success , error ) {

        try {

            var data = {
                encrypted_user_id: this.encrypted_user_id,
                token: this.token
            };

            if( this.password != null && this.password != undefined )
                data.password = this.password;


            var api_call = new CallApi( "POST" , this.verify_email , data  );
            api_call.makeRequest(function( success_data ){

                var pending_email = new PendingEmails(success_data.result);

                pending_email.sendPendingEmails(function(success_data){

                },function(error_data){

                    return error(error_data);
                });

                success(success_data);
            },function(error_data){

                error(error_data);
            });
        }catch (err) {

            error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
        }
    }
}

module.exports = Login;