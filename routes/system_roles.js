"use strict";

var validations = require('../validations');
var roll_controller = require('../Controllers/SystemRoleController');
var ServerDetails = require('../config/server_details');


module.exports = function() {
    return [


    /**
     * @api {POST}  /role/create role : Create
     * @apiName Create role
     * @apiGroup role
     * @apiDescription Create role
     * @apiParam {String} name
     * @apiParam {Number} is_active
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
  "is_success": true,
    "result": [
    {
      "id": 2,
      "name": "SUPERADMIN",
      "is_active": 1,
      "created_at": "2017-02-17T09:06:27.000Z",
      "updated_at": "2017-02-17T09:06:27.000Z"
    },
    {
      "id": 3,
      "name": "ADMIN",
      "is_active": 1,
      "created_at": "2017-02-17T09:06:27.000Z",
      "updated_at": "2017-02-17T09:06:27.000Z"
    },
    {
      "id": 4,
      "name": "SALES",
      "is_active": 1,
      "created_at": "2017-02-17T09:06:27.000Z",
      "updated_at": "2017-03-02T13:33:25.000Z"
    }
  ],
  "message": "Created successfully",
  "status_code": 200
     *  }
     * @apiUse ErrorResponseFormat
     * */
        {
            method: 'POST',
            path: ServerDetails.env+'/role/create',
            config: {
                auth : "jwt",
                validate : validations.system_role_validations.create_api,
                handler : roll_controller.createRole
            }
        },

    /**
     * @api {POST}  /role/update role : Update
     * @apiName Update role
     * @apiGroup role
     * @apiDescription Update role
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
  "is_success": true,
   "result": [
    {
      "id": 2,
      "name": "SUPERADMIN",
      "is_active": 1,
      "created_at": "2017-02-17T09:06:27.000Z",
      "updated_at": "2017-02-17T09:06:27.000Z"
    },
    {
      "id": 3,
      "name": "ADMIN",
      "is_active": 1,
      "created_at": "2017-02-17T09:06:27.000Z",
      "updated_at": "2017-02-17T09:06:27.000Z"
    },
    {
      "id": 4,
      "name": "SALES",
      "is_active": 1,
      "created_at": "2017-02-17T09:06:27.000Z",
      "updated_at": "2017-03-02T13:33:25.000Z"
    }
  ],
  "message": "Updated successfully",
  "status_code": 200
     *  }
     * @apiUse ErrorResponseFormat
     * */
        {
            method: 'POST',
            path: ServerDetails.env+'/role/update',
            config: {
                auth : "jwt",
                validate : validations.system_role_validations.update_api,
                handler : roll_controller.updateRole
            }
        },

    /**
     * @api {POST}  /role/delete role : Delete
     * @apiName Delete role
     * @apiGroup role
     * @apiDescription delete role
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
  "is_success": true,
    "result": [
    {
      "id": 2,
      "name": "SUPERADMIN",
      "is_active": 1,
      "created_at": "2017-02-17T09:06:27.000Z",
      "updated_at": "2017-02-17T09:06:27.000Z"
    },
    {
      "id": 3,
      "name": "ADMIN",
      "is_active": 1,
      "created_at": "2017-02-17T09:06:27.000Z",
      "updated_at": "2017-02-17T09:06:27.000Z"
    },
    {
      "id": 4,
      "name": "SALES",
      "is_active": 1,
      "created_at": "2017-02-17T09:06:27.000Z",
      "updated_at": "2017-03-02T13:33:25.000Z"
    }
  ],
  "message": "Deleted successfully",
  "status_code": 200
     *  }
     * @apiUse ErrorResponseFormat
     * */
        {
            method: 'POST',
            path: ServerDetails.env+'/role/delete',
            config: {
                auth : "jwt",
                validate : validations.system_role_validations.delete_api,
                handler : roll_controller.deleteRole
            }
        },

    /**
     * @api {GET}  /role role : List
     * @apiName Get Categories
     * @apiGroup role
     * @apiDescription get Categories
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
  "is_success": true,
   "result": [
    {
      "id": 2,
      "name": "SUPERADMIN",
      "is_active": 1,
      "created_at": "2017-02-17T09:06:27.000Z",
      "updated_at": "2017-02-17T09:06:27.000Z"
    },
    {
      "id": 3,
      "name": "ADMIN",
      "is_active": 1,
      "created_at": "2017-02-17T09:06:27.000Z",
      "updated_at": "2017-02-17T09:06:27.000Z"
    },
    {
      "id": 4,
      "name": "SALES",
      "is_active": 1,
      "created_at": "2017-02-17T09:06:27.000Z",
      "updated_at": "2017-03-02T13:33:25.000Z"
    }
  ],
  "message": null,
  "status_code": 200
     *  }
     *  @apiUse ErrorResponseFormat
     * */
        {
            method: 'GET',
            path: ServerDetails.env+'/role',
            config: {
                auth : "jwt",
                handler : roll_controller.getRoles
            }
        }

    ];
}();

