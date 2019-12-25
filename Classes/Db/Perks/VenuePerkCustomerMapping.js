"use strict";

var Response = require('../../Util/Response');


class VenuePerkCustomerMapping {

    constructor( data , model ) {
  
        if( model != null )
            this.models = model.venue_perk_customer_mapping;
        else
            this.models = server._plugins['hapi-sequelize'].new_tagloy.models.venue_perk_customer_mapping;


        this.id =  data.id != undefined ? data.id : null ;
        this.venue_perk_id = data.venue_perk_id != undefined ? data.venue_perk_id : null ;
        this.customer_id = data.customer_id != undefined ? data.customer_id : null ;
        this.is_claimed = data.description != undefined ? data.is_claimed : null ;
        this.amount = data.amount != undefined ? data.amount : null ;
        //this.assigned_timestamp = data.assigned_timestamp != undefined ? data.assigned_timestamp : null ;
        this.claimed_timestamp = data.claimed_timestamp != undefined ? data.claimed_timestamp : null;
        this.expired_timestamp = data.expired_timestamp != undefined ? data.expired_timestamp : null;
        this.unique_id = data.unique_id != undefined ? data.unique_id : null;

        this.current_timestamp = data.current_timestamp != undefined ? data.current_timestamp : null;
        this.redeem_time = data.redeem_time != undefined ? data.redeem_time : null;
        
        this.organization_id = data.organization_id != undefined ? data.organization_id : null;
    }

 
    createRecord(success,error) {

        try {

            this.models.createEntry(this, function (response_data) {

                success(response_data);
            }, function (error_data) {

                error(error_data);
            });
        }catch (err) {

            error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
        }
    };

    redeemPerk(success, error){
        try {

            this.models.redeemPerk(this, function (response_data) {
                success(response_data);
            }, function (error_data) {

                error(error_data);
            });
        }catch (err) {

            error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
        }
    }


}


module.exports = VenuePerkCustomerMapping;