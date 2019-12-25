'use strict';

var Response = require('../../Util/Response');


class PublishedFeeds {

    constructor( data , model ) {

        if( model != null )
            this.models = model.published_feeds;
        else
            this.models = server._plugins['hapi-sequelize'].new_tagloy.models.published_feeds;

        this.id =  data.id != undefined ? data.id : null ;
        this.feed_id = data.feed_id != undefined ? data.feed_id : null;
        this.feed_msg = data.feed_msg != undefined ? data.feed_msg : null ;
        this.customer_id = data.customer_id != undefined ? data.customer_id : null ;
        this.venue_id = data.venue_id != undefined ? data.venue_id : null ;
        this.social_media_id = data.social_media_id != undefined ? data.social_media_id : null ;
        this.feed_recieved_at = data.feed_recieved_at != undefined ? data.feed_recieved_at : null;
        this.is_celebration = data.is_celebration != undefined ? data.is_celebration : 0 ;
        this.is_favourite = data.is_favourite != undefined ? data.is_favourite : 0 ;
        this.feed_from_fame_user = data.feed_from_fame_user != undefined ? data.feed_from_fame_user : 0 ;
        this.bookmark_feed = data.bookmark_feed != undefined ? data.bookmark_feed : 0 ;
        this.feed_from_favourite_user = data.feed_from_favourite_user != undefined ? data.feed_from_favourite_user : 0 ;
        this.action_taken_by_venue_user = data.action_taken_by_venue_user != undefined ? data.action_taken_by_venue_user : 0 ;
    }

//    Write the getters and setter here

//    Actual operations
    createRecord( success , error ) {

        try {

            this.models.createEntry(this,function(success_data){

                success(success_data);
            },function(error_data){

                error(error_data);
            });
        }catch (err) {

            error( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR ) );
        }
    }


    getFeedById( success , error  ) {

        try {

            this.models.getFeedById(this,function(success_data){

                success(success_data);
            },function(error_data){

                error(error_data);
            })
        }catch ( err ) {

            error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
        }
    }


    deleteFeedById( success , error  ) {

        try {

            this.models.deleteFeedById(this,function(success_data){

                success(success_data);
            },function(error_data){

                error(error_data);
            })
        }catch ( err ) {

            error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
        }
    }


    makeFeedBookMarked( success , error ) {


        try {

            var updated_data = {

                'id' : this.id,
                'bookmark_feed' : 1
            };

            this.models.updateFeedData(updated_data,function(success_data){

                success(success_data);
            },function(error_data){

                error(error_data);
            })
        }catch ( err ) {

            error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
        }
    }

    makeFeedCelebration( success , error ) {

        try {

            var updated_data = {
                'id' : this.id,
                'is_celebration' : 1
            };

            this.models.updateFeedData(updated_data,function(success_data){

                success(success_data);
            },function(error_data){

                error(error_data);
            })
        }catch ( err ) {

            error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
        }
    }


    getFeedsToMoveIntoHistorical( success , error ) {

        try {

            this.models.getFeedsToMoveIntoHistorical(function(success_data){

                success(success_data);
            },function(error_data){

                error(error_data);
            })

        } catch (err) {

            error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
        }
    }


}


module.exports = PublishedFeeds;