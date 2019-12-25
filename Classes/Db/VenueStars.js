'use strict';

var Response = require('../Util/Response');



class VenueStars {


    constructor( data ) {

        this.models = server._plugins['hapi-sequelize'].new_tagloy.models.venue_stars;
        

        this.id =  data.id != undefined ? data.id : null ;
        this.venue_id = data.venue_id != undefined ? data.venue_id : null ;
        this.customer_id = data.customer_id != undefined ? data.customer_id : null;
        this.is_superstar = data.is_superstar != undefined ? data.is_superstar : 0;
        this.tag_count = data.tag_count != undefined ? data.tag_count : 0;
        this.is_active = data.is_active != undefined ? data.is_active : 1;
        
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
    }

    updateRecords(success,error) {
        
        try {
        
            this.models.updateVenueStars(function (response_data) {
        
                success(response_data);
            }, function (error_data) {
        
                error(error_data);
            });
        }catch (err) {
            console.log("ERR: updateVenueStars", err);
             //error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
        }
    }



    /*getStarsAtForCustomer( success , error ) {

        try {

            this.models.getVenueStarsForCustomer(this,function(success_data){

                success(success_data);
            },function(error_data){

                error(error_data);
            })
        }catch (err) {

            error( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR) );
        }
    }*/

}


module.exports = VenueStars;