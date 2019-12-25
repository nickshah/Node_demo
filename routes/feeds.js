"use strict";

var validations = require('../validations');
var feed_controller = require('../Controllers/FeedController');
var ServerDetails = require('../config/server_details');


module.exports = function() {
    return [


    /**
     * @api {POST}  /v1/feed/pending  Feeds  : Get pending feeds
     * @apiName Get pending feeds
     * @apiGroup Feeds
     * @apiDescription Get pending feeds
     * @apiHeader {String} Authorization
     * @apiParam {Number} page
     * @apiParam {Number} venue_id
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
          "is_success": true,
          "result": [
            {
              "feed_id": 5,
              "feed_msg": "#tagloy #birthday #enjoy #masti Happppyyy Birthday https://t.co/YRDztkHKOF",
              "feed_image": "http://pbs.twimg.com/media/C6p5biPW0AA0TJq.jpg",
              "cust_name": "Ava Diana",
              "feed_count": 0,
              "published_feed_count": 0,
              "twt_follower": 6,
              "facebook_follower": 0,
              "ig_follower": 0,
              "is_celebration": 1,
              "bookmark_feed": 0,
              "feed_from_fame_user": 0,
              "feed_from_favourite_user": 0,
              "cust_feeds_count": 6,
              "feed_recieved_at": 1489233221143,
              "venue_id": 176
            }
          ],
          "status_code": 200,
          "message": ""
     * }
     * @apiUse ErrorResponseFormat
     * */
        {
            method: 'POST',
            path: ServerDetails.env+'/feed/pending',
            config: {
                auth : "jwt",
                validate : validations.feed_validations.get_feeds,
                handler: feed_controller.getPendingFeeds
            }
        },


    /**
     * @api {POST}  /v1/feed/pending/trail  Feeds  : Get pending feeds trail
     * @apiName Get pending feeds trail
     * @apiGroup Feeds
     * @apiDescription Get pending feeds trail
     * @apiHeader {String} Authorization
     * @apiParam {Number} page
     * @apiParam {Number} customer_id
     * @apiParam {Number} venue_id
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
          "is_success": true,
          "result": [
            {
              "feed_id": 5,
              "feed_msg": "#tagloy #birthday #enjoy #masti Happppyyy Birthday https://t.co/YRDztkHKOF",
              "feed_image": "http://pbs.twimg.com/media/C6p5biPW0AA0TJq.jpg",
              "cust_name": "Ava Diana",
              "feed_count": 0,
              "published_feed_count": 0,
              "twt_follower": 6,
              "facebook_follower": 0,
              "ig_follower": 0,
              "is_celebration": 1,
              "bookmark_feed": 0,
              "feed_from_fame_user": 0,
              "feed_from_favourite_user": 0,
              "cust_feeds_count": 6,
              "feed_recieved_at": 1489233221143,
              "venue_id": 176
            }
          ],
          "status_code": 200,
          "message": ""
     * }
     * @apiUse ErrorResponseFormat
     * */
        {
            method: 'POST',
            path: ServerDetails.env+'/feed/pending/trail',
            config: {
                auth : "jwt",
                validate : validations.feed_validations.get_feeds_trail,
                handler: feed_controller.getPendingFeedsTrail
            }
        },




    /**
     * @api {POST}  /v1/feed/published  Feeds  : Get published feeds
     * @apiName Get published feeds
     * @apiGroup Feeds
     * @apiDescription Get pending feeds
     * @apiHeader {String} Authorization
     * @apiParam {Number} page
     * @apiParam {Number} venue_id
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
          "is_success": true,
          "result": [
            {
              "feed_id": 5,
              "feed_msg": "#tagloy #birthday #enjoy #masti Happppyyy Birthday https://t.co/YRDztkHKOF",
              "feed_image": "http://pbs.twimg.com/media/C6p5biPW0AA0TJq.jpg",
              "cust_name": "Ava Diana",
              "feed_count": 0,
              "published_feed_count": 0,
              "twt_follower": 6,
              "facebook_follower": 0,
              "ig_follower": 0,
              "is_celebration": 1,
              "bookmark_feed": 0,
              "feed_from_fame_user": 0,
              "feed_from_favourite_user": 0,
              "cust_feeds_count": 6,
              "feed_recieved_at": 1489233221143,
              "venue_id": 176
            }
          ],
          "status_code": 200,
          "message": ""
     * }
     * @apiUse ErrorResponseFormat
     * */
        {
            method: 'POST',
            path: ServerDetails.env+'/feed/published',
            config: {
                auth : "jwt",
                validate : validations.feed_validations.get_feeds,
                handler: feed_controller.getPublishedFeeds
            }
        },

    /**
     * @api {POST}  /v1/feed/historical  Feeds  : Get Historical feeds
     * @apiName Get Historical feeds
     * @apiGroup Feeds
     * @apiDescription Get Historical feeds
     * @apiHeader {String} Authorization
     * @apiParam {Number} page
     * @apiParam {Number} venue_id
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
          "is_success": true,
          "result": [
            {
              "feed_id": 6,
              "feed_msg": "#tagloy #birthday #enjoy #masti Happppyyy Birthday #pune  #checking https://t.co/na5FOaQBba",
              "feed_image": "http://pbs.twimg.com/media/C6p3uV8WcAEXkx3.jpg",
              "cust_name": "Ava Diana",
              "feed_count": 0,
              "published_feed_count": 0,
              "twt_follower": 6,
              "facebook_follower": 0,
              "ig_follower": 0,
              "is_celebration": 1,
              "bookmark_feed": 0,
              "feed_from_fame_user": 0,
              "feed_from_favourite_user": 0,
              "cust_feeds_count": 2,
              "feed_recieved_at": 1489253456012,
              "venue_id": 176,
              "feed_status": "REJECTED",
              "rejected_reason": "Rejected"
            }
          ],
          "status_code": 200,
          "message": ""

     * }
     * @apiUse ErrorResponseFormat
     * */
        {
            method: 'POST',
            path: ServerDetails.env+'/feed/historical',
            config: {
                auth : "jwt",
                validate : validations.feed_validations.get_feeds,
                handler: feed_controller.getHistoricalFeeds
            }
        },

    /**
     * @api {POST}  /feed/approve  Feeds  : Approve Feed
     * @apiName Approve Feed
     * @apiGroup Feeds
     * @apiDescription Approve feed
     * @apiHeader {String} Authorization
     * @apiParam {Number} page
     * @apiParam {Number} venue_id
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
          "is_success": true,
          "result": null,
          "status_code": 201,
          "message": "Feed approved"
     * }
     * @apiUse ErrorResponseFormat
     * */
        {
            method: 'POST',
            path: ServerDetails.env+'/feed/approve',
            config: {
                auth : "jwt",
                validate : validations.feed_validations.approve_feed,
                handler: feed_controller.approveFeed
            }
        },

    /**
     * @api {POST}  /v1/feed/reject  Feeds  : Reject Feed
     * @apiName Reject Feed
     * @apiGroup Feeds
     * @apiDescription Reject Feed
     * @apiHeader {String} Authorization
     * @apiParam {Number} page
     * @apiParam {Number} venue_id
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
          "is_success": true,
          "result": null,
          "status_code": 201,
          "message": "Feed rejected"
     * }
     * @apiUse ErrorResponseFormat
     * */
        {
            method: 'POST',
            path: ServerDetails.env+'/feed/reject',
            config: {
                auth : "jwt",
                validate : validations.feed_validations.reject_feed,
                handler: feed_controller.rejectFeed
            }
        },





        //    Fame bookmarked celebrations feeds





    /**
     * @api {POST}  /v1/feed/celebration  Feeds  : Get Celebration feeds
     * @apiName Get Celebration feeds
     * @apiGroup Feeds
     * @apiDescription Get Celebration feeds
     * @apiHeader {String} Authorization
     * @apiParam {Number} page
     * @apiParam {Number} venue_id
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
          "is_success": true,
          "result": [
            {
              "feed_id": 6,
              "feed_msg": "#tagloy #birthday #enjoy #masti Happppyyy Birthday #pune  #checking https://t.co/na5FOaQBba",
              "feed_image": "http://pbs.twimg.com/media/C6p3uV8WcAEXkx3.jpg",
              "cust_name": "Ava Diana",
              "feed_count": 0,
              "published_feed_count": 0,
              "twt_follower": 6,
              "facebook_follower": 0,
              "ig_follower": 0,
              "is_celebration": 1,
              "bookmark_feed": 0,
              "feed_from_fame_user": 0,
              "feed_from_favourite_user": 0,
              "cust_feeds_count": 2,
              "feed_recieved_at": 1489253456012,
              "venue_id": 176,
              "feed_status": "REJECTED",
              "rejected_reason": "Rejected"
            }
          ],
          "status_code": 200,
          "message": ""

     * }
     * @apiUse ErrorResponseFormat
     * */
        {
            method: 'POST',
            path: ServerDetails.env+'/feed/celebrations',
            config: {
                auth : "jwt",
                validate : validations.feed_validations.get_feeds,
                handler: feed_controller.getCelebrationFeeds
            }
        },


    /**
     * @api {POST}  /v1/feed/fame  Feeds  : Get fame feeds
     * @apiName Get fame feeds
     * @apiGroup Feeds
     * @apiDescription Get fame feeds
     * @apiHeader {String} Authorization
     * @apiParam {Number} page
     * @apiParam {Number} venue_id
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
          "is_success": true,
          "result": [
            {
              "feed_id": 6,
              "feed_msg": "#tagloy #birthday #enjoy #masti Happppyyy Birthday #pune  #checking https://t.co/na5FOaQBba",
              "feed_image": "http://pbs.twimg.com/media/C6p3uV8WcAEXkx3.jpg",
              "cust_name": "Ava Diana",
              "feed_count": 0,
              "published_feed_count": 0,
              "twt_follower": 6,
              "facebook_follower": 0,
              "ig_follower": 0,
              "is_celebration": 1,
              "bookmark_feed": 0,
              "feed_from_fame_user": 1,
              "feed_from_favourite_user": 0,
              "cust_feeds_count": 2,
              "feed_recieved_at": 1489253456012,
              "venue_id": 176,
              "feed_status": "REJECTED",
              "rejected_reason": "Rejected"
            }
          ],
          "status_code": 200,
          "message": ""

     * }
     * @apiUse ErrorResponseFormat
     * */
        {
            method: 'POST',
            path: ServerDetails.env+'/feed/fame',
            config: {
                auth : "jwt",
                validate : validations.feed_validations.get_feeds,
                handler: feed_controller.getFameFeeds
            }
        },

    /**
     * @api {POST}  /v1/feed/bookmarked  Feeds  : Get bookmarked feeds
     * @apiName Get bookmarked feeds
     * @apiGroup Feeds
     * @apiDescription Get bookmarked feeds
     * @apiHeader {String} Authorization
     * @apiParam {Number} page
     * @apiParam {Number} venue_id
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
          "is_success": true,
          "result": [
            {
              "feed_id": 6,
              "feed_msg": "#tagloy #birthday #enjoy #masti Happppyyy Birthday #pune  #checking https://t.co/na5FOaQBba",
              "feed_image": "http://pbs.twimg.com/media/C6p3uV8WcAEXkx3.jpg",
              "cust_name": "Ava Diana",
              "feed_count": 0,
              "published_feed_count": 0,
              "twt_follower": 6,
              "facebook_follower": 0,
              "ig_follower": 0,
              "is_celebration": 1,
              "bookmark_feed": 1,
              "feed_from_fame_user": 1,
              "feed_from_favourite_user": 0,
              "cust_feeds_count": 2,
              "feed_recieved_at": 1489253456012,
              "venue_id": 176,
              "feed_status": "REJECTED",
              "rejected_reason": "Rejected"
            }
          ],
          "status_code": 200,
          "message": ""

     * }
     * @apiUse ErrorResponseFormat
     * */
        {
            method: 'POST',
            path: ServerDetails.env+'/feed/bookmarked',
            config: {
                auth : "jwt",
                validate : validations.feed_validations.get_feeds,
                handler: feed_controller.getBookmarkedFeeds
            }
        },


    /**
     * @api {POST}  /v1/feed/markbookmarked  Feeds  : Mark feed bookmarked
     * @apiName Mark Feed bookmarked
     * @apiGroup Feeds
     * @apiDescription Mark feed bookmarked
     * @apiHeader {String} Authorization
     * @apiParam {Number} id
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
          "is_success": true,
          "result": null,
          "status_code": 201,
          "message": "Feed bookmarked"
     * }
     * @apiUse ErrorResponseFormat
     * */
        {
            method: 'POST',
            path: ServerDetails.env+'/feed/markbookmarked',
            config: {
                auth : "jwt",
                validate : validations.feed_validations.bookmarked_feed,
                handler: feed_controller.makeFeedBookMarked
            }
        },


    /**
     * @api {POST}  /feed/markcelebration  Feeds  : Mark feed Celebration
     * @apiName Mark Feed Celebration
     * @apiGroup Feeds
     * @apiDescription Mark feed Celebration
     * @apiHeader {String} Authorization
     * @apiParam {Number} id
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
          "is_success": true,
          "result": null,
          "status_code": 201,
          "message": "Feed marked as celebration"
     * }
     * @apiUse ErrorResponseFormat
     * */
        {
            method: 'POST',
            path: ServerDetails.env+'/feed/markcelebration',
            config: {
                auth : "jwt",
                validate : validations.feed_validations.marked_as_celebration,
                handler: feed_controller.makeFeedCelebration
            }
        },



        {
            method: 'POST',
            path: ServerDetails.env+'/feed/search',
            config: {
                auth : "jwt",
                validate : validations.feed_validations.search,
                handler: feed_controller.searchFeed
            }
        },

        //Scheduler
        {
            method: 'GET',
            path: ServerDetails.env+'/feed/movetohistorical',
            config: {
                auth : "jwt",
                //validate : validations.feed_validations.marked_as_celebration,
                handler: feed_controller.movePublishedToHistorical
            }
        },


    /**
     * @api {POST}  /v1/feed/pending/count  Feeds  : Get pending new feeds count
     * @apiName Get pending feeds
     * @apiGroup Feeds
     * @apiDescription Get pending feeds
     * @apiHeader {String} Authorization
     * @apiParam {Number} timestamp
     * @apiParam {Number} venue_id
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
          "is_success": true,
          "result": {
                "count" : 5
          },
          "status_code": 200,
          "message": ""
     * }
     * @apiUse ErrorResponseFormat
     * */
        {
            method: 'POST',
            path: ServerDetails.env+'/feed/pending/count',
            config: {
                auth : "jwt",
                validate : validations.feed_validations.get_feed_count,
                handler: feed_controller.getPendingFeedCount
            }
        },

         {
            method: 'POST',
            path: ServerDetails.env+'/feed/comment',
            config: {
                auth : "jwt",
                validate : validations.feed_validations.feed_comment,
                handler: feed_controller.sendInstagramMessage
            }
        }


    ];
}();

