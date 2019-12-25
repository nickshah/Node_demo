'use strict';

var Response = require('../Classes/Util/Response');
var StatusCodes = require('../Classes/Util/StatusCodes');
var Login = require('../Classes/Login');
var Rbac = require('../rbac');
var dbDetails = require('../config/db_details');

console.log(Login);

function createFeature(request,reply) {

    try {

        var rbac = new Rbac(dbDetails.rbac_database, dbDetails.username, dbDetails.password, dbDetails.host);

        rbac.connectedToDatabase(function(is_connected){

            rbac.createFeature( request.payload , function(success_data){

                reply( Response.sendResponse(true,success_data.result,"Feature Created",status_codes.CREATED)).code( status_codes.CREATED );
            } , function( error_data ) {

                reply( Response.sendResponse(true,null,error_data.message,status_codes.BAD_REQUEST)).code( status_codes.BAD_REQUEST );
            } )
        },function(error_data) {

            reply( Response.sendResponse(true,null,error_data.message,status_codes.CREATED)).code( status_codes.BAD_REQUEST );
        });
    }catch (err) {

        reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}


function getFeatureList(request,reply) {

    try {

        var rbac = new Rbac(dbDetails.rbac_database, dbDetails.username, dbDetails.password, dbDetails.host);

        rbac.connectedToDatabase(function(is_connected){

            rbac.getFeatures(function(success_data) {

                reply( Response.sendResponse(true,success_data.result,null,status_codes.OK)).code( status_codes.OK );
            } , function( error_data ) {

                reply( Response.sendResponse(false,null,error_data.message,status_codes.BAD_REQUEST)).code( status_codes.BAD_REQUEST );
            } )
        },function(error_data) {

            console.log(error_data);

            reply( Response.sendResponse(true,null,error_data.message,status_codes.BAD_REQUEST)).code( status_codes.BAD_REQUEST );
        });
    }catch (err) {

        reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);

    }
}

function deleteFeature( request , reply ) {


}

function createRoleFeatureMapping( request , reply ) {

    try {
        var rbac = new Rbac(dbDetails.rbac_database, dbDetails.username, dbDetails.password, dbDetails.host);

        rbac.connectedToDatabase(function (is_connected) {

            rbac.createRoleFeatureMapping(request.payload, function (success_data) {

                reply(Response.sendResponse(true, success_data.result, "Role feature mapping created", status_codes.OK)).code(status_codes.OK);
            }, function (error_data) {

                reply(Response.sendResponse(false, null, error_data.message, status_codes.BAD_REQUEST)).code(status_codes.BAD_REQUEST);
            })
        }, function (error_data) {

            console.log(error_data);

            reply(Response.sendResponse(true, null, error_data.message, status_codes.BAD_REQUEST)).code(status_codes.BAD_REQUEST);
        });
    }catch (err) {

        reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}

function getRoleFeatureMapping( request , reply ) {


    var rbac = new Rbac(dbDetails.rbac_database, dbDetails.username, dbDetails.password, dbDetails.host);

    rbac.connectedToDatabase(function(is_connected){

        rbac.getRoleFeatureMapping(function(success_data) {

            reply( Response.sendResponse(true,success_data.result,null,status_codes.OK)).code( status_codes.OK );
        } , function( error_data ) {

            reply( Response.sendResponse(false,null,error_data.message,status_codes.BAD_REQUEST)).code( status_codes.BAD_REQUEST );
        } )
    },function(error_data) {

        console.log(error_data);

        reply( Response.sendResponse(true,null,error_data.message,status_codes.BAD_REQUEST)).code( status_codes.BAD_REQUEST );
    });
}

function deleteRoleFeatureMapping( request , reply ) {

}

function getRoles( request , reply ) {

    try {

        var rbac = new Rbac(dbDetails.rbac_database, dbDetails.username, dbDetails.password, dbDetails.host);

        rbac.connectedToDatabase(function(is_connected){

            rbac.getRoles(function(success_data) {

                reply( Response.sendResponse(true,success_data.result,null,status_codes.OK)).code( status_codes.OK );
            } , function( error_data ) {

                reply( Response.sendResponse(false,null,error_data.message,status_codes.BAD_REQUEST)).code( status_codes.BAD_REQUEST );
            } )
        },function(error_data) {

            console.log(error_data);

            reply( Response.sendResponse(true,null,error_data.message,status_codes.BAD_REQUEST)).code( status_codes.BAD_REQUEST );
        });
    }catch (err) {

        reply( Response.sendResponse(false,StatusCodes.INTERNAL_SERVER_ERROR,null,err.message)).code(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

function getFeaturesByRole(request, reply){
    try {

        var rbac = new Rbac(dbDetails.rbac_database, dbDetails.username, dbDetails.password, dbDetails.host);

        rbac.connectedToDatabase(function(is_connected){

            rbac.getFeaturesByRole(request, function(success_data) {

                reply( success_data);
            } , function( error_data ) {

                reply( error_data);
            } )
        },function(error_data) {

            console.log(error_data);

            reply( error_data);
        });
    }catch (err) {

        reply( err.message);
    }
}


exports.createFeature = createFeature;
exports.deleteFeature = deleteFeature;
exports.getFeatureList = getFeatureList;
exports.createRoleFeatureMapping = createRoleFeatureMapping;
exports.getRoleFeatureMapping = getRoleFeatureMapping;
exports.deleteRoleFeatureMapping = deleteRoleFeatureMapping;
exports.getRoles = getRoles;
exports.getFeaturesByRole = getFeaturesByRole;

