"use strict";

var Response = require('../../Util/Response');


class PendingFeedsView {

    constructor(data) {

        this.models = server._plugins['hapi-sequelize'].new_tagloy.models.v_pending_feeds;

        this.venue_id = data.venue_id != undefined ? data.venue_id : null ;
        this.page = data.page != undefined ? data.page : null;

        this.search_term = data.term != undefined ? data.term : null;
        this.timestamp = data.timestamp != undefined ? data.timestamp : null;
    }

    getPendingFeeds( success , error ) {

        try {

            this.models.getPendingFeeds(this,function(success_data){

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

    getPendingFeedCount( success , error ) {

        try {

            this.models.getPendingFeedCount(this,function(success_data){

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
