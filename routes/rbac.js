"use strict";

var validations = require('../validations');
var RbacController = require('../Controllers/RbacController');
var ServerDetails = require('../config/server_details');


module.exports = function() {
    return [

    /**
     * @api {GET}  /v1/features  RBAC  : Get Features
     * @apiName Get Features
     * @apiGroup Rbac
     * @apiDescription Get Features
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
          "is_success": true,
          "result": [
            {
              "id": 1,
              "name": "/venue/add",
              "description": null,
              "created_at": "2017-02-21T00:00:00.000Z",
              "updated_at": "2017-02-21T00:00:00.000Z"
            },
            {
              "id": 2,
              "name": "/venue",
              "description": null,
              "created_at": "2017-03-13T06:02:59.000Z",
              "updated_at": "2017-03-13T06:02:59.000Z"
            }
          ],
          "status_code": 200,
          "message": null
     * }
     * @apiUse ErrorResponseFormat
     * */
        {
            method: 'GET',
            path: ServerDetails.env+'/features',
            config: {
                auth : "jwt",
                handler: RbacController.getFeatureList
            }
        },

    /**
     * @api {GET}  /v1/roles  RBAC  : Get roles
     * @apiName Get roles
     * @apiGroup Rbac
     * @apiDescription Get roles
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
          "status_code": 200,
          "message": null
     * }
     * @apiUse ErrorResponseFormat
     * */
        {
            method: 'GET',
            path: ServerDetails.env+'/roles',
            config: {
                auth : "jwt",
                handler: RbacController.getRoles
            }
        },

    /**
     * @api {POST}  /v1/feature/create  RBAC  : Create new feature
     * @apiName create new feature
     * @apiGroup Rbac
     * @apiDescription create new feature
     * @apiParam {string} name
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
          "status_code": 200,
          "message": "Feature Created"
     * }
     * @apiUse ErrorResponseFormat
     * */

        {
            method: 'POST',
            path: ServerDetails.env+'/feature/create',
            config: {
                auth : "jwt",
                validate : validations.rbac_validations.create_feature,
                handler: RbacController.createFeature
            }
        },


    /**
     * @api {GET}  /v1/rolefeature  RBAC  : Get Role Feature mapping
     * @apiName Get role feature feature mapping
     * @apiGroup Rbac
     * @apiDescription Get role feature mapping
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
          "is_success": true,
          "result": [
            {
              "role_feature_id": 2,
              "role_id": 4,
              "feature_id": 1,
              "feature_name": "/venue/add",
              "role_name": "SALES",
              "organization_group": "OWNER"
            },
            {
              "role_feature_id": 3,
              "role_id": 3,
              "feature_id": 2,
              "feature_name": "/venue",
              "role_name": "ADMIN",
              "organization_group": "OWNER"
            },
            {
              "role_feature_id": 4,
              "role_id": 3,
              "feature_id": 1,
              "feature_name": "/venue/add",
              "role_name": "ADMIN",
              "organization_group": "OWNER"
            }
          ],
          "status_code": 200,
          "message": null
     * }
     * @apiUse ErrorResponseFormat
     * */
        {
            method: 'GET',
            path: ServerDetails.env+'/rolefeature',
            config: {
                auth : "jwt",
                handler: RbacController.getRoleFeatureMapping
            }
        },



    /**
     * @api {POST}  /v1/rolefeature/create  RBAC  : Create rolefeature mapping
     * @apiName Create rolefeature mapping
     * @apiGroup Rbac
     * @apiDescription Create mapping for roles for assessable features
     * @apiParam {string} organization_group
     * @apiParam {Number} feature_id
     * @apiParam {Number} venue_id
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
          "is_success": true,
          "result": [
            {
              "role_feature_id": 2,
              "role_id": 4,
              "feature_id": 1,
              "feature_name": "/venue/add",
              "role_name": "SALES",
              "organization_group": "OWNER"
            },
            {
              "role_feature_id": 3,
              "role_id": 3,
              "feature_id": 2,
              "feature_name": "/venue",
              "role_name": "ADMIN",
              "organization_group": "OWNER"
            },
            {
              "role_feature_id": 4,
              "role_id": 3,
              "feature_id": 1,
              "feature_name": "/venue/add",
              "role_name": "ADMIN",
              "organization_group": "OWNER"
            }
          ],
          "status_code": 200,
          "message": "Role feature mapping created"
     * }
     * @apiUse ErrorResponseFormat
     * */


        {
            method: 'POST',
            path: ServerDetails.env+'/rolefeature/create',
            config: {
                auth : "jwt",
                validate : validations.rbac_validations.createRoleFeatureMapping,
                handler: RbacController.createRoleFeatureMapping
            }
        }






    ];
}();

