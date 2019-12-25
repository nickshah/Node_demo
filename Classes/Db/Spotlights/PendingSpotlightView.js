"use strict";

var Response = require('../../Util/Response');


class PendingSpotlightView {

    constructor(data) {

        this.models = server._plugins['hapi-sequelize'].new_tagloy.models.v_pending_spotlight;

        this.venue_id = data.venue_id != undefined ? data.venue_id : null ;
        this.page = data.page != undefined ? data.page : null;
        this.creator_id = data.creator_id != undefined ? data.creator_id : null;

    }

    getPendingSpotLights( success , error ) {

        try {

            this.models.getPendingSpotLights(this,function(success_data){

                success(success_data);
            },function(error_data){

                error(error_data);
            })
        }catch (err) {

            error( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR) );
        }
    }


    getPendingSpotlightsForCreator( success , error  ) {

        try {

            this.models.getPendingSpotLightsForCreator(this,function(success_data){

                success(success_data);
            },function(error_data){

                error(error_data);
            })
        }catch (err) {

            error( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR) );
        }

    }

}

module.exports = PendingSpotlightView;
