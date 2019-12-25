"use strict";

var validations = require('../validations');
var TagManageController = require('../Controllers/TagManageController');
var ServerDetails = require('../config/server_details');


module.exports = function() {
    return [

    /**
     * @api {POST}  /v1/tagmanage/create  TagMin  : Create tag Min entry
     * @apiName Create tag Min entry
     * @apiGroup Tagloy manage
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
            path: ServerDetails.env+'/tagmanage/create',
            config: {
                payload: {
                    output: 'stream',
                    parse: true,
                    allow: 'multipart/form-data',
                    maxBytes: 1073741824,
                    timeout : 60000
                },
                auth : "jwt",
                validate : validations.tagmanage_validations.create_entry,
                handler: TagManageController.insertIntoTagManage
            }
        },

    /**
     * @api {POST}  /v1/tagmanage  TagMin  : get tag Min entries for venue
     * @apiName Get tag Min entries for venue
     * @apiGroup Tagloy manage
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
            path: ServerDetails.env+'/tagmanage',
            config: {
                auth : "jwt",
                validate : validations.tagmanage_validations.get_entries,
                handler: TagManageController.getEntriesForTagManage
            }
        },

    /**
     * @api {POST} /v1/tagmanage/delete  TagMin  : delete tag min entry
     * @apiName delete tag min entry
     * @apiGroup Tagloy Manage
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
            path: ServerDetails.env+'/tagmanage/delete',
            config: {
                auth : "jwt",
                validate : validations.tagmanage_validations.delete_entry,
                handler: TagManageController.deleteEntry
            }
        },

        {
            method: 'POST',
            path: ServerDetails.env+'/tagmanage/update',
            config: {
                payload: {
                    output: 'stream',
                    parse: true,
                    allow: 'multipart/form-data',
                    maxBytes: 1073741824,
                    timeout : 60000
                },
                auth : "jwt",
                validate : validations.tagmanage_validations.update_entry,
                handler: TagManageController.updateEntry
            }
        },

        {
            method: 'POST',
            path: ServerDetails.env+'/tagmanage/live',
            config: {
                auth : "jwt",
                validate : validations.tagmanage_validations.get_live_entries,
                handler: TagManageController.getLiveEntriesForTagManage
            }
        },

        {
            method: 'POST',
            path: ServerDetails.env+'/tagmanage/liveAd',
            config: {
                auth : "jwt",
                validate : validations.tagmanage_validations.get_liveAd_entries,
                handler: TagManageController.getLiveAdEntriesForTagManage
            }
        }

    ];
}();

