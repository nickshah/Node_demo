"use strict";

var Response = require('../../Util/Response');


class CustomerPerkDetails {

    constructor( data , model ) {

        if( model != null )
            this.models = model.v_customer_perk_details;
        else
            this.models = server._plugins['hapi-sequelize'].new_tagloy.models.v_customer_perk_details;


        this.customer_id = data.customer_id != undefined ? data.customer_id : null ;
                
        this.perk_id = data.perk_id != undefined ? data.perk_id : null ;

        this.venue_id = data.venue_id != undefined ? data.venue_id : null ;
        

        this.page = data.page != undefined ? data.page : 0;
        this.limit = data.limit != undefined ? data.limit : 0;
        this.month = data.month != undefined ? data.month : null;
        this.year = data.year != undefined ? data.year : null;
        this.starttime = data.starttime != undefined ? data.starttime : null;
        this.endtime = data.endtime != undefined ? data.endtime : null;

        this.search_term = data.search_term != undefined ? data.search_term :  null;

        if(data.is_claimed != undefined)
        {
            var isClaimedArray = JSON.parse(data.is_claimed);
            this.is_claimed = (isClaimedArray.length > 0) ? isClaimedArray : [1, 2];
        }
        else {
            this.is_claimed = [1, 2];
        }
    }


    getPerksForCustomer(success,error) {

        try {

            this.models.getPerksForCustomer(this, function (response_data) {

                success(response_data);
            }, function (error_data) {

                error(error_data);
            });
        }catch (err) {

            error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
        }
    };

    getPerksForVenue(success,error) {
        
        try {
        
            this.models.getPerksForVenue(this, function (response_data) {
        
            success(response_data);
        }, function (error_data) {
        
            error(error_data);
        });
        }catch (err) {
        
            error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
        }
    };

    getPerkReports(success,error) {
        
        try {
        
            this.models.getPerkReports(this, function (response_data) {
        
            success(response_data);
        }, function (error_data) {
        
            error(error_data);
        });
        }catch (err) {
        
            error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
        }
    };


    getPerkReportExcel(success,error) {

        try {

            console.log("this.models: ", this.models);
            this.models.getPerkReportExcel(this, function (response_data) {

                success(response_data);
            }, function (error_data) {

                error(error_data);
            });
        }catch (err) {

            error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
        }
    };

            
    getSinglePerkForCustomer(success,error) {

        try {

            this.models.getSinglePerkForCustomer(this, function (response_data) {

                success(response_data);
            }, function (error_data) {

                error(error_data);
            });
        }catch (err) {

            error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
        }
    };

    searchPerksForCustomer(success,error) {

        try {

            this.models.searchPerksForCustomer(this, function (response_data) {

                success(response_data);
            }, function (error_data) {

                error(error_data);
            });
        }catch (err) {

            error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
        }
    };

}


module.exports = CustomerPerkDetails;