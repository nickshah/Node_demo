"use strict";

var Response = require('../../Util/Response');


class PublishedFeedsView {

    constructor(data) {

        this.models = server._plugins['hapi-sequelize'].new_tagloy.models.v_published_feeds;

        this.venue_id = data.venue_id != undefined ? data.venue_id : null ;
        this.page = data.page != undefined ? data.page : null;

        this.search_term = data.term != undefined ? data.term : null;
    }

    getPublishedFeeds( success , error ) {

        try {

            this.models.getPublishedFeeds(this,function(success_data){

                success(success_data);
            },function(error_data){

                error(error_data);
            })
        }catch (err) {

            error( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR) );
        }
    }

    getCelebrationFeeds( success , error ) {

        try {

            this.models.getCelebrationFeeds(this,function(success_data){

                success(success_data);
            },function(error_data){

                error(error_data);
            })
        }catch (err) {

            error( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR) );
        }
    }

    getFameFeeds( success , error ) {

        try {

            this.models.getFameFeeds(this,function(success_data){

                success(success_data);
            },function(error_data){

                error(error_data);
            })
        }catch (err) {

            error( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR) );
        }
    }

    getBookmarkedFeeds( success , error ) {

        try {

            this.models.getBookmarkedFeeds(this,function(success_data){

                success(success_data);
            },function(error_data){

                error(error_data);
            })
        }catch (err) {

            error( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR) );
        }
    }


    makeFeedBookMarked( success , error ) {

        try {

            this.models.makeFeedBookMarked(this,function(success_data){

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

module.exports = PublishedFeedsView;
