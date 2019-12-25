"use strict";

var Response = require('../Classes/Util/Response');
var PushNotification = require('../Controllers/PushNotificationController');
var Customer = require('../Classes/Db/Customer');
var Venue = require('../Classes/Db/Venue');

var IG_ACCOUNT = "joy.tagloy";


module.exports = function(sequelize, DataTypes) {
    return sequelize.define('venue_customer_mapping', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        customer_id: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        venue_id: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        venue_note: {
            type: DataTypes.STRING,
            allowNull: true
        },
        check_in_count: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            defaultValue: '0'
        },
        last_checkin_time: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        is_checkedin: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        feed_count: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        published_feed_count: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        last_feed_time: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        is_blocked: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        is_favourite: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        is_fame: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: true
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        tableName: 'venue_customer_mapping',
        underscored : true,
        classMethods : {

            checkedIn: function (data, success, error) {

                try {

                    
                    var condition = {
                        venue_id: data.venue_id,
                        customer_id: data.customer_id
                    };

                    var customer_notification_model = server._plugins['hapi-sequelize'].new_tagloy.models.customer_notification;

                    var date = new Date();

                    var instance = this;

                    this.find({
                        where: condition
                    }).then(function (datafound) {


                        if (datafound) {

                            if(datafound.is_blocked==1 || datafound.is_favourite==4){
                                return error(Response.sendResponse(false, null, "Sorry! You are restricted in this venue.", status_codes.BAD_REQUEST));                                
                            }

                            var chinInc = 1;
                            //data.dataValues.last_checkin_time
                            if(datafound.dataValues.last_checkin_time){
                                var lchDate = new Date(datafound.dataValues.last_checkin_time);
                                if(lchDate.getDate()==date.getDate()){
                                    chinInc = 0;
                                }
                            }

                            var updated_data = {

                                'check_in_count': datafound.dataValues.check_in_count + chinInc,
                                'last_checkin_time': date.getTime(),
                                'is_checkedin': 1
                            };

                            datafound.updateAttributes(updated_data)
                                .then(function () {

                                    var customer = new Customer(data);
                                    var venue = new Venue(data);

                                    venue.getVenueDetails(function (venue_success) {
                                        //console.log("VENUE SUCCESS: ", venue_success);
                                        var venue_data = venue_success.result;
                                        customer.getCustomerFCMToken(function (token_success) {

                                            console.log("TOKEN: ", token_success);
                                            var token_array = [];
                                            var notification_data_array = [];
                                            if(token_success.notification_flag==1){
                                                token_array.push(token_success.device_token);
                                            }

                                            var notification_data = {
                                                venue_id: data.venue_id,
                                                venue_name: venue_data.name,
                                                message: venue_data.welcome_message,
                                                type: 'welcome',
                                                title: "Welcome to " + venue_data.name
                                            };

                                            notification_data_array.push({
                                                customer_id :  data.customer_id,
                                                notification_data_json : JSON.stringify(notification_data)
                                            });

                                            customer_notification_model.addCustomerNotification(notification_data_array, function(notification_success){
                                                console.log("notification_success: ", notification_success);
                                            }, function(notification_error){
                                                console.log("notification_error: ", notification_error);
                                            });

                                            PushNotification.sendPushNotification(notification_data, token_array, function (error_data) {
                                                console.log("ERROR DATA: ", error_data);
                                            })
                                        }, function (token_error) {
                                            console.log("getCustomerFCMToken Error: ", token_error);
                                        });
                                    }, function (venue_error) {
                                        console.log("VENUE ERROR: ", venue_error);
                                    });

                                   if(datafound!=null){
                                        instance.updateCheckins(datafound, function(){},function(){});
                                   }

                                    return success(Response.sendResponse(true, null, custom_message.ENTRY_UPDATED, status_codes.OK));
                                }, function (err) {

                                    return error(Response.sendResponse(false, null, err.message, status_codes.BAD_REQUEST));
                                })
                        } else {

                            var updated_data = {

                                'check_in_count': 1,
                                'last_checkin_time': date.getTime(),
                                'last_feed_time': date.getTime(),
                                'is_checkedin': 1
                            };

                            instance.build(updated_data);
                            instance.findOrCreate({
                                    where: condition,
                                    defaults: updated_data
                                })
                                .spread(function (user_data, created) {


                                    var customer = new Customer(data);
                                    var venue = new Venue(data);

                                    venue.getVenueDetails(function (venue_success) {
                                        //console.log("VENUE SUCCESS: ", venue_success);
                                        var venue_data = venue_success.result;
                                        customer.getCustomerFCMToken(function (token_success) {
                                            var token_array = [];
                                            var notification_data_array = [];
                                            if(token_success.notification_flag==1){
                                                token_array.push(token_success.device_token);
                                            }

                                            var notification_data = {
                                                venue_id: data.venue_id,
                                                venue_name: venue_data.name,
                                                message: venue_data.welcome_message,
                                                type: 'welcome',
                                                title: "Welcome to " + venue_data.name
                                            };

                                            notification_data_array.push({
                                                customer_id :  data.customer_id,
                                                notification_data_json : JSON.stringify(notification_data)
                                            });

                                            customer_notification_model.addCustomerNotification(notification_data_array, function(notification_success){
                                                console.log("notification_success: ", notification_success);
                                            }, function(notification_error){
                                                console.log("notification_error: ", notification_error);
                                            });

                                            PushNotification.sendPushNotification(notification_data, token_array, function (error_data) {
                                                console.log("ERROR DATA: ", error_data);
                                            })
                                        }, function (token_error) {

                                        });
                                    }, function (venue_error) {
                                        console.log("VENUE ERROR: ", venue_error);
                                    });


                                    if(datafound!=null){
                                        instance.updateCheckins(datafound, function(){},function(){});
                                    }
                                    

                                    return success(Response.sendResponse(true, null, custom_message.ENTRY_ADDED, status_codes.OK));
                                }).catch(function (err) {

                                return error(Response.sendResponse(false, null, err.message, status_codes.BAD_REQUEST));
                            });
                        }
                        // } else {
                        //
                        //     return error(Response.sendResponse(false,null,custom_message.ENTRY_NOT_PRESENT,status_codes.BAD_REQUEST));
                        // }
                    }, function (err) {

                        return error(Response.sendResponse(false, null, err.message, status_codes.BAD_REQUEST));
                    });
                } catch (err) {

                    return error(Response.sendResponse(false, null, err.message, status_codes.INTERNAL_SERVER_ERROR));
                }
            },


            updateEntry: function (data, updated_data, success, error) {

                try {

                    var condition = {
                        venue_id: data.venue_id,
                        customer_id: data.customer_id
                    };

                    this.find({
                        where: condition
                    }).then(function (data) {

                        if (data) {

                            if (data) {

                                data.updateAttributes(updated_data)
                                    .then(function () {

                                        return success(Response.sendResponse(true, null, custom_message.ENTRY_UPDATED, status_codes.OK));
                                    }, function (err) {

                                        return error(Response.sendResponse(false, null, err.message, status_codes.BAD_REQUEST));
                                    })
                            } else {

                                return error(Response.sendResponse(false, null, custom_message.ENTRY_NOT_PRESENT, status_codes.BAD_REQUEST));
                            }
                        } else {

                            return error(Response.sendResponse(false, null, custom_message.ENTRY_NOT_PRESENT, status_codes.BAD_REQUEST));
                        }
                    }, function (err) {

                        return error(Response.sendResponse(false, null, err.message, status_codes.BAD_REQUEST));
                    });
                } catch (err) {

                    return error(Response.sendResponse(false, null, err.message, status_codes.INTERNAL_SERVER_ERROR));
                }
            },

            updateCheckins: function (data, success, error){
                
                var updated_data = {
                    'is_checkedin': 0
                };

                this.update(updated_data, {
                    where : {customer_id : data.dataValues.customer_id, venue_id: { $ne : data.dataValues.venue_id }}
                }).then(function () {
                            return success("Updated");
                    }, function (err) {
                            return error("Error in checkin update");
                    })
               
            },

            isEntryPresent: function (condition, success, error) {

                try {

                    this.find({
                        where: condition
                    }).then(function (success_data) {

                        if (success_data)
                            success(Response.sendResponse(true, success_data.dataValues, "", status_codes.OK));
                        else
                            error(Response.sendResponse(false, null, custom_message.ENTRY_NOT_PRESENT, status_codes.BAD_REQUEST));

                    }, function (error_data) {

                        error(Response.sendResponse(false, null, error_data.message, status_codes.BAD_REQUEST));
                    })

                } catch (err) {

                    error(Response.sendResponse(false, null, err.message, status_codes.INTERNAL_SERVER_ERROR));
                }
            },


            getTop3CustomersForVenue: function (data, success, error) {

                try {

                    /*var condition = {
                        'venue_id': data.venue_id
                    };

                    this.findAll({
                        where: condition,
                        order: [
                            ['published_feed_count', 'DESC']
                        ],
                        limit: 3
                    })*/
                    //sequelize.query("SELECT * FROM venue_customer_mapping INNER JOIN customer ON venue_customer_mapping.customer_id = customer.customer_id WHERE venue_id = '"+data.venue_id+"' ORDER BY venue_customer_mapping.published_feed_count, customer.ig_follower DESC LIMIT 3")
                    //sequelize.query("SELECT t1.customer_id, t1.venue_id, t1.published_feed_count, customer.ig_follower FROM customer INNER JOIN (SELECT customer_id, venue_id, count(*) as published_feed_count FROM tagloy.published_feeds where created_at>= DATE_SUB(NOW(),  INTERVAL 1 HOUR) group by customer_id) as t1 ON t1.customer_id = customer.customer_id WHERE t1.venue_id="+data.venue_id+" ORDER BY t1.published_feed_count, customer.ig_follower DESC LIMIT 3")
                    sequelize.query("SELECT  t1.customer_id as customer_id, t1.venue_id as venue_id, t1.published_feed_count as published_feed_count, customer.ig_follower as ig_follower FROM customer INNER JOIN (SELECT customer_id, venue_id, count(*) as published_feed_count FROM tagloy.published_feeds where created_at>= DATE_SUB(NOW(),  INTERVAL 1 MONTH) group by 1,2) as t1 ON (t1.customer_id = customer.customer_id) WHERE t1.venue_id="+data.venue_id+" AND t1.customer_id NOT IN( SELECT customer_id FROM customer_social_media_mapping WHERE handle LIKE ="+IG_ACCOUNT+") ORDER BY published_feed_count DESC, ig_follower DESC LIMIT 3")
                    .then(function (success_data) {

                        if (success_data)
                            success(Response.sendResponse(true, success_data, "", status_codes.OK));
                        else
                            error(Response.sendResponse(false, null, custom_message.ENTRY_NOT_PRESENT, status_codes.BAD_REQUEST));

                    }, function (error_data) {

                        error(Response.sendResponse(false, null, error_data.message, status_codes.BAD_REQUEST));
                    })


                } catch (err) {

                    error(Response.sendResponse(false, null, err.message, status_codes.INTERNAL_SERVER_ERROR));
                }

            },


            isCheckedIn: function (data, success, error) {

                try {

                    var condition = {
                        venue_id: data.venue_id,
                        customer_id: data.customer_id,
                        is_checkedin: 1
                    };

                    this.find({
                        where: condition
                    }).then(function (data) {
                        
                        if (data) {
                            var res = {};
                            res.isCheckedIn = true;
                            res.isBlocked = data.is_blocked;
                            return success(Response.sendResponse(true, res, custom_message.CHECKEDIN, status_codes.OK));
                        }
                        else {
                            return success(Response.sendResponse(true, {isCheckedIn: false}, custom_message.NOT_CHECKEDIN, status_codes.OK));
                        }
                    }, function (err) {
                        return error(Response.sendResponse(false, null, err.message, status_codes.BAD_REQUEST));
                    });
                } catch (err) {

                    return error(Response.sendResponse(false, null, err.message, status_codes.INTERNAL_SERVER_ERROR));
                }
            },

            removeCheckedInUser: function (updated_data, success, error) {

                try {

                    this.update(updated_data, {
                        where : {}
                    }).then(function (data) {
                        console.log("data: ", data);
                        return success(Response.sendResponse(true, null, custom_message.ENTRY_UPDATED, status_codes.OK));
                    }, function (err) {

                        return error(Response.sendResponse(false, null, err.message, status_codes.BAD_REQUEST));
                    });
                } catch (err) {

                    return error(Response.sendResponse(false, null, err.message, status_codes.INTERNAL_SERVER_ERROR));
                }
            },

            getCheckedInCount: function(data, success, error){
                try {
                    var condition = {
                        customer_id : data.customer_id,
                        venue_id : data.venue_id
                    };
                    this.find({
                        where : condition,
                        attributes : ["check_in_count"]
                    }).then(function(success_data){
                        //console.log("Success Data: ", success_data);
                        if (success_data) {
                            return success(Response.sendResponse(true, success_data, custom_message.CHECKEDIN, status_codes.OK));
                        }
                        else {
                            return success(Response.sendResponse(false, null, custom_message.NOT_CHECKEDIN, status_codes.BAD_REQUEST));
                        }
                    }, function (err) {
                        return error(Response.sendResponse(false, null, err.message, status_codes.BAD_REQUEST));
                    });
                }catch (err){
                    return error(Response.sendResponse(false, null, err.message, status_codes.INTERNAL_SERVER_ERROR));
                }
            },


            getCurrentCheckIn: function(data, success, error){
                try {
                    var condition = {
                        customer_id : data.customer_id,
                        is_checkedin : 1
                    };
                    this.find({
                        where : condition,
                        attributes : ["venue_id", "last_checkin_time", "is_blocked", "is_favourite"],
                        order: [
                            ['last_checkin_time', 'DESC']
                        ]
                    }).then(function(success_data){
                        //console.log("Success Data: ", success_data);
                        if (success_data) {
                            return success(Response.sendResponse(true, success_data, custom_message.CHECKEDIN, status_codes.OK));
                        }
                        else {
                            return success(Response.sendResponse(false, null, custom_message.NOT_CHECKEDIN, status_codes.BAD_REQUEST));
                        }
                    }, function (err) {
                        return error(Response.sendResponse(false, null, err.message, status_codes.BAD_REQUEST));
                    });
                }catch (err){
                    return error(Response.sendResponse(false, null, err.message, status_codes.INTERNAL_SERVER_ERROR));
                }
            }
        }
    });
};
