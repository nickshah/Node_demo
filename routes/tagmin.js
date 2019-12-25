"use strict";

var validations = require('../validations');
var TagMinController = require('../Controllers/TagMinController');
var ServerDetails = require('../config/server_details');


module.exports = function() {
    return [

    /**
     * @api {POST}  /v1/tagmin/create  TagMin  : Create tag Min entry
     * @apiName Create tag Min entry
     * @apiGroup Tagmin
     * @apiDescription Tagmin  : Create tag Min entry
     * @apiHeader {String} Authorization
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
            path: ServerDetails.env+'/tagmin/create',
            config: {
                payload: {
                    output: 'stream',
                    parse: true,
                    allow: 'multipart/form-data',
                    maxBytes: 1073741824,
                    timeout : 60000
                },
                auth : "jwt",
                validate : validations.tag_min_validations.create_entry,
                handler: TagMinController.insertIntoTagMin
            }
        },

    /**
     * @api {POST}  /v1/tagmin  TagMin  : get tag Min entries for venue
     * @apiName Get tag Min entries for venue
     * @apiGroup Tagmin
     * @apiDescription Tagmin  : Get tag min entries for venue
     * @apiHeader {String} Authorization
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
            path: ServerDetails.env+'/tagmin',
            config: {
                auth : "jwt",
                validate : validations.tag_min_validations.get_entries,
                handler: TagMinController.getEntriesForTagMin
            }
        },

    /**
     * @api {POST} /v1/tagmin/delete  TagMin  : delete tag min entry
     * @apiName delete tag min entry
     * @apiGroup Tagmin
     * @apiDescription delete tag min entry
     * @apiHeader {String} Authorization
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
            path: ServerDetails.env+'/tagmin/delete',
            config: {
                auth : "jwt",
                validate : validations.tag_min_validations.delete_entry,
                handler: TagMinController.deleteEntry
            }
        }

    ];
}();

