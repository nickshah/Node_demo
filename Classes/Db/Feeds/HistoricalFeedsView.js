"use strict";

var Response = require('../../Util/Response');


class PendingFeedsView {

    constructor(data) {

        this.models = server._plugins['hapi-sequelize'].new_tagloy.models.v_historical_feeds;

        this.venue_id = data.venue_id != undefined ? data.venue_id : null ;
        this.page = data.page != undefined ? data.page : null;

        this.search_term = data.term != undefined ? data.term : null;
    }

    getHistoricalFeeds( success , error ) {

        try {

            this.models.getHistoricalFeeds(this,function(success_data){

                success(success_data);
            },function(error_data){

                error(error_data);
            })
        }catch (err) {

            error( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR) );
        }
    }

    searchForFeeds( success , error ) {

        try {

            this.models.searchForFeeds(this,function(success_data){

                success(success_data);
            },function(error_data){

                error(error_data);
            })
        }catch (err) {

            error( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR) );
        }
    }
}

module.exports = PendingFeedsView;
