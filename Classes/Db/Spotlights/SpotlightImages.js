'use strict';

var Response = require('../../Util/Response');


class SpotlightImages {

    constructor(data,model) {


        if( model != null )
            this.models = model.spotlight_images;
        else
            this.models = server._plugins['hapi-sequelize'].new_tagloy.models.spotlight_images;


        this.id =  data.id != undefined ? data.id : null ;
        this.spotlight_id = data.spotlight_id != undefined ? data.spotlight_id : null ;
        this.type = data.type != undefined ? data.type : null ;
        this.image = data.image != undefined ? data.image : null ;
    }

//    Write the getters and setter here


    createRecord(success,error) {

        this.models.createEntry(this,function(response_data){

            success(response_data);
        },function(error_data){

            error(error_data);
        });
    };


    getImagesForSpotlight( success , error ) {


        try {

            this.models.getImagesForSpotlight(this,function(success_data){

                success(success_data);
            },function(error_data){

                error(error_data);
            });

        }catch (err) {

            error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
        }

    }

//    Actual operations

}


module.exports = SpotlightImages;