"use strict";

var Response = require('../../Util/Response');


class HistoricalSpotlightView {

    constructor(data) {

        this.models = server._plugins['hapi-sequelize'].new_tagloy.models.v_historical_spotlight;

        this.venue_id = data.venue_id != undefined ? data.venue_id : null ;
        this.page = data.page != undefined ? data.page : null;
        this.creator_id = data.creator_id != undefined ? data.creator_id : null;
    }

    getHistoricalSpotlights( success , error ) {

        try {

            this.models.getHistoricalSpotLights(this,function(success_data){

                success(success_data);
            },function(error_data){

                error(error_data);
            })
        }catch (err) {

            error( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR) );
        }
    }


    getHistoricalSpotlightsForCreator( success , error ) {

        try {

            this.models.getHistoricalSpotlightsForCreator(this,function(success_data){

                success(success_data);
            },function(error_data){

                error(error_data);
            })
        }catch (err) {

            error( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR) );
        }
    }
}

module.exports = HistoricalSpotlightView;
