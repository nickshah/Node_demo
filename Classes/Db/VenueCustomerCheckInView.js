"use strict";

var Response = require('../Util/Response');

class VenueCustomerCheckInView {

    constructor(data) {


        this.models = server._plugins['hapi-sequelize'].new_tagloy.models.v_customer_checkin_details;


        if(data.customer_id) {
            this.customer_id = data.customer_id;
        }

    }

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

module.exports = VenueCustomerCheckInView;

