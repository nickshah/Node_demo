"use strict";

var Response = require('../../Util/Response');

class PublishedSpotlightView {

    constructor(data) {

        this.models = server._plugins['hapi-sequelize'].new_tagloy.models.v_published_spotlight;

        this.venue_id = data.venue_id != undefined ? data.venue_id : null ;
        this.page = data.page != undefined ? data.page : null;
        this.creator_id = data.creator_id != undefined ? data.creator_id : null;
    }

    getPublishedSpotlights( success , error ) {

        try {

            this.models.getPublishedSpotlights(this,function(success_data){

                success(success_data);
            },function(error_data){

                error(error_data);
            })
        }catch (err) {

            error( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR) );
        }
    }

    getPublishedSpotlightsForCreator( success , error ) {

        try {

            this.models.getPublishedSpotlightsForCreator(this,function(success_data){

                success(success_data);
            },function(error_data){

                error(error_data);
            })
        }catch (err) {

            error( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR) );
        }
    }
}

module.exports = PublishedSpotlightView;
