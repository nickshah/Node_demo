'use strict';

var Response = require('../Util/Response');
var StatusCode = require('../Util/StatusCodes');
var CallApi = require('../Util/CallApi');
var Customer = require('./Customer');

class CustomerSocialMediaMapping {

    constructor(data,model) {

        console.log(server._plugins['hapi-sequelize']);

        if( model != null )
            this.models = model.customer_social_media_mapping;
        else
            this.models = server._plugins['hapi-sequelize'].new_tagloy.models.customer_social_media_mapping;


        console.log("data.customer_id"+data.customer_id);

        this.customer_id = data.customer_id != undefined ? data.customer_id : null;
        this.social_media_id = data.social_media_id != undefined ? data.social_media_id : null;
        this.auth_token = data.auth_token != undefined ? data.auth_token : null;
        this.app_id = data.app_id != undefined ? data.app_id : null;
        this.secret_key = data.secret_key != undefined ? data.secret_key : null;
        this.handle = data.handle != undefined ? data.handle : null;

        this.instagram_id = data.instagram_id != undefined ? data.instagram_id : null;


        this.twt_follower = data.twt_follower != undefined ? data.twt_follower : null;
        this.ig_follower = data.ig_follower != undefined ? data.ig_follower : null;

        this.link_account = config.util.user_management_url + 'social/link-account';

    }


    checkHandlePresent( success,error ){

        try {

            var condition = {
                handle : this.handle,
                social_media_id : this.social_media_id
            };

            this.models.checkHandlePresent(condition,function(success_data){

                //Update the customer details from here


                success(success_data);
            },function(error_data){

                error(error_data);
            });

        }catch (err) {

            error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
        }
    }

    linkSocialAccount( success,error ){

        try {

            var condition = {
                handle : this.handle,
                social_media_id : this.social_media_id
            };
            var instance = this;

            this.models.checkHandlePresent(condition,function(success_data){

                //Update the customer details from here
                console.log("old customer id"+success_data.result.customer_id);
                console.log("new customer id"+instance.customer_id);

                var dt = {
                    'customer_id': success_data.result.customer_id
                }
                var cus = new Customer(dt);

                cus.isAppCustomer(function(succ){
                    
                    error(Response.sendResponse(false,null,custom_message.ALREADY_LINKED,status_codes.BAD_REQUEST));
                
                }, function(error){

                    if(success_data.result.customer_id == instance.customer_id){
                        success(success_data);
                    }else{
                
                        var data = {
                            cus_id : instance.customer_id,
                            old_cus_id : success_data.result.customer_id
                        };
                
                        instance.models.updateCustomerIds(data, function (success_data) {
                
                            var data = {
                                customer_id : instance.customer_id,
                                social_media_id : instance.social_media_id,
                                handle : instance.handle
                            };
                
                            console.log("success_data: API: ", success_data);
                
                            var api_call = new CallApi( "POST" , instance.link_account , data  );
                
                            api_call.makeRequest(function(success_data_api){
                                success(success_data_api);
                            }, function(error_data_api){
                                error(error_data_api);
                            });
                
                        }, function (error) {
                            error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
                         })
                
                    }
                });
                
            },function(error_data){

                if(error_data.message == custom_message.CUSTOMER_SOCIAL_MEDIA_MAPPING_NOT_PRESENT){


                    var social_media_mapping = {

                        customer_id : instance.customer_id,
                        handle : instance.handle,
                        social_media_id : instance.social_media_id
                    };

                    console.log("social_media_mapping: ", social_media_mapping);
                    instance.models.createEntry(social_media_mapping, function (success_data) {
                        //success(success_data);

                        console.log("instance.link_account: ", success_data);

                        var data = {
                            customer_id : instance.customer_id,
                            social_media_id : instance.social_media_id,
                            handle : instance.handle
                        };

                        console.log("instance.link_account: ", data);

                        var api_call = new CallApi( "POST" , instance.link_account , data  );

                        api_call.makeRequest(function(success_data_api){
                            success(success_data_api);
                        }, function(error_data_api){
                            error(error_data_api);
                        });

                    }, function (error_data) {
                        error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
                    });

                }else {
                    error(error_data);
                }
            });

        }catch (err) {

            error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
        }
    }


    createRecord( success , error ) {

        try {

            this.models.createEntry(this,function(success_data){

                success(success_data);
            },function(error_data){

                error(error_data);
            });
        }catch (err) {

            error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
        }
    }
}


module.exports = CustomerSocialMediaMapping;