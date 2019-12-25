'use strict';

var Response = require('../Util/Response');
var StatusCode = require('../Util/StatusCodes');

class VenueBlockCustomerMapping {

    constructor(data,model) {

        //this.models = server._plugins['hapi-sequelize'].new_tagloy.models.venue_block_customer_mapping;

        if( model != null )
            this.models = model.venue_block_customer_mapping;
        else
            this.models = server._plugins['hapi-sequelize'].new_tagloy.models.venue_block_customer_mapping;


        this.customer_id = data.customer_id != undefined ? data.customer_id : null;
        this.venue_id = data.venue_id != undefined ? data.venue_id : null;
    }


    checkBlockedCustomerPresent( success,error ){

        try {

            var condition = {
                customer_id : this.customer_id,
                venue_id : this.venue_id
            };

            this.models.checkEntryPresent(condition,function(success_data){

                //console.log(success_data);
                success(success_data);
            },function(error_data){

                error(error_data);
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


module.exports = VenueBlockCustomerMapping;