"use strict";

var Response = require('../Util/Response');

class VenueCustomerMappingView {

    constructor(data) {


        this.models = server._plugins['hapi-sequelize'].new_tagloy.models.v_customer_details_for_venue;

        if(data.venue_id) {
            this.venue_id = data.venue_id;
        }
        if(data.customer_id) {
            this.customer_id = data.customer_id;
        }

        this.instagram_flag = data.instagram_flag != undefined ? data.instagram_flag : 0;
        this.twitter_flag = data.twitter_flag != undefined ? data.twitter_flag : 0;
        this.facebook_flag = data.facebook_flag != undefined ? data.facebook_flag : 0;
        this.is_present_on_app = data.is_present_on_app != undefined ? data.is_present_on_app : -1;
        this.is_month_inactive = data.is_month_inactive != undefined ? data.is_month_inactive : -1;
        this.is_three_month_inactive = data.is_three_month_inactive != undefined ? data.is_three_month_inactive : -1;
        this.is_favourite = data.is_favourite != undefined ? data.is_favourite : -1;
        this.is_low_influencer = data.is_low_influencer != undefined ? data.is_low_influencer : -1;
        this.is_high_influencer = data.is_high_influencer != undefined ? data.is_high_influencer : -1;
        this.is_celebrity_influencer = data.is_celebrity_influencer != undefined ? data.is_celebrity_influencer : -1;
        this.is_superstar = data.is_superstar != undefined ? data.is_superstar : -1;
        this.is_star = data.is_star != undefined ? data.is_star : -1;
        this.is_blocked = data.is_blocked != undefined ? data.is_blocked : -1;

        
        this.is_history = data.is_history != undefined ? data.is_history : -1;


        if(data.gender != undefined)
        {
            var genderArray = JSON.parse(data.gender);
            this.gender = (genderArray.length > 0) ? genderArray : config.util.gender;
        }
        else {
            this.gender = config.util.gender;
        }

        if(data.page >= 0) {
            this.page = data.page;
        }
    }

    getCustomersForVenue(success, error) {

        try {

            var condition = {
                'venue_id' : this.venue_id
            };

            if(this.customer_id){
                condition.customer_id = this.customer_id;
            }

            if(this.instagram_flag == 1)
            {
                condition.insta_handle = {
                    $ne: null
                };
            }

            if(this.twitter_flag == 1)
            {
                condition.twt_handle = {
                    $ne: null
                };
            }

            if(this.facebook_flag == 1)
            {
                condition.fb_handle = {
                    $ne: null
                };
            }

            if(this.is_present_on_app == 1 || this.is_present_on_app == 0)
                condition.is_present_on_app = this.is_present_on_app;

            if(this.is_month_inactive == 1 || this.is_month_inactive == 0)
                condition.is_month_inactive = this.is_month_inactive;

            if(this.is_three_month_inactive == 1 || this.is_three_month_inactive == 0)
                condition.is_three_month_inactive = this.is_three_month_inactive;

            if(this.is_favourite != -1)
                condition.is_favourite = this.is_favourite;

            if(this.is_low_influencer == 1 || this.is_low_influencer == 0)
                condition.is_low_influencer = this.is_low_influencer;

            if(this.is_high_influencer == 1 || this.is_high_influencer == 0)
                condition.is_high_influencer = this.is_high_influencer;

            if(this.is_celebrity_influencer == 1 || this.is_celebrity_influencer == 0)
                condition.is_celebrity_influencer = this.is_celebrity_influencer;

            if(this.is_superstar == 1 || this.is_superstar == 0)
                condition.is_superstar = this.is_superstar;

            if(this.is_star == 1 || this.is_star == 0)
                condition.is_star = this.is_star;

            if(this.is_blocked == 1 || this.is_blocked == 0)
                condition.is_blocked = this.is_blocked;

            condition.gender = {
                $in : this.gender
            };

            console.log("this.page: ", this.page);

            if(!condition.customer_id){
                this.models.getCustomerForVenue(condition,this.page, function (success_data) {

                    success(success_data);
                }, function (error_data) {

                    error(error_data);
                })
            }else{
                this.models.getSingleCustomerForVenue(condition,this.page, function (success_data) {

                    success(success_data);
                }, function (error_data) {

                    error(error_data);
                })
            }


        } catch (err) {

            error(Response.sendResponse(false, null, err.message, status_codes.INTERNAL_SERVER_ERROR));
        }
    }

    getInVenueCustomersForVenue(success, error) {

        try {

            var condition = {
                'venue_id' : this.venue_id,
                'is_checkedin' : 1
            };


            var gtCon = {
                $gt : 0
            }

            if(this.is_history==1){
                condition.is_checkedin = 0;
                condition.last_checkin_time = gtCon;
            }

            console.log("history checkins",condition);

            this.models.getCustomerForVenue(condition,this.page, function (success_data) {

                success(success_data);
            }, function (error_data) {

                error(error_data);
            })
        } catch (err) {

            error(Response.sendResponse(false, null, err.message, status_codes.INTERNAL_SERVER_ERROR));
        }
    }

   /* checkedIn( success , error ) {

        try {

            this.models.getCustomerForVenue(condition,this.page, function (success_data) {

                success(success_data);
            }, function (error_data) {

                error(error_data);
            })
        }catch (err) {

            error(Response.sendResponse(false, null, err.message, status_codes.INTERNAL_SERVER_ERROR));
        }
    }*/

    getCheckInVenuesForCustomer( success , error ) {


        try {

            console.log(this);
            this.models.getCheckInVenuesForCustomer(this,function(success_data) {

                success( success_data );
            },function( error_data ) {

                error( error_data );
            })

        }catch (err) {

            error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
        }

    }

}

module.exports = VenueCustomerMappingView;

