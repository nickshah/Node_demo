"use strict";

var Response = require('../Util/Response');
var QB = require('quickblox');
var social_media_details = require('../../config/social_media_details');
var async = require('async');
var Venue = require('../../Classes/Db/Venue');

class VenueCustomerMapping {

    constructor( data , model  )  {

        if( model != null )
        {
            this.models = model.venue_customer_mapping;
            this.venue_model = model.venue;
            this.v_customer_details_for_venue = model.v_customer_details_for_venue;
            this.venue_customer_mapping = model.venue_customer_mapping;
            //console.log("model is null");
        }
        else{
            //console.log("model is not null", server._plugins['hapi-sequelize'].new_tagloy.models);
            this.models = server._plugins['hapi-sequelize'].new_tagloy.models.venue_customer_mapping;
            this.venue_model = server._plugins['hapi-sequelize'].new_tagloy.models.venue;
            this.v_customer_details_for_venue = server._plugins['hapi-sequelize'].new_tagloy.models.v_customer_details_for_venue;
            this.venue_customer_mapping = server._plugins['hapi-sequelize'].new_tagloy.models.venue_customer_mappingss;
        }

        console.log(data);

        if(data.venue_id != undefined) {
            this.venue_id = data.venue_id;
        }else{
            this.venue_id = null;
        }

        this.customer_id = data.customer_id != undefined ? data.customer_id : null;
        this.is_blocked = data.is_blocked != undefined ? data.is_blocked : null;
        this.is_favourite = data.is_favourite != undefined ? data.is_favourite : null;
        this.venue_note = data.venue_note != undefined ? data.venue_note : null;

        if(data.page) {
            this.page = data.page;
        }else{
            this.page = 0;
        }

        this.CREDENTIALS = {
            appId: social_media_details.quickblox.appId,
            authKey: social_media_details.quickblox.authKey,
            authSecret: social_media_details.quickblox.authSecret
        };

    }

    checkedIn( success , error ) {

        try {

           /* var condition = {
                customer_id : this.customer_id,
                venue_id : this.venue_id,
                //Check user blocked or not
                is_blocked : 1
            };

            var insta = this;
            this.models.isEntryPresent(condition,function (error_data) {
                //If present return error
                return error(Response.sendResponse(false,null,custom_message.CUSTOMER_BANNED_FOR_VENUE,status_codes.BAD_REQUEST));
            }, function (success_data) {
                insta.models.checkedIn(this,function (success_data) {
                        success(success_data);
                }, function (error_data) {
                        error(error_data);
                })
            })*/

            this.models.checkedIn(this,function (success_data) {
                success(success_data);
            }, function (error_data) {
                error(error_data);
            });
        }catch (err) {

            error(Response.sendResponse(false, null, err.message, status_codes.INTERNAL_SERVER_ERROR));
        }
    }


    isCheckedIn( success , error ) {

        try {

            this.models.isCheckedIn(this,function (success_data) {

                success(success_data);
            }, function (error_data) {

                error(error_data);
            })
        }catch (err) {

            error(Response.sendResponse(false, null, err.message, status_codes.INTERNAL_SERVER_ERROR));
        }
    }



    makeCustomerBanned( success , error ) {

        try {

            var updated_data = {
                'is_blocked' : this.is_blocked
            };

            var instance = this;

            this.models.updateEntry(this,updated_data,function (success_data) {

                var condition = {
                    venue_id : instance.venue_id,
                    'customer_id' : instance.customer_id
                };

                console.log("this.page: ", instance.page);

                instance.v_customer_details_for_venue.getCustomerForVenue(condition,instance.page, function (success_data) {

                    success_data.message = (instance.is_blocked == 1) ? custom_message.CUSTOMER_BANNED_FOR_VENUE : custom_message.CUSTOMER_UNBANNED_FOR_VENUE;
                    success(success_data);
                }, function (error_data) {

                    error(error_data);
                });


            }, function (error_data) {

                error(error_data);
            })
        }catch (err) {

            error(Response.sendResponse(false, null, err.message, status_codes.INTERNAL_SERVER_ERROR));
        }
    }

    makeCustomerFavourite( success , error  ) {

        try {

            var updated_data = {
                is_favourite : this.is_favourite
            };

            var instance = this;

            this.models.updateEntry(this,updated_data,function (success_data) {

                var condition = {
                    venue_id : instance.venue_id,
                    'customer_id' : instance.customer_id
                };

                console.log("this.page: ", instance.page);

                instance.v_customer_details_for_venue.getCustomerForVenue(condition,instance.page, function (success_data) {

                    success_data.message = (instance.is_favourite == 1) ? custom_message.CUSTOMER_FAVOURITE_FOR_VENUE : custom_message.CUSTOMER_UNFAVOURITE_FOR_VENUE;
                    success(success_data);
                }, function (error_data) {

                    error(error_data);
                });
            }, function (error_data) {

                error(error_data);
            })
        }catch (err) {

            error(Response.sendResponse(false, null, err.message, status_codes.INTERNAL_SERVER_ERROR));
        }
    }


    addVenueNote( success , error ) {

        try {

            var updated_data = {
                venue_note : this.venue_note
            };

            var instance = this;

            this.models.updateEntry(this,updated_data,function (success_data) {

                var condition = {
                    venue_id : instance.venue_id,
                    customer_id : instance.customer_id
                };

                console.log("this.page: ", instance.page);

                instance.v_customer_details_for_venue.getCustomerForVenue(condition,instance.page, function (success_data) {

                    success_data.message = custom_message.VENUE_NOTE_ADD_SUCCESS;
                    success(success_data);
                }, function (error_data) {

                    error(error_data);
                });


            }, function (error_data) {

                error(error_data);
            })
        }catch (err) {

            error(Response.sendResponse(false, null, err.message, status_codes.INTERNAL_SERVER_ERROR));
        }
    }


    checkBlockedCustomerPresent( success , error  ) {

        try {

            var condition = {

                customer_id : this.customer_id,
                venue_id : this.venue_id,

                //Check user blocked or not
                is_blocked : 1
            };

            this.models.isEntryPresent(condition,function (error_data) {
                //If present return error

                return error(Response.sendResponse(false,null,custom_message.CUSTOMER_BANNED_FOR_VENUE,status_codes.BAD_REQUEST));
            }, function (success_data) {

                return success(Response.sendResponse(true,null,custom_message.ENTRY_NOT_PRESENT,status_codes.OK));
            })
        }catch (err) {

            return error(Response.sendResponse(false, null, err.message, status_codes.INTERNAL_SERVER_ERROR));
        }
    }


    checkFavouriteCustomerPresent( success , error  ) {

        try {

            var condition = {

                customer_id : this.customer_id,
                venue_id : this.venue_id,

                //Check user blocked or not
                is_favourite : 1
            };

            this.models.isEntryPresent(condition,function (success_data) {
                //If present return error

                return success(Response.sendResponse(true,null,custom_message.ENTRY_PRESENT,status_codes.OK));
            }, function (error_data) {

                return error(Response.sendResponse(false,null,custom_message.ENTRY_NOT_PRESENT,status_codes.BAD_REQUEST));
            })
        }catch (err) {

            return error(Response.sendResponse(false, null, err.message, status_codes.INTERNAL_SERVER_ERROR));
        }
    }


    getStarCustomersForVenue( success , error  ){

        try {

            this.models.getTop3CustomersForVenue(this,function (success_data) {

                success(success_data)
            }, function (error_data) {

                error(error_data)
            });
        } catch (err) {

            error(Response.sendResponse(false, null, err.message, status_codes.INTERNAL_SERVER_ERROR));
        }

    }

    removeCheckedInUser( success , error  ){

        try {

            var updated_data = {
                is_checkedin: 0
            };

            this.models.removeCheckedInUser(updated_data, function (success_data) {

                success(success_data);
            });
        } catch (err) {

            error(Response.sendResponse(false, null, err.message, status_codes.INTERNAL_SERVER_ERROR));
        }

    }

    getCheckedInCount( success , error ) {

        try {

            this.models.getCheckedInCount(this,function (success_data) {

                success(success_data);
            }, function (error_data) {

                error(error_data);
            })
        }catch (err) {

            error(Response.sendResponse(false, null, err.message, status_codes.INTERNAL_SERVER_ERROR));
        }
    }

    getCurrentCheckIn(success, error){

        try {

            this.models.getCurrentCheckIn(this,function (success_data) {

                var venue_list = success_data.result;

                if(venue_list == null)
                    return success(Response.sendResponse(false, null, custom_message.FAILURE, status_codes.BAD_REQUEST));

                var data = {
                    venue_id : venue_list.dataValues.venue_id,
                    last_checkin_time : venue_list.dataValues.last_checkin_time,
                    is_blocked : venue_list.dataValues.is_blocked,
                    is_favourite : venue_list.dataValues.is_favourite
                };

                var venue = new Venue(data);

                venue.getVenueDetails(function(venue_success){
                    //console.log("venue success: ", venue_success);
                    venue_success.result.isBlocked = data.is_blocked;
                    venue_success.result.isFavourite = data.is_favourite;
                    success(venue_success);
                }, function(venue_error){
                    //console.log("venue success: ", venue_error);
                    error(venue_error);
                });

            }, function (error_data) {

                error(error_data);
            })
        }catch (err) {

            error(Response.sendResponse(false, null, err.message, status_codes.INTERNAL_SERVER_ERROR));
        }

    }


}

module.exports = VenueCustomerMapping;

