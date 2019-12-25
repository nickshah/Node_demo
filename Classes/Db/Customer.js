'use strict';

var Client = require('node-rest-client').Client;

var Response = require('../Util/Response');
var CallApi = require('../Util/CallApi');
var JwtTokenGenerator = require('../Util/JwtTokenGenerator');
var UploadFile = require('../Util/UploadFile');

class Customer {

    constructor(data,model) {


        if( model != null )
        {
            this.models = model.customer;
            this.customer_notification_model = model.customer_notification;
        }
        else
        {
            this.models = server._plugins['hapi-sequelize'].new_tagloy.models.customer;
            this.customer_notification_model = server._plugins['hapi-sequelize'].new_tagloy.models.customer_notification;
        }

        //console.log(data.dob);


        //this.url = "http://localhost:33000/organization";
        //this.create_users = "http://localhost:33000/social/organization_user";
        //this.create_organization_user = "http://localhost:33000/organization_user";

        this.create_organization_user = config.util.user_management_url + 'social/organization_user';
        this.login_url = config.util.user_management_url + 'social/login';


        //this.rest_client = new Client();
        //this.rest_client.registerMethod("organization_user", this.create_users, "POST");
        //this.rest_client.registerMethod("create_organization_user", this.create_organization_user, "POST");

        var date;
        if(data.dob!=undefined) {
            var dt = new Date(data.dob);
            date = new Date(dt.getTime() + Math.abs(dt.getTimezoneOffset()*60000));
        }

        this.id =  data.id != undefined ? data.id : null ;
        this.customer_id =  data.customer_id != undefined ? data.customer_id : null ;
        this.email = data.email != undefined ? data.email : null;
        this.first_name = data.first_name != undefined ? data.first_name : null;
        this.dob = date != undefined ? date : null;
        this.gender = data.gender != undefined ? data.gender : 'OTHER';
        this.is_active = data.is_active != undefined ? data.is_active : 1;
        this.feed_count = data.feed_count != undefined ? data.feed_count : 0;
        this.published_feed_count = data.published_feed_count != undefined ? data.published_feed_count : 0;
        this.twt_follower = data.twt_follower != undefined ? data.twt_follower : 0;
        this.facebook_follower = data.facebook_follower != undefined ? data.facebook_follower : 0;
        this.ig_follower = data.ig_follower != undefined ? data.ig_follower : 0;
        this.notification_flag = data.notification_flag != undefined ? data.notification_flag : null;
        this.is_present_on_app = data.is_present_on_app != undefined ? data.is_present_on_app : 0;
        this.image_url = data.image_url != undefined ? data.image_url : null;
        this.twitter_id = data.twitter_id != undefined ? data.twitter_id : null;
        this.facebook_id = data.facebook_id != undefined ? data.facebook_id : null;
        this.instagram_id = data.instagram_id != undefined ? data.instagram_id : null;

        this.tags = data.tags != undefined ? data.tags : null;
        this.device_token = data.device_token != undefined ? data.device_token : null;
        this.device_type = data.device_type != undefined ? data.device_type : null;

        this.profile_image = data.profile_image != undefined ? data.profile_image : null;
        
        this.fb_preferences = data.fb_preferences != undefined ? data.fb_preferences : null;
        this.about_me = data.about_me != undefined ? data.about_me : null;
        this.profession = data.profession != undefined ? data.profession : null;

    }



    /**
     * Create end customer
     * @param success
     * @param error
     */
    createRecord( success , error ) {

        try {
            var user_mgmnt_data = {
                first_name : this.first_name,
                phone_number : '12345'
            };


            if( this.twitter_id !=  null && this.twitter_id != undefined  )
                user_mgmnt_data.twitter_id = this.twitter_id;

            if( this.facebook_id !=  null && this.facebook_id != undefined  )
                user_mgmnt_data.facebook_id = this.facebook_id;

            if( this.instagram_id !=  null && this.instagram_id != undefined  )
                user_mgmnt_data.instagram_id = this.instagram_id;

            var instance = this;

            var api_call = new CallApi( "POST" , this.create_organization_user , user_mgmnt_data  );

            api_call.makeRequest(function( success_data ){

                console.log("Here in api success",success_data);

                instance.customer_id = success_data.result.data.id;

                instance.models.createEntry(instance,function(user){

                    //var user_data = user.result;
                    user.result.role_id = success_data.result.data.role_id;

                    user.result.token = JwtTokenGenerator.createToken(user.result.customer_id, 'CUSTOMER', user.result.role_id);

                    console.log("Customer",user);

                    success(user);
                },function(error_data){

                    console.log("error",error_data);

                    error(error_data);
                });
            },function(error_data){

                console.log("here got error");

                error(error_data);
            });
        }catch (err) {

            console.log(err.message);

            error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
        }
    }

    login(success, error){

        var data = {
            facebook_id : this.facebook_id
        };

        var instance = this;

        var api_call = new CallApi( "POST" , this.login_url , data  );

        api_call.makeRequest(function( success_data ){

            console.log("API FROM: ", success_data);

            if(success_data.is_success==true) {
                delete success_data.result.password;
                instance.models.getUser(success_data.result.id, function (user) {

                    console.log("USER: ", user.result);

                    var user_data = user.result.dataValues;
                    user_data.is_first_time = success_data.result.is_first_time;
                    user_data.role_id = success_data.result.role_id;
                    user_data.twitter_id = success_data.result.twitter_id;
                    user_data.instagram_id = success_data.result.instagram_id;
                    user_data.facebook_id = success_data.result.facebook_id;

                    console.log("TOKEN: ", JwtTokenGenerator.createToken(user_data.customer_id, 'CUSTOMER', user_data.role_id));

                    user_data.token = JwtTokenGenerator.createToken(user_data.customer_id, 'CUSTOMER', user_data.role_id);

                    console.log("USer infor: ", user_data);
                    success(user_data);
                }, function (error) {
                    error(error_data);
                });
            }else{
                error(success_data);
            }

        },function(error_data){

            error(error_data);
        });

    }


    //Check is it use any where

    /**
     * Create venue user
     * @param data
     * @param success
     * @param error
     */
    createVenueUser( success , error ) {

        try {
            var user_mgmnt_data = {
                email : this.email,
                first_name : this.first_name
            };

            var args = {
                data : user_mgmnt_data
            };

            var instance = this;

            this.rest_client.methods.create_organization_user(args,function(data,response){

                console.log(data);

                if (data.is_success) {

                    instance.customer_id = data.result.data.id;

                    instance.models.createEntry(instance,function(success_data){

                        console.log("Customer",success_data);

                        success(success_data);
                    },function(error_data){

                        error(error_data);
                    });
                } else {

                    error(data);
                    //error(data);
                }
            });
        }catch (err) {

            console.log(err.message);

            error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
        }
    }


    updateFollowers( success , error ) {

        try {

            var condition = {
                customer_id : this.customer_id
            };


            var updated_data = {
                "twt_follower" : this.twt_follower,
                "ig_follower" : this.ig_follower
                //"image_url" : this.image_url
            };


            this.models.updateEntry(condition,updated_data,function(success_data){

                success(success_data);
            },function(error_data){

                error(error_data);
            });
        }catch (err) {

            error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
        }
    }

    getCustomerStats (success, error){
        try{

            this.models.getStats( this,function(success_data) {

                success( success_data );
            },function( error_data ) {

                error( error_data );
            })


        }catch(err){

        }
    }

    updateFireBaseToken( success , error ) {

        try {

            var condition = {
                customer_id : this.customer_id
            };


            var updated_data = {
                device_token : this.device_token,
                device_type : this.device_type
            };


            this.models.updateEntry(condition,updated_data,function(success_data){

                //console.log("Success Data Customer: ", success_data);

                success(success_data);
            },function(error_data){

                error(error_data);
            });
        }catch (err) {

            error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
        }
    }

    getCustomerFCMToken (success, error){
        try {
            this.models.getUser(this.customer_id,function(success_data){



                //console.log("Success Data Customer: ", success_data.result.dataValues);

                success(success_data.result.dataValues);
            },function(error_data){

                error(error_data);
            });
        }catch (err) {

            error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
        }
    }

    getCustomerProfile(success, error){

        this.models.getUser(this.customer_id, function(user){

            console.log("Customer",user);

            success(user);
        },function(error_data){

            console.log("error",error_data);

            error(error_data);
        });
    }


    updateProfile(success, error){

        var condition = {
            customer_id : this.customer_id
        };

        var updated_data = {};

        console.log("this.notification_flag: ", this.notification_flag);

        if(this.first_name != null)
            updated_data.first_name = this.first_name;

        if(this.dob != null)
            updated_data.dob = this.dob;

        if(this.gender != 'OTHER')
            updated_data.gender = this.gender;

        if(this.facebook_follower != 0)
            updated_data.facebook_follower = this.facebook_follower;

        if(this.ig_follower != 0)
            updated_data.ig_follower = this.ig_follower;

        if(this.notification_flag != null)
            updated_data.notification_flag = this.notification_flag;

        if(this.tags != null)
            updated_data.tags = this.tags;

        if(this.device_type != null)
            updated_data.device_type = this.device_type;

        if(this.fb_preferences != null)
            updated_data.fb_preferences = this.fb_preferences;

        if(this.about_me != null)
            updated_data.about_me = this.about_me;
        
        if(this.profession != null)
            updated_data.profession = this.profession;

        if(this.image_url != null)
            updated_data.image_url = this.image_url;
        


        console.log("updated_data: ", updated_data);

        if(this.profile_image != null)
        {
            var image_upload = new UploadFile(this.profile_image);

            image_upload.uploadImage( (success_data) => {

                updated_data.image_url = success_data.result.filename;

                this.models.updateEntry(condition, updated_data, function(user){

                    console.log("Customer",user);

                    success(user);
                },function(error_data){

                    console.log("error",error_data);

                    error(error_data);
                });

            },(err) => {

                error(err);
            });
        }
        else
        {
            this.models.updateEntry(condition, updated_data, function(user){

                console.log("Customer",user);

                success(user);
            },function(error_data){

                console.log("error",error_data);

                error(error_data);
            });
        }


    }


    getCustomerNotification(success, error){

        this.customer_notification_model.getCustomerNotification(this.customer_id, function(user){

            console.log("Customer",user);

            success(user);
        },function(error_data){

            console.log("error",error_data);

            error(error_data);
        });
    }

    isAppCustomer(success, error){

        this.models.getUser(this.customer_id, function(user){

            console.log("Customer found: ",user);

            if(user.result.dataValues.is_present_on_app){
                success(true);
            }else{
                error(false);
            }
        },function(error_data){

            console.log("error",error_data);

            error(error_data);
        });
    }
}


module.exports = Customer;