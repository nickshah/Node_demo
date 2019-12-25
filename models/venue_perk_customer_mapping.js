"use strict";

var Response = require('../Classes/Util/Response');
var PushNotification = require('../Controllers/PushNotificationController');
var Customer = require('../Classes/Db/Customer');
var Venue = require('../Classes/Db/Venue');
var VenueCustomerMapping = require('../Classes/Db/VenueCustomerMapping');
var status_code = require('../util/status_codes');

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('venue_perk_customer_mapping', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        venue_perk_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        customer_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        is_claimed: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            defaultValue: '0'
        },
        assigned_timestamp: {
            type: DataTypes.DATE,
            allowNull: true
            //defaultValue: 'CURRENT_TIMESTAMP'
        },
        claimed_timestamp: {
            type: DataTypes.BIGINT,
            allowNull: true
        },
        expired_timestamp: {
            type: DataTypes.BIGINT,
            allowNull: true
        },
        unique_id: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        tableName: 'venue_perk_customer_mapping',
        underscored: true,
        classMethods : {

            createEntry: function (data, success,error) {

                try {

                    this.build(data);

                    this.create(data)
                        .then(function (created_data) {

                                success(Response.sendResponse(true,created_data.dataValues,custom_message.ENTRY_ADDED,status_codes.OK));
                            }, function (err) {

                                error(Response.sendResponse(false,null,err.message,status_codes.BAD_REQUEST));
                            }
                        );
                } catch (err) {

                    error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
                }
            },
            
            redeemPerk: function (data, success, error) {
                try{

                    var customer_notification_model = server._plugins['hapi-sequelize'].new_tagloy.models.customer_notification;

                    sequelize.query("CALL REDEEM_PERK(:venue_perk_id, :organization_id, :customer_id, :redeem_time);",
                        {replacements : {venue_perk_id : data.venue_perk_id, organization_id : data.organization_id, customer_id: data.customer_id, redeem_time: data.redeem_time}})
                        .then(function(result) {

                            console.log("SUCCESS: ", result);

                            if (result) {
                                console.log("IN IF: ", result[0].status);

                                var status = result[0].status;

                                var requestData = {
                                    venue_id : data.organization_id,
                                    customer_id : data.customer_id
                                };

                                var customer = new Customer(requestData);
                                var venue = new Venue(requestData);
                                var venueCustomerMapping = new VenueCustomerMapping(requestData, null);

                                console.log('venueCustomerMapping: ', venueCustomerMapping);;

                                venue.getVenueDetails(function(venue_success){
                                    //console.log("VENUE SUCCESS: ", venue_success);
                                    var venue_data = venue_success.result;
                                    customer.getCustomerFCMToken(function(token_success){
                                        var token_array = [];
                                        var notification_data_array = [];
                                        if(token_success.notification_flag==1){
                                            token_array.push(token_success.device_token);
                                        }

                                        console.log("Status: ", status);

                                        var notification_data = {};
                                        var response_data = {};
                                        if(status == -1)
                                        {
                                            notification_data = {
                                                venue_id : venue_data.venue_id,
                                                venue_name : venue_data.name,
                                                message : "Check the Perk's validity date and time",
                                                title : "Oops!"
                                            };

                                            response_data = {
                                                is_success : false,
                                                result : null,
                                                message : notification_data.message,
                                                status_code : status_code.BAD_REQUEST
                                            }
                                        }
                                        else if(status == 0)
                                        {
                                            notification_data = {
                                                venue_id : venue_data.venue_id,
                                                venue_name : venue_data.name,
                                                message : "Hi! This perk has been claimed before.",
                                                title : "Oops!"
                                            };

                                            response_data = {
                                                is_success : false,
                                                result : null,
                                                message : notification_data.message,
                                                status_code : status_code.BAD_REQUEST
                                            }
                                        }
                                        else
                                        {
                                            notification_data = {
                                                venue_id : data.venue_id,
                                                venue_name : venue_data.name,
                                                message : "Hi! You have successfully redeemed your perk at " + venue_data.name + ". Thank You! Visit again!",
                                                title : "Hurray!",
                                                status : status_codes.OK
                                            };

                                            response_data = {
                                                is_success : true,
                                                result : null,
                                                message : notification_data.message,
                                                status_code : status_code.OK
                                            }
                                        }

                                        if(status == 1)
                                        {
                                            venueCustomerMapping.isCheckedIn(function(isCheckInSuccess){
                                                console.log("isCheckInSuccess: ", isCheckInSuccess);
                                                if(!isCheckInSuccess.result.isCheckedIn)
                                                {
                                                    venueCustomerMapping.checkedIn(function(checkInSuccess){

                                                    }, function(checkInError){
                                                        //TODO:Update Venue Perk Customer Mapping
                                                        //UPDATE venue_perk_customer_mapping SET is_claimed=1, claimed_timestamp = UNIX_TIMESTAMP() WHERE venue_perk_id = perk_id AND customer_id=cust_id;
                                                    });
                                                }

                                                notification_data_array.push({
                                                    customer_id :  data.customer_id,
                                                    notification_data_json : JSON.stringify(notification_data)
                                                });

                                                customer_notification_model.addCustomerNotification(notification_data_array, function(notification_success){
                                                    console.log("notification_success: ", notification_success);
                                                }, function(notification_error){
                                                    console.log("notification_error: ", notification_error);
                                                });

                                                PushNotification.sendPushNotification(notification_data, token_array, function(error_data){
                                                    console.log("ERROR DATA: ", error_data);
                                                });
                                                return success(response_data);
                                            },function(isCheckInError){
                                                error(isCheckInError);
                                            });
                                        }
                                        else
                                        {
                                            notification_data_array.push({
                                                customer_id :  data.customer_id,
                                                notification_data_json : JSON.stringify(notification_data)
                                            });

                                            customer_notification_model.addCustomerNotification(notification_data_array, function(notification_success){
                                                console.log("notification_success: ", notification_success);
                                            }, function(notification_error){
                                                console.log("notification_error: ", notification_error);
                                            });

                                            PushNotification.sendPushNotification(notification_data, token_array, function(error_data){
                                                console.log("ERROR DATA: ", error_data);
                                            });
                                            return success(response_data);
                                        }
                                    }, function(token_error){

                                    });
                                }, function(venue_error){
                                    console.log("VENUE ERROR: ", venue_error);
                                });
                            } else {

                                return error(Response.sendResponse(false,null,custom_message.ENTRY_NOT_PRESENT,status_codes.BAD_REQUEST));
                            }

                        });

                }catch(err) {
                    error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
                }
            }
            
            
        }
    });
};
