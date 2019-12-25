"use strict";

var validations = require('../validations');
var login_controller = require('../Controllers/LoginController');
var ServerDetails = require('../config/server_details');


module.exports = function() {
    return [

    /**
     * @api {POST}  /v1/login  Venue User : Login
     * @apiName login
     * @apiGroup Venue User
     * @apiDescription login
     * @apiParam {String} email
     * @apiParam {String} password
     * @apiParam {Number} [organization_id]
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
  "is_success": true,
  "result": {
    "id": 64,
    "first_name": "Anway",
    "last_name": null,
    "email": "anway.kulkarni@iauro.com",
    "alternate_email": null,
    "is_email_verified": 1,
    "is_first_time": 1,
    "parent_id": null,
    "is_active": 1,
    "added_by": null,
    "twitter_id": "",
    "facebook_id": "",
    "instagram_id": "",
    "created_at": "2017-03-09T11:40:04.000Z",
    "updated_at": "2017-03-09T11:42:23.000Z",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFud2F5Lmt1bGthcm5pQGlhdXJvLmNvbSIsImlkIjo2NCwiaWF0IjoxNDg5NTUzOTQwLCJleHAiOjE0ODk2NDAzNDB9.d6fQlMvvzKsGkQyYcyh4TXyjsCEUnBbXmBLdntc_N6A",
    "organization_id": 177,
    "role_id": 3,
    "organization_name": "Iauro",
    "group": "CUSTOMER"
  },
  "message": null,
  "status_code": 200
     * }
     * @apiErrorExample {json} Error-Response:
     * HTTP/1.1 400 BAD REQUEST
     * {
          "is_success": false,
          "result": [
            {
              "organization_id": 176,
              "role_id": 3,
              "group": "CUSTOMER",
              "organization_name": "Iauro"
            },
            {
              "organization_id": 177,
              "role_id": 3,
              "group": "CUSTOMER",
              "organization_name": "Iauro"
            },
            {
              "organization_id": 178,
              "role_id": 3,
              "group": "CUSTOMER",
              "organization_name": "Iauro"
            }
          ],
          "message": "Venue User associated with multiple organizations",
          "status_code": 400
     * }
     * @apiUse ErrorResponseFormat
     * */
        {
            method: 'POST',
            path: ServerDetails.env+'/login',
            config: {
                auth : false,
                validate : validations.login_validations.login,
                handler: login_controller.login
            }
        },

    /**
     * @api {POST}  /v1/forgotpassword  Venue User  : Forgot password
     * @apiName Forgot password
     * @apiGroup Venue User
     * @apiDescription Forgot password
     * @apiParam {String} email
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
   "is_success": true,
   "result": {
     "id": 64,
     "first_name": "Anway",
     "last_name": null,
     "email": "anway.kulkarni@iauro.com",
     "alternate_email": null,
     "password": "803c05dd3dd6ed81",
     "is_email_verified": 1,
     "is_first_time": 1,
     "parent_id": null,
     "is_active": 1,
     "added_by": null,
     "twitter_id": "",
     "facebook_id": "",
     "instagram_id": "",
     "created_at": "2017-03-09T11:40:04.000Z",
     "updated_at": "2017-03-09T11:42:23.000Z",
     "forgot_password_email_data": {
       "verification_token": "EpZQ2t5YYbvPLiL5LP4bUdjAAlzK1XiP",
       "encrypted_user_id": "c669"
     }
   },
   "message": null,
   "status_code": 200
     * }
     * @apiUse ErrorResponseFormat
     * */
        {
            method: 'POST',
            path: ServerDetails.env+'/forgotpassword',
            config: {
                auth : false,
                validate : validations.login_validations.forgot_password,
                handler: login_controller.forgotPassword
            }
        },

    /**
     * @api {POST}  /v1/updatepassword  Venue User  : Update password
     * @apiName Update password
     * @apiGroup Venue User
     * @apiDescription Update password
     * @apiParam {String} token
     * @apiParam {Number} encrypted_user_id
     * @apiParam {String} password
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
      "is_success": true,
      "result": {
        "id": 64,
        "first_name": "Anway",
        "last_name": null,
        "email": "anway.kulkarni@iauro.com",
        "alternate_email": null,
        "is_email_verified": 1,
        "is_first_time": 1,
        "parent_id": null,
        "is_active": 1,
        "added_by": null,
        "twitter_id": "",
        "facebook_id": "",
        "instagram_id": "",
        "created_at": "2017-03-09T11:40:04.000Z",
        "updated_at": "2017-03-09T11:42:23.000Z"
      },
      "message": "Password updated",
      "status_code": 200
     * }
     * @apiUse ErrorResponseFormat
     * */
        {
            method: 'POST',
            path: ServerDetails.env+'/updatepassword',
            config: {
                auth : false,
                validate : validations.login_validations.updatePassword,
                handler: login_controller.updatePassword
            }
        },


    /**
     * @api {POST}  /v1/verifyemail  Venue User  : Verify Email
     * @apiName Verify Email
     * @apiGroup Venue User
     * @apiDescription Verify Email with change password if needed
     * @apiParam {String} token
     * @apiParam {Number} encrypted_user_id
     * @apiParam {String} [password]
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
      "is_success": true,
      "result": {
        "id": 64,
        "first_name": "Anway",
        "last_name": null,
        "email": "anway.kulkarni@iauro.com",
        "alternate_email": null,
        "is_email_verified": 1,
        "is_first_time": 1,
        "parent_id": null,
        "is_active": 1,
        "added_by": null,
        "twitter_id": "",
        "facebook_id": "",
        "instagram_id": "",
        "created_at": "2017-03-09T11:40:04.000Z",
        "updated_at": "2017-03-09T11:42:23.000Z"
      },
      "message": "Email verified successfully",
      "status_code": 200
     * }
     * @apiUse ErrorResponseFormat
     * */
        {
            method: 'POST',
            path: ServerDetails.env+'/verifyemail',
            config: {
                auth : false,
                validate : validations.login_validations.verifyEmail,
                handler: login_controller.verifyEmail
            }
        }
    ];
}();

