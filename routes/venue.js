"use strict";

var validations = require('../validations');
var venue_controller = require('../Controllers/VenueController');
var ServerDetails = require('../config/server_details');


module.exports = function() {
    return [
    /**
     * @api {POST}  /v1/venue/add  Venue  : On boarding
     * @apiName Venue On boarding
     * @apiGroup Venue
     * @apiDescription Venue on boarding
     * @apiHeader {String} Authorization
     * @apiParam {String} start_time
     * @apiParam {String} end_time
     * @apiParam {String} latitude
     * @apiParam {String} longitude
     * @apiParam {Number} is_black_board
     * @apiParam {String} type
     * @apiParam {String} type
     * @apiParam {String} black_board_json
     * @apiParam {String} email
     * @apiParam {String} first_name
     * @apiParam {String} [beacon_ids]
     * @apiParam {FILE} [logo_file]
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
          "is_success": true,
          "result": {
            "id": 77,
            "venue_id": 185,
            "name": "Iauro",
            "hash_tag": "pune1",
            "start_time": null,
            "end_time": null,
            "address": null,
            "latitude": null,
            "longitude": null,
            "is_black_board": 1,
            "black_board_json": null,
            "auto_approval": 0,
            "updated_at": "2017-03-15T09:45:38.000Z",
            "created_at": "2017-03-15T09:45:38.000Z"
          },
          "status_code": 201,
          "message": "Venue on boarded successfully"
     * }
     * @apiUse ErrorResponseFormat
     * @apiErrorExample Error-Response:
     * HTTP/1.1 400 BAD REQUEST
     * {

     * }
     * */
        {
            method: 'POST',
            path: ServerDetails.env+'/venue/add',
            config: {
                payload: {
                    output: 'stream',
                    parse: true,
                    allow: 'multipart/form-data'
                },
                auth : false,
                validate : validations.venue_validations.add_entry,
                handler: venue_controller.addVenue
            }
        },


        {
            method: 'POST',
            path: ServerDetails.env+'/venue/addgroup',
            config: {
                auth : false,
                validate : validations.venue_validations.add_group,
                handler: venue_controller.addGroup
            }
        },

    /**
     * @api {POST}  /v1/venue/assign/user  Venue  : Assign user to venue
     * @apiName Assign user to venue
     * @apiGroup Venue
     * @apiDescription Venue on boarding
     * @apiHeader {String} Authorization
     * @apiParam {Number} venue_id
     * @apiParam {Number} role_id
     * @apiParam {String} email
     * @apiParam {String} first_name
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
          "is_success": true,
          "result": null,
          "status_code": 200,
          "message": "Venue user assigned"
     * }
     * @apiUse ErrorResponseFormat
     * */
        {
            method: 'POST',
            path: ServerDetails.env+'/venue/assign/user',
            config: {
                auth : "jwt",
                validate : validations.venue_validations.assign_user,
                handler: venue_controller.assignUserToVenue
            }
        },

    /**
     * @api {POST}  /v1/venue/remove/user  Venue  : Remove user to venue
     * @apiName Remove user from system roles of venue
     * @apiGroup Venue
     * @apiDescription Remove user from system roles of venue
     * @apiHeader {String} Authorization
     * @apiParam {Number} venue_id
     * @apiParam {Number} role_id
     * @apiParam {Number} user_id
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
          "is_success": true,
          "result": null,
          "status_code": 200,
          "message": "Venue user removed"
     * }
     * @apiUse ErrorResponseFormat
     * */
        {
            method: 'POST',
            path: ServerDetails.env+'/venue/remove/user',
            config: {
                auth : "jwt",
                validate : validations.venue_validations.remove_user,
                handler: venue_controller.removeUserFromVenue
            }
        },

    /**
     * @api {POST}  /v1/venue/ban/user  Venue  : Banned user for venue
     * @apiName  Banned user for venue
     * @apiGroup Venue
     * @apiDescription  Banned user for venue
     * @apiHeader {String} Authorization
     * @apiParam {Number} venue_id
     * @apiParam {Number} customer_id
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
          "is_success": true,
          "result": null,
          "status_code": 200,
          "message": "requested user is banned for venue"
     * }
     * @apiUse ErrorResponseFormat
     * */
        {
            method: 'POST',
            path: ServerDetails.env+'/venue/ban/user',
            config: {
                auth : "jwt",
                validate : validations.venue_validations.ban_user,
                handler: venue_controller.banUser
            }
        },

    /**
     * @api {POST}  /v1/venue/favourite/user  Venue  : Favourite user for venue
     * @apiName  make favourite user for venue
     * @apiGroup Venue
     * @apiDescription  favourite user for venue
     * @apiHeader {String} Authorization
     * @apiParam {Number} venue_id
     * @apiParam {Number} customer_id
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
          "is_success": true,
          "result": null,
          "status_code": 200,
          "message": "The requested customer is favourite for venue"
     * }
     * @apiUse ErrorResponseFormat
     * */
        {
            method: 'POST',
            path: ServerDetails.env+'/venue/favourite/user',
            config: {
                auth : "jwt",
                validate : validations.venue_validations.favourite_user,
                handler: venue_controller.favouriteUser
            }
        },


    /**
     * @api {POST}  /v1/venue/note/user  Venue  : Add venue note to user
     * @apiName  Add venue note
     * @apiGroup Venue
     * @apiDescription  Add venue note to user
     * @apiHeader {String} Authorization
     * @apiParam {Number} venue_id
     * @apiParam {Number} customer_id
     * @apiParam {String} venue_note
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
          "is_success": true,
          "result": null,
          "status_code": 200,
          "message": "venue note added successfully"
     * }
     * @apiUse ErrorResponseFormat
     * */
        {
            method: 'POST',
            path: ServerDetails.env+'/venue/note/user',
            config: {
                auth : "jwt",
                validate : validations.venue_validations.add_venue_note,
                handler: venue_controller.venueNoteUser
            }
        },


    /**
     * @api {POST}  /v1/venue/social_media/add  Venue  : Add social media mapping
     * @apiName  Add social media mapping
     * @apiGroup Venue
     * @apiDescription Add social media mapping
     * @apiHeader {String} Authorization
     * @apiParam {Number} venue_id
     * @apiParam {Number} social_media_id
     * @apiParam {String} consumer_key
     * @apiParam {String} secret_key
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
          "is_success": true,
          "result": null,
          "status_code": 200,
          "message": "Successfully added entry into database"
     * }
     * @apiUse ErrorResponseFormat
     * */
        {
            method: 'POST',
            path: ServerDetails.env+'/venue/social_media/add',
            config: {
                auth : "jwt",
                validate : validations.venue_validations.social_media_mapping,
                handler: venue_controller.addVenueSocialMediaMapping
            }
        },

        {
            method: 'POST',
            path: ServerDetails.env+'/venue/social_media/remove',
            config: {
                auth : "jwt",
                validate : validations.venue_validations.social_media_mapping,
                handler: venue_controller.removeVenueSocialMediaMapping
            }
        },

    /**
     * @api {POST}  /v1/venue/social_media/twitter/request-token  Venue  : Get Twitter Request Token
     * @apiName  Twitter Request Token
     * @apiGroup Venue
     * @apiDescription Get Twitter Request Token
     * @apiHeader {String} Authorization
     * @apiParam {Number} venue_id
     * @apiParam {Number} social_media_id
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
          "is_success": true,
          "result": "",
          "status_code": 200,
          "message": "SUCCESS"
     * }
     * @apiUse ErrorResponseFormat
     * */
        {
            method: 'POST',
            path: ServerDetails.env+'/venue/social_media/twitter/request-token',
            config: {
                auth : "jwt",
                validate : validations.venue_validations.get_twitter_request_token,
                handler: venue_controller.getTwitterRequestToken
            }
        },




    /**
     * @api {POST}  /v1/venue/social_media/twitter/access-token  Venue  : Get Twitter Access Token
     * @apiName  Twitter Access Token
     * @apiGroup Venue
     * @apiDescription Get Twitter Access Token
     * @apiHeader {String} Authorization
     * @apiParam {Number} venue_id
     * @apiParam {Number} social_media_id
     * @apiParam {String} oauth_token
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
          "is_success": true,
          "result": "",
          "status_code": 200,
          "message": "SUCCESS"
     * }
     * @apiUse ErrorResponseFormat
     * */
        {
            method: 'POST',
            path: ServerDetails.env+'/venue/social_media/twitter/access-token',
            config: {
                auth : "jwt",
                validate : validations.venue_validations.get_twitter_access_token,
                handler: venue_controller.getTwitterAccessToken
            }
        },



    /**
     * @api {POST}  /v1/venue/social_media/update  Venue  : update social media mapping
     * @apiName  update social media mapping
     * @apiGroup Venue
     * @apiDescription update social media mapping
     * @apiHeader {String} Authorization
     * @apiParam {Number} venue_id
     * @apiParam {Number} social_media_id
     * @apiParam {String} consumer_key
     * @apiParam {String} secret_key
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
          "is_success": true,
          "result": null,
          "status_code": 200,
          "message": "Successfully added entry into database"
     * }
     * @apiUse ErrorResponseFormat
     * */
        {
            method: 'POST',
            path: ServerDetails.env+'/venue/social_media/update',
            config: {
                auth : "jwt",
                validate : validations.venue_validations.social_media_mapping,
                handler: venue_controller.updateVenueSocialMediaMapping
            }
        },




    /**
     * @api {POST}  /v1/venue/social_media  Venue  : Get social media details for venue
     * @apiName  Get social media details for venue
     * @apiGroup Venue
     * @apiDescription Get social media details for venue
     * @apiHeader {String} Authorization
     * @apiParam {Number} venue_id
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
     * }
     * @apiUse ErrorResponseFormat
     * */
        {
            method: 'POST',
            path: ServerDetails.env+'/venue/social_media',
            config: {
                auth : "jwt",
                validate : validations.venue_validations.get_social_media_mapping,
                handler: venue_controller.getVenueSocialMediaMapping
            }
        },


    /**
     * @api {POST} /v1/venue/blackboard/update  Venue  : Update black board details
     * @apiName  Update black board details
     * @apiGroup Venue
     * @apiDescription Update black board details
     * @apiHeader {String} Authorization
     * @apiParam {Number} venue_id
     * @apiParam {Number} is_black_board
     * @apiParam {Number} black_board_json
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
     * }
     * @apiUse ErrorResponseFormat
     * */
        {
            method: 'POST',
            path: ServerDetails.env+'/venue/blackboard/update',
            config: {
                auth : "jwt",
                validate : validations.venue_validations.update_black_board,
                handler: venue_controller.updateBlackBoard
            }
        },



    /**
     * @api {POST}  /v1/venue/blackboard  Venue  : get black board details
     * @apiName   get black board details
     * @apiGroup Venue
     * @apiDescription  get black board details
     * @apiHeader {String} Authorization
     * @apiParam {Number} venue_id
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
     * }
     * @apiUse ErrorResponseFormat
     * */
        {
            method: 'POST',
            path: ServerDetails.env+'/venue/blackboard',
            config: {
                auth : "jwt",
                validate : validations.venue_validations.get_black_board,
                handler: venue_controller.getBlackBoard
            }
        },

    /**
     * @api {POST}  /v1/venue/customer  Venue  : Get Customers for venue
     * @apiName   Get Customers for venue
     * @apiGroup Venue
     * @apiDescription  Get Customers for venue
     * @apiHeader {String} Authorization
     * @apiParam {Number} venue_id
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
     * }
     * @apiUse ErrorResponseFormat
     * */
        {
            method: 'POST',
            path: ServerDetails.env+'/venue/customer',
            config: {
                auth : "jwt",
                validate : validations.customer_validations.get_customers_for_venue,
                handler: venue_controller.getCustomersForVenue
            }
        },


    /**
     * @api {POST}  /v1/venue/customer/invenue  Venue  : Get In venue Customers for venue
     * @apiName   Get In venue Customers for venue
     * @apiGroup Venue
     * @apiDescription Get In venue Customers for venue
     * @apiHeader {String} Authorization
     * @apiParam {Number} venue_id
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
     * }
     * @apiUse ErrorResponseFormat
     * */
        {
            method: 'POST',
            path: ServerDetails.env+'/venue/customer/invenue',
            config: {
                auth : "jwt",
                validate : validations.customer_validations.get_customers_for_venue,
                handler: venue_controller.getInVenueCustomersForVenue
            }
        },


    /**
     * @api {POST}  /v1/venue/update  Venue  : Update venue details
     * @apiName Venue On boarding
     * @apiGroup Venue
     * @apiDescription Venue on boarding
     * @apiHeader {String} Authorization
     * @apiParam {Number} venue_id
     * @apiParam {String} start_time
     * @apiParam {String} end_time
     * @apiParam {String} latitude
     * @apiParam {String} longitude
     * @apiParam {Number} is_black_board
     * @apiParam {String} type
     * @apiParam {String} type
     * @apiParam {String} black_board_json
     * @apiParam {String} [beacon_ids]
     * @apiParam {FILE} [logo_file]
     * @apiParam {String} email
     * @apiParam {String} first_name
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
          "is_success": true,
          "result": {
            "id": 77,
            "venue_id": 185,
            "name": "Iauro",
            "hash_tag": "pune1",
            "start_time": null,
            "end_time": null,
            "address": null,
            "latitude": null,
            "longitude": null,
            "is_black_board": 1,
            "black_board_json": null,
            "auto_approval": 0,
            "updated_at": "2017-03-15T09:45:38.000Z",
            "created_at": "2017-03-15T09:45:38.000Z"
          },
          "status_code": 201,
          "message": "Venue on boarded successfully"
     * }
     * @apiUse ErrorResponseFormat
     * */
        {
            method: 'POST',
            path: ServerDetails.env+'/venue/update',
            config: {
                payload: {
                    output: 'stream',
                    parse: true,
                    allow: 'multipart/form-data'
                },
                auth : "jwt",
                validate : validations.venue_validations.update_entry,
                handler: venue_controller.updateVenue
            }
        },


    /**
     * @api {POST}  /v1/venue/get  Venue  : Get venue details
     * @apiName Get Venue
     * @apiGroup Venue
     * @apiDescription Get Venue
     * @apiHeader {String} Authorization
     * @apiParam {Number} venue_id
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
          "is_success": true,
          "result": {
            "id": 77,
            "venue_id": 185,
            "name": "Iauro",
            "hash_tag": "pune1",
            "start_time": null,
            "end_time": null,
            "address": null,
            "latitude": null,
            "longitude": null,
            "is_black_board": 1,
            "black_board_json": null,
            "auto_approval": 0,
            "updated_at": "2017-03-15T09:45:38.000Z",
            "created_at": "2017-03-15T09:45:38.000Z"
          },
          "status_code": 201,
          "message": "Venue on boarded successfully"
     * }
     * @apiUse ErrorResponseFormat
     * */
        {
            method: 'POST',
            path: ServerDetails.env+'/venue/get',
            config: {
                auth : "jwt",
                validate : validations.venue_validations.get_entry,
                handler: venue_controller.getVenue
            }
        },

        {
            method: 'POST',
            path: ServerDetails.env+'/venue/getByBeacon',
            config: {
                auth : "jwt",
                validate : validations.venue_validations.get_by_beacon,
                handler: venue_controller.getVenueByBeacon
            }
        },

    /**
     * @api {POST}  /v1/venue/roles  Venue  : Get venue roles
     * @apiName Get roles
     * @apiGroup Venue
     * @apiDescription Get roles
     * @apiHeader {String} Authorization
     * @apiParam {Number} venue_id
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
          "is_success": true,
          "result": [
            {
                display_name: "Admin Email",
                emails: [
                    "vedant.kakade@iauro.com",
                    "vedant.kakade@iauro.com"
                ]
            },
            {
                display_name: "Admin Email",
                emails: [
                    "vedant.kakade@iauro.com",
                    "vedant.kakade@iauro.com"
                ]
            }
        ],
          "status_code": 200,
          "message": "Roles of requested venue"
     * }
     * @apiUse ErrorResponseFormat
     * */
        {
            method: 'POST',
            path: ServerDetails.env+'/venue/roles',
            config: {
                auth : "jwt",
                validate : validations.venue_validations.get_roles,
                handler: venue_controller.getVenueRoles
            }
        },


    /**
     * @api {POST}  /v1/venue/tv-status  Venue  : Get venue tv status
     * @apiName Get Venue tv status
     * @apiGroup Venue
     * @apiDescription Get Venue tv status
     * @apiHeader {String} Authorization
     * @apiParam {Number} venue_id
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
          "is_success": true,
          "result": {
            "tv_status": 0
          },
          "status_code": 200,
          "message": "Venue TV is offline"
     * }
     * @apiUse ErrorResponseFormat
     * */
        {
            method: 'POST',
            path: ServerDetails.env+'/venue/tv-status',
            config: {
                auth : "jwt",
                validate : validations.venue_validations.get_tv_status,
                handler: venue_controller.getVenueTVStatus
            }
        },


    /**
     * @api {POST}  /v1/venue/list  Venue  : Get venue list
     * @apiName Get Venue list
     * @apiGroup Venue
     * @apiDescription Get Venue list
     * @apiHeader {String} Authorization
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
          "is_success": true,
          "result": [],
          "status_code": 200,
          "message": "Venue List"
     * }
     * @apiUse ErrorResponseFormat
     * */
        {
            method: 'POST',
            path: ServerDetails.env+'/venue/list',
            config: {
                auth : "jwt",
                handler: venue_controller.getVenueList
            }
        },


    /**
     * @api {POST}  /v1/venue/user/perk/send  Venue  : Send Customer Perk to user/users
     * @apiName Send Customer Perk to user/users
     * @apiGroup Users
     * @apiDescription Send Customer Perk to user/users
     * @apiHeader {String} Authorization
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
          "is_success": true,
          "result": [],
          "status_code": 200,
          "message": "Successfully Sent"
     * }
     * @apiUse ErrorResponseFormat
     * */
        {
            method: 'POST',
            path: ServerDetails.env+'/venue/user/perk/send',
            config: {
                auth : "jwt",
                validate : validations.venue_validations.send_perk,
                handler: venue_controller.sendPerk
            }
        },


    /**
     * @api {POST}  /v1/venue/list  Venue  : Get venue list
     * @apiName Get Venue list
     * @apiGroup Venue
     * @apiDescription Get Venue list
     * @apiHeader {String} Authorization
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
          "is_success": true,
          "result": [],
          "status_code": 200,
          "message": "Venue List"
     * }
     * @apiUse ErrorResponseFormat
     * */
        {
            method: 'POST',
            path: ServerDetails.env+'/venue/group/list',
            config: {
                auth : "jwt",
                handler: venue_controller.getGroupOrganizationList
            }
        }




    ];
}();

