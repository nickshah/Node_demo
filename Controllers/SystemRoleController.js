'use strict';

var Response = require('../Classes/Util/Response');
var StatusCodes = require('../Classes/Util/StatusCodes');
var SystemRoles = require('../Classes/SystemRoles')



function createRole(request,reply) {

    try {

        var systemRoles = new SystemRoles(request.payload);
        systemRoles.createRole(function(success_data){

            reply(success_data).code(success_data.status_code);
        },function(error_data){

            reply(error_data).code(error_data.status_code);
        });
    } catch (err) {

        reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}



function getRoles(request,reply){

    try {

        var systemRoles = new SystemRoles({});
        systemRoles.getAllRoles(function(success_data){

            reply(success_data).code(success_data.status_code);
        },function(error_data){

            reply(error_data).code(error_data.status_code);
        });
    }catch (err) {

        reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}


function updateRole(request,reply){

    try {

        try {

            var systemRoles = new SystemRoles(request.payload);
            systemRoles.updateRole(request.payload,function(success_data){

                reply(success_data).code(success_data.status_code);
            },function(error_data){

                reply(error_data).code(error_data.status_code);
            });
        }catch (err) {

            reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
        }
    }catch (e) {

        console.log(e.message);
    }
}


function deleteRole(request,reply) {

    try {

        var systemRoles = new SystemRoles(request.payload);
        systemRoles.deleteRole(request.payload,function(success_data){

            reply(success_data).code(success_data.status_code);
        },function(error_data){

            reply(error_data).code(error_data.status_code);
        });
    }catch (err) {

        reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}


exports.createRole = createRole;
exports.updateRole = updateRole;
exports.getRoles = getRoles;
exports.deleteRole = deleteRole;


