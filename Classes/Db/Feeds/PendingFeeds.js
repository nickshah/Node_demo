'use strict';

var Response = require('../../Util/Response');


class PendingFeeds {

    constructor(data,model) {

        if( model != null )
            this.models = model.pending_feeds;
        else
            this.models = server._plugins['hapi-sequelize'].new_tagloy.models.pending_feeds;

        this.id =  data.id != undefined ? data.id : null ;
        this.feed_msg = data.feed_msg != undefined ? data.feed_msg : null ;
        this.customer_id = data.customer_id != undefined ? data.customer_id : null ;
        this.venue_id = data.venue_id != undefined ? data.venue_id : null ;
        this.social_media_id = data.social_media_id != undefined ? data.social_media_id : null ;
        this.feed_recieved_at = new Date().getTime();
        this.is_celebration = data.is_celebration != undefined ? data.is_celebration : 0 ;
        this.is_favourite = data.is_favourite != undefined ? data.is_favourite : 0 ;
        this.feed_from_fame_user = data.feed_from_fame_user != undefined ? data.feed_from_fame_user : 0 ;
        this.feed_from_favourite_user = data.feed_from_favourite_user != undefined ? data.feed_from_favourite_user : 0 ;
    }

//    Write the getters and setter here

//    Actual operations


    createRecord(media_url, instagram_media_id, success , error ) {

        try {

            this.models.createEntry(this,function(success_data){
                success_data.media_url = media_url;
                success_data.instagram_media_id = instagram_media_id;

                success(success_data);
            },function(error_data){

                error(error_data);
            });
        }catch (err) {

            error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
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

}


module.exports = PendingFeeds;