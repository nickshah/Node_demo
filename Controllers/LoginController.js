'use strict';

var Response = require('../Classes/Util/Response');
var StatusCodes = require('../Classes/Util/StatusCodes');
var Login = require('../Classes/Login');

console.log(Login);

function login(request,reply) {

    try {

        var login = new Login(request.payload);

        var hostname = (request.payload.host_name != undefined) ? request.payload.host_name : null;

        login.makeLogin(hostname, function(success_data){

            //console.log("Login Success Data: ", success_data);

            reply(success_data).code(success_data.status_code);
        },function(error_data){

            reply(error_data).code(error_data.status_code);
        });
    }catch (err) {

        console.log("Login failure Data: ", err);
        reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}


function updatePassword( request , reply  ) {

    try {

        var login = new Login(request.payload);

        login.updatePassword(function(success_data){

            reply(success_data).code(success_data.status_code);
        },function(error_data){

            reply(error_data).code(error_data.status_code);
        });
    }catch (err) {

        reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}


function forgotPassword( request , reply  ) {

    try {

        var login = new Login(request.payload);

        login.forgotPassword(function(success_data){

            reply(success_data).code(success_data.status_code);
        },function(error_data){

            reply(error_data).code(error_data.status_code);
        });
    }catch (err) {

        reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}


function verifyEmail( request , reply  ) {

    try {

        var login = new Login(request.payload);
        login.verifyEmail(function(success_data){

            reply(success_data).code(success_data.status_code);
        },function(error_data){

            reply(error_data).code(error_data.status_code);
        });
    }catch (err) {

        reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}




exports.login = login;
exports.updatePassword = updatePassword;
exports.forgotPassword = forgotPassword;
exports.verifyEmail = verifyEmail;
