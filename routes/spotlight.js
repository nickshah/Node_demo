"use strict";

var validations = require('../validations');
var spotlight_controller = require('../Controllers/SpotlightController');
var ServerDetails = require('../config/server_details');


module.exports = function() {
    return [


    /**
     * @api {POST}  /v1/spotlight/pending  Spotlights  : Get pending spotlights
     * @apiName Get pending spotlights
     * @apiGroup Spotlight
     * @apiDescription Get pending spotlights
     * @apiHeader {String} Authorization
     * @apiParam {Number} page
     * @apiParam {Number} venue_id
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
          "is_success": true,
          "result": [
            {
              "spotlight_id": 5,
              "title": 0,
              "description": null,
              "type": "CREATIVE",
              "venue_id": 176,
              "published_start_date_time": 14500000000,
              "published_end_date_time": 12324334343,
              "event_start_date": null,
              "event_end_date": null,
              "event_start_time": null,
              "event_end_time": null,
              "active_day_string": null,
              "is_recurring": null,
              "venue_user_creator_id": null,
              "venue_user_moderator_id": null,
              "fb": 0,
              "twt": 1,
              "ig": 0,
              "image": "/var/www/html/tagloy_new/images/binary_clouds_by_unrater-d6l9ti3.png"
            }
          ],
          "status_code": 200,
          "message": ""
     * }
     * @apiUse ErrorResponseFormat
     * */
        {
            method: 'POST',
            path: ServerDetails.env+'/spotlight/pending',
            config: {
                auth : "jwt",
                validate : validations.feed_validations.get_spotlight,
                handler: spotlight_controller.getPendingSpotlights
            }
        },


    /**
     * @api {POST}  /v1/spotlight/published  Spotlights  : Get published spotlights
     * @apiName Get published spotlights
     * @apiGroup Spotlight
     * @apiDescription Get pending spotlights
     * @apiHeader {String} Authorization
     * @apiParam {Number} page
     * @apiParam {Number} venue_id
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
          "is_success": true,
          "result": [
            {
              "spotlight_id": 5,
              "title": 0,
              "description": null,
              "type": "CREATIVE",
              "venue_id": 176,
              "published_start_date_time": 14500000000,
              "published_end_date_time": 12324334343,
              "event_start_date": null,
              "event_end_date": null,
              "event_start_time": null,
              "event_end_time": null,
              "active_day_string": null,
              "is_recurring": null,
              "venue_user_creator_id": null,
              "venue_user_moderator_id": null,
              "fb": 0,
              "twt": 1,
              "ig": 0,
              "image": "/var/www/html/tagloy_new/images/b47065ce4f6177bc3ea8897b2728f4cd.jpg"
            }
          ],
          "status_code": 200,
          "message": ""
     * }
     * @apiUse ErrorResponseFormat
     * */
        {
            method: 'POST',
            path: ServerDetails.env+'/spotlight/published',
            config: {
                auth : "jwt",
                validate : validations.feed_validations.get_spotlight,
                handler: spotlight_controller.getPublishedSpotlights
            }
        },

    /**
     * @api {POST}  /v1/spotlight/historical  Spotlights  : Get Historical spotlights
     * @apiName Get Historical spotlights
     * @apiGroup Spotlight
     * @apiDescription Get Historical spotlights
     * @apiHeader {String} Authorization
     * @apiParam {Number} page
     * @apiParam {Number} venue_id
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
  "is_success": true,
  "result": [
    {
      "spotlight_id": 3,
      "title": 0,
      "description": null,
      "type": "CREATIVE",
      "venue_id": 176,
      "published_start_date_time": 14500000000,
      "published_end_date_time": 12324334343,
      "event_start_date": null,
      "event_end_date": null,
      "event_start_time": null,
      "event_end_time": null,
      "active_day_string": null,
      "is_recurring": null,
      "venue_user_creator_id": null,
      "venue_user_moderator_id": null,
      "fb": 0,
      "twt": 1,
      "ig": 0,
      "image": "/var/www/html/tagloy_new/images/b47065ce4f6177bc3ea8897b2728f4cd.jpg",
      "status": "REJECTED",
      "rejected_reason": "chfajlfkds",
      "parent_spotlight_id": null
    }
  ],
  "status_code": 200,
  "message": ""
     * }
     * @apiUse ErrorResponseFormat
     * */
        {
            method: 'POST',
            path: ServerDetails.env+'/spotlight/historical',
            config: {
                auth : "jwt",
                validate : validations.spotlight_validations.get_spotlight,
                handler: spotlight_controller.getHistoricalSpotlights
            }
        },

    /**
     * @api {POST}  /v1/spotlight/create  Spotlights  : create spotlights
     * @apiName create spotlights
     * @apiGroup Spotlight
     * @apiDescription create spotlight
     * @apiHeader {String} Authorization
     * @apiParam {String} title
     * @apiParam {String} description
     * @apiParam {String} type 'FLASH OFFER','CREATIVE','EVENT','SPECIAL'
     * @apiParam {Number} venue_id
     * @apiParam {Number} published_start_date_time
     * @apiParam {Number} published_end_date_time
     * @apiParam {Number} event_start_date
     * @apiParam {Number} event_end_date
     * @apiParam {Number} event_start_time
     * @apiParam {Number} event_end_time
     * @apiParam {String} active_day_string
     * @apiParam {Number} is_recurring
     * @apiParam {Number} venue_user_creator_id
     * @apiParam {Number} fb
     * @apiParam {Number} twt
     * @apiParam {Number} ig
     * @apiParam {Array} image
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
          "is_success": true,
          "result": null,
          "status_code": 201,
          "message": "Spotlight created"
     * }
     * @apiUse ErrorResponseFormat
     * */
        {
            method: 'POST',
            path: ServerDetails.env+'/spotlight/create',
            config: {
                payload: {
                    output: 'stream',
                    parse: true,
                    maxBytes: 1073741824,
                    allow: 'multipart/form-data'
                },
                auth: false,
                validate : validations.spotlight_validations.create_spotlight,
                handler: spotlight_controller.createSpotLight
            }
        },

    /**
     * @api {POST}  /v1/spotlight/approve  spotlight  : Approve spotlight
     * @apiName Approve spotlight
     * @apiGroup Spotlight
     * @apiDescription Approve spotlight
     * @apiHeader {String} Authorization
     * @apiParam {Number} page
     * @apiParam {Number} venue_id
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
          "is_success": true,
          "result": null,
          "status_code": 200,
          "message": "Spotlight approved"
     * }
     * @apiUse ErrorResponseFormat
     * */
        {
            method: 'POST',
            path: ServerDetails.env+'/spotlight/approve',
            config: {
                auth: false,
                validate : validations.spotlight_validations.approve_spotlight,
                handler: spotlight_controller.approveSpotlight
            }
        },

    /**
     * @api {POST}  /v1/spotlight/reject  Spotlights  : Reject spotlight
     * @apiName Reject spotlight
     * @apiGroup Spotlight
     * @apiDescription Reject spotlight
     * @apiHeader {String} Authorization
     * @apiParam {Number} page
     * @apiParam {Number} venue_id
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
          "is_success": true,
          "result": null,
          "status_code": 200,
          "message": "Spotlight rejected"
     * }
     * @apiUse ErrorResponseFormat
     * */
        {
            method: 'POST',
            path: ServerDetails.env+'/spotlight/reject',
            config: {
                auth: false,
                validate : validations.spotlight_validations.reject_spotlight,
                handler: spotlight_controller.rejectSpotlight
            }
        },



    /**
     * @api {POST}  /v1/spotlight/request  Spotlights  : Initiate request
     * @apiName Initiate request
     * @apiGroup Spotlight
     * @apiDescription Initiate request for spotlight
     * @apiHeader {String} Authorization
     * @apiParam {Number} venue_id
     * @apiParam {Number} requester_id
     * @apiParam {Number} creator_id
     * @apiParam {String} message
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
          "is_success": true,
          "result": null,
          "status_code": 200,
          "message": "Spotlight requested"
     * }
     * @apiUse ErrorResponseFormat
     * */
        {
            method: 'POST',
            path: ServerDetails.env+'/spotlight/request',
            config: {
                auth: false,
                validate : validations.spotlight_validations.request_spotlight,
                handler: spotlight_controller.requestSpotlight
            }
        },


    /**
     * @api {POST}  /v1/spotlight/requested  Spotlights  : Requested spotlight
     * @apiName Requested spotlight
     * @apiGroup Spotlight
     * @apiDescription Requested spotlight
     * @apiHeader {String} Authorization
     * @apiParam {Number} venue_id
     * @apiParam {Number} creator_id
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
     * }
     * @apiUse ErrorResponseFormat
     * */
        {
            method: 'POST',
            path: ServerDetails.env+'/spotlight/requested',
            config: {
                auth: false,
                validate : validations.spotlight_validations.get_requested_spotlight,
                handler: spotlight_controller.getRequestedSpotlights
            }
        },


        /*

         exports.getQueuedSpotlightsForCreator = getQueuedSpotlightsForCreator;
         exports.getScheduledSpotlightsForCreator = getScheduledSpotlightsForCreator;
         exports.getRejectedSpotlightForCreator = getRejectedSpotlightForCreator;


         */


    /**
     * @api {POST}  /v1/spotlight/creator/rejected  Spotlights  : Get Reject spotlights in creator
     * @apiName Get Reject spotlights in creator
     * @apiGroup Spotlight
     * @apiDescription Get Reject spotlights in creator
     * @apiHeader {String} Authorization
     * @apiParam {Number} page
     * @apiParam {Number} venue_id
     * @apiParam {Number} creator_id
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
  "is_success": true,
  "result": [
    {
      "spotlight_id": 3,
      "title": 0,
      "description": null,
      "type": "CREATIVE",
      "venue_id": 176,
      "published_start_date_time": 14500000000,
      "published_end_date_time": 12324334343,
      "event_start_date": null,
      "event_end_date": null,
      "event_start_time": null,
      "event_end_time": null,
      "active_day_string": null,
      "is_recurring": null,
      "venue_user_creator_id": 123,
      "venue_user_moderator_id": null,
      "fb": 0,
      "twt": 1,
      "ig": 0,
      "image": "/var/www/html/tagloy_new/images/b47065ce4f6177bc3ea8897b2728f4cd.jpg",
      "status": "REJECTED",
      "rejected_reason": "chfajlfkds",
      "parent_spotlight_id": null
    }
  ],
  "status_code": 200,
  "message": ""
     * }
     * @apiUse ErrorResponseFormat
     * */

        {
            method: 'POST',
            path: ServerDetails.env+'/spotlight/creator/rejected',
            config: {
                auth: false,
                validate : validations.spotlight_validations.get_spotlight_for_creator,
                handler: spotlight_controller.getRejectedSpotlightForCreator
            }
        },


    /**
     * @api {POST}  /v1/spotlight/creator/queued  Spotlights  : Get queued spotlights for creator
     * @apiName Get queued spotlights for creator
     * @apiGroup Spotlight
     * @apiDescription Get queued spotlights for creator
     * @apiHeader {String} Authorization
     * @apiParam {Number} page
     * @apiParam {Number} venue_id
     * @apiParam {Number} creator_id
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
          "is_success": true,
          "result": [
            {
              "spotlight_id": 5,
              "title": 0,
              "description": null,
              "type": "CREATIVE",
              "venue_id": 176,
              "published_start_date_time": 14500000000,
              "published_end_date_time": 12324334343,
              "event_start_date": null,
              "event_end_date": null,
              "event_start_time": null,
              "event_end_time": null,
              "active_day_string": null,
              "is_recurring": null,
              "venue_user_creator_id": null,
              "venue_user_moderator_id": null,
              "fb": 0,
              "twt": 1,
              "ig": 0,
              "image": "/var/www/html/tagloy_new/images/binary_clouds_by_unrater-d6l9ti3.png"
            }
          ],
          "status_code": 200,
          "message": ""
     * }
     * @apiUse ErrorResponseFormat
     * */
        {
            method: 'POST',
            path: ServerDetails.env+'/spotlight/creator/queued',
            config: {
                auth: false,
                validate : validations.spotlight_validations.get_spotlight_for_creator,
                handler: spotlight_controller.getQueuedSpotlightsForCreator
            }
        },


    /**
     * @api {POST}  /v1/spotlight/creator/scheduled  Spotlights  : Get scheduled spotlights for creator
     * @apiName Get scheduled spotlights for creator
     * @apiGroup Spotlight
     * @apiDescription Get scheduled spotlights for creator
     * @apiHeader {String} Authorization
     * @apiParam {Number} page
     * @apiParam {Number} venue_id
     * @apiParam {Number} creator_id
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
          "is_success": true,
          "result": [
            {
              "spotlight_id": 5,
              "title": 0,
              "description": null,
              "type": "CREATIVE",
              "venue_id": 176,
              "published_start_date_time": 14500000000,
              "published_end_date_time": 12324334343,
              "event_start_date": null,
              "event_end_date": null,
              "event_start_time": null,
              "event_end_time": null,
              "active_day_string": null,
              "is_recurring": null,
              "venue_user_creator_id": 123,
              "venue_user_moderator_id": null,
              "fb": 0,
              "twt": 1,
              "ig": 0,
              "image": "/var/www/html/tagloy_new/images/b47065ce4f6177bc3ea8897b2728f4cd.jpg"
            }
          ],
          "status_code": 200,
          "message": ""
     * }
     * @apiUse ErrorResponseFormat
     * */
        {
            method: 'POST',
            path: ServerDetails.env+'/spotlight/creator/scheduled',
            config: {
                auth: false,
                validate : validations.spotlight_validations.get_spotlight_for_creator,
                handler: spotlight_controller.getScheduledSpotlightsForCreator
            }
        },


        //Schedulers

        {
            method: 'GET',
            path: ServerDetails.env+'/spotlight/upload',
            config: {
                auth: false,
                handler: spotlight_controller.uploadSpotlightsToTwitter
            }
        },



        {
            method: 'GET',
            path: ServerDetails.env+'/spotlight/movetohistorical',
            config: {
                auth : "jwt",
                //validate : validations.feed_validations.marked_as_celebration,
                handler: spotlight_controller.movePublishedToHistorical
            }
        }



    ];
}();

