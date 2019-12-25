"use strict";

var validations = require('../validations');
var TagTvController = require('../Controllers/TagTvController');
var ServerDetails = require('../config/server_details');


module.exports = function() {
    return [

    /**
     * @api {POST}  /v1/tagtv/create  TagTv  : Create tag tv entry
     * @apiName Create tag tv entry
     * @apiGroup TagTv
     * @apiDescription TagTv  : Create tag tv entry
     * @apiHeader {String} Authorization
     * @apiParam {Number} venue_id
     * @apiParam {File} media
     * @apiParam {File} type
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
            "is_success": true,
            "result": {
            "id": 1,
            "venue_id": 138,
            "type": "IMAGE",
            "media_url": "https://testingnodeupload.s3.amazonaws.com/PFYIwnA.png",
            "updated_at": "2017-03-23T08:06:46.000Z",
            "created_at": "2017-03-23T08:06:46.000Z"
            },
            "status_code": 200,
            "message": "Successfully added entry into database"
     * }
     * @apiUse ErrorResponseFormat
     * */
        {
            method: 'POST',
            path: ServerDetails.env+'/tagtv/create',
            config: {
                payload: {
                    output: 'stream',
                    parse: true,
                    allow: 'multipart/form-data',
                    maxBytes: 1073741824,
                    timeout : 60000
                },
                auth : "jwt",
                validate : validations.tagtv_validations.create_entry,
                handler: TagTvController.insertIntoTagTv
            }
        },

    /**
     * @api {POST}  /v1/tagtv  TagTv  : get tag tv entries for venue
     * @apiName Get tag tv entries for venue
     * @apiGroup TagTv
     * @apiDescription TagTv  : Get tag tv entries for venue
     * @apiHeader {String} Authorization
     * @apiParam {Number} venue_id
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
          "is_success": true,
          "result": [
            {
              "id": 1,
              "venue_id": 138,
              "media_url": "https://testingnodeupload.s3.amazonaws.com/PFYIwnA.png",
              "type": "IMAGE",
              "created_at": "2017-03-23T08:06:46.000Z",
              "updated_at": "2017-03-23T08:06:46.000Z"
            }
          ],
          "status_code": 200,
          "message": ""
     * }
     * @apiUse ErrorResponseFormat
     * */
        {
            method: 'POST',
            path: ServerDetails.env+'/tagtv',
            config: {
                auth : "jwt",
                validate : validations.tagtv_validations.get_entries,
                handler: TagTvController.getEntriesForVenue
            }
        },

    /**
     * @api {POST} /v1/tagtv/delete  TagTv  : delete tag tv entry for venue
     * @apiName delete tag tv entry for venue
     * @apiGroup TagTv
     * @apiDescription delete tag tv entry for venue
     * @apiHeader {String} Authorization
     * @apiParam {Number} venue_id
     * @apiParam {Number} id
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
          "is_success": true,
          "result": [
            {
              "id": 1,
              "venue_id": 138,
              "media_url": "https://testingnodeupload.s3.amazonaws.com/PFYIwnA.png",
              "type": "IMAGE",
              "created_at": "2017-03-23T08:06:46.000Z",
              "updated_at": "2017-03-23T08:06:46.000Z"
            }
          ],
          "status_code": 200,
          "message": ""
     * }
     * @apiUse ErrorResponseFormat
     * */
        {
            method: 'POST',
            path: ServerDetails.env+'/tagtv/delete',
            config: {
                auth : "jwt",
                validate : validations.tagtv_validations.delete_entry,
                handler: TagTvController.deleteEntry
            }
        },

    ];
}();

