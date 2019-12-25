"use strict";

var Response = require('../../Util/Response');
var async = require('async');
var PushNotification = require('../../../Controllers/PushNotificationController');


class VenuePerks {

    constructor( data , model ) {

        if( model != null )
        {
            this.models = model.venue_perks;
            this.venue_perk_customer_mapping_model = model.venue_perk_customer_mapping;
            this.customer_model = model.customer;
        }
        else
        {
            this.models = server._plugins['hapi-sequelize'].new_tagloy.models.venue_perks;
            this.venue_perk_customer_mapping_model = server._plugins['hapi-sequelize'].new_tagloy.models.venue_perk_customer_mapping;
            this.customer_model = server._plugins['hapi-sequelize'].new_tagloy.models.customer;
        }

        this.venue_id = data.venue_id != undefined ? data.venue_id : null;
        this.array_of_records = data.array != undefined ? data.array : null;

        this.id =  data.id != undefined ? data.id : null ;
        this.name = data.name != undefined ? data.name : null ;
        this.type = data.type != undefined ? data.type : null ;
        this.offer_type =  data.offer_type != undefined ? data.offer_type : null ;
        this.description = data.description != undefined ? data.description : null ;
        this.amount = data.amount != undefined ? data.amount : null ;
        this.expiry = data.expiry != undefined ? data.expiry : null ;
        this.tag_count = data.tag_count != undefined ? data.tag_count : 0 ;
        this.check_in_count = data.check_in_count != undefined ? data.check_in_count : 0 ;
        this.valid_on = data.valid_on != undefined ? data.valid_on : 0;
        this.f_start_time = data.f_start_time != undefined ? data.f_start_time : 0;
        this.f_end_time = data.f_end_time != undefined ? data.f_end_time : 0;
        this.s_start_time = data.s_start_time != undefined ? data.s_start_time : null;
        this.s_end_time = data.s_end_time != undefined ? data.s_end_time : null;
        this.message = data.message != undefined ? data.message : 0;
        this.sponsorer = data.sponsorer != undefined ? data.sponsorer : 0;
        this.terms = data.terms != undefined ? data.terms : 0;
        this.is_enabled = data.is_enabled != undefined ? data.is_enabled : 0;

        this.user_ids = data.user_ids != undefined ? data.user_ids : [];
        this.is_customer_perk = 1;
    }

    /**
     * Insert multiple records in OrganizationRoleMapping
     * @param success
     * @param error
     */
    createMultipleRecords(success,error) {

        try {

            this.models.insertMultipleRecords(this.array_of_records,function(response_data){

                success(response_data);
            },function(error_data){

                error(error_data);
            });
        }catch (err) {

            error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
        }
    };



    getPerksForVenue( success , error ) {

        try {

            this.models.getPerksForVenue(this, function (response_data) {

                success(response_data);
            }, function (error_data) {

                error(error_data);
            });
        }catch (err) {

            error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
        }
    }


    getCustomPerksForVenue( success , error ) {

        try {

            this.models.getCustomPerksForVenue(this, function (response_data) {

                success(response_data);
            }, function (error_data) {

                error(error_data);
            });
        }catch (err) {

            error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
        }
    }

    getDataForUpdate() {

        var key_array = [
            "id" , "name" , "type" , "offer_type"  , "description" , "amount", "expiry", "tag_count" ,
            "check_in_count", "valid_on" ,
            "f_start_time" , "f_end_time" , "s_start_time" , "s_end_time" , "message",
            "sponsorer" , "terms" , "is_enabled","venue_id"
        ];

        var data = {};

        //console.log('perk update request', this);
        for(  let i =0 ; i < key_array.length ; i++   ) {

            if(  this[key_array[i]] == null   ) {

                data[key_array[i]] = null;
                //delete key_array[i];
            } //else {
                

                data[key_array[i]] = this[key_array[i]];
            //}
        }
        return data;
    }

    updatePerk ( success , error ) {

        try {

            var updated_data = this.getDataForUpdate();

            console.log("updated",updated_data);

            this.models.updatePerksForVenue(updated_data,function(success_data){

                success(success_data);
            },function(error_data){

                error(error_data);
            })

        }catch (err) {

            error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
        }
    }


    checkPerkIsEnabledOrNot( success , error ) {

        try {

            this.models.checkPerkIsEnabledOrNotForVenue(this , function(success_data){

                success(success_data);
            },function(error_data){

                error(error_data);
            })
        }catch (err) {

            error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
        }
    }

    createPerkReplica( success , error ) {

        try {

            var customer_notification_model = server._plugins['hapi-sequelize'].new_tagloy.models.customer_notification;
            var instance = this;
            this.models.createPerkReplica(this , function(success_data_id){

                if(success_data_id > 0)
                {
                    var result = [];
                    var device_tokens = [];
                    var notification_data_array = [];
                    async.each(instance.user_ids, function (item,done,callback) {


                        var data = {
                            venue_perk_id : success_data_id,
                            customer_id : item
                        };
                        console.log("CREATE ENTRY item: ", item);
                        instance.venue_perk_customer_mapping_model.createEntry(data, function(success_data){
                            console.log("CREATE ENTRY success_data: ", success_data);
                            result.push(success_data);
                            instance.customer_model.getUser(data.customer_id, function(success_data_user){
                                console.log("GET USER success_data: ", success_data_user.result.dataValues.device_token);
                                if(success_data_user.result.dataValues.notification_flag==1){
                                    device_tokens.push(success_data_user.result.dataValues.device_token);
                                }
                                if(result.length == instance.user_ids.length)
                                {
                                    done(success_data);
                                }
                            }, function(error_data_user){
                                console.log("GET USER error_data: ", error_data_user);
                                error(error_data_user);
                            });
                        }, function(error_data){
                            console.log("CREATE ENTRY error_data: ", error_data);
                            error(error_data);
                        });
                    }, function (data) {

                        var venue_model = server._plugins['hapi-sequelize'].new_tagloy.models.venue;

                        venue_model.getVenueDetails(instance, function(venue_data){
                            var venue_name = venue_data.result.name;

                            var notification_data = {
                                venue_id : instance.venue_id,
                                message : "Congratulations, you have received a new perk.",
                                title : "Tagloy",
                                type: 'perk',
                                venue_name : venue_name
                            };

                            for(var i = 0; i < instance.user_ids.length; i++)
                            {
                                notification_data_array.push({
                                    customer_id :  instance.user_ids[i],
                                    notification_data_json : JSON.stringify(notification_data)
                                });
                            }

                            customer_notification_model.addCustomerNotification(notification_data_array, function(notification_success){
                                console.log("notification_success: ", notification_success);
                            }, function(notification_error){
                                console.log("notification_error: ", notification_error);
                            });

                            PushNotification.sendPushNotification(notification_data, device_tokens, function(error_data){
                                console.log("ERROR DATA: ", error_data);
                            });
                        }, function(venue_error){
                            var notification_data = {
                                venue_id : instance.venue_id,
                                message : "Congratulations, you have received a new perk.",
                                title : "Tagloy",
                                type: 'perk',
                                venue_name : ""
                            };

                            for(var i = 0; i < instance.user_ids.length; i++)
                            {
                                notification_data_array.push({
                                    customer_id :  instance.user_ids[i],
                                    notification_data_json : JSON.stringify(notification_data)
                                });
                            }

                            customer_notification_model.addCustomerNotification(notification_data_array, function(notification_success){
                                console.log("notification_success: ", notification_success);
                            }, function(notification_error){
                                console.log("notification_error: ", notification_error);
                            });

                            PushNotification.sendPushNotification(notification_data, device_tokens, function(error_data){
                                console.log("ERROR DATA: ", error_data);
                            });
                        });





                        success(data);

                        console.log("DEVICE TOKEN: ", device_tokens);
                    });
                }
            },function(error_data_id){

                error(error_data_id);
            })
        }catch (err) {

            error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
        }

    }


    isStarPerkEnabled( success , error ) {
        
                try {
        
                    this.models.isStarPerkEnabled(this,function (success_data) {
                        console.log("isStarPerkEnabled------------------------------------------------",success_data);
                        success(success_data[0][0].isStarEnabled);
                    }, function (error_data) {
        
                        error(error_data);
                    })
                }catch (err) {
        
                    error(Response.sendResponse(false, null, err.message, status_codes.INTERNAL_SERVER_ERROR));
                }
    }


}


module.exports = VenuePerks;