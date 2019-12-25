'use strict';

var Response = require('../Util/Response');



class VenueStarsView {


    constructor( data ) {

        this.models = server._plugins['hapi-sequelize'].new_tagloy.models.v_venue_stars;
        this.venue_id = data.venue_id != undefined ? data.venue_id : null ;
        this.customer_id = data.customer_id != undefined ? data.customer_id : null ;
        
    }


    getVenueStars( success , error ) {

        try {

            this.models.getVenueStars(this,function(success_data){

                success(success_data);
            },function(error_data){

                error(error_data);
            })
        }catch (err) {

            error( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR) );
        }
    }

    getVenueStarsForCustomer( success , error ) {
        
                try {
        
                    this.models.getVenueStarsForCustomer(this,function(success_data){
        
                        success(success_data);
                    },function(error_data){
        
                        error(error_data);
                    })
                }catch (err) {
        
                    error( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR) );
                }
            }


}


module.exports = VenueStarsView;