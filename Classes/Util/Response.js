'use strict';


class Response {


    static sendResponse(is_success,result,message,status_codes) {

        var response = {};
        response.is_success = is_success;
        response.result = result;
        response.status_code = status_codes;
        response.message = message;
        return response;
    }



    static sendReplyWithResponse(is_success,status_code,result,message,reply) {

        var response = {};
        response.is_success = is_success;
        response.result = result;
        response.message = message;
        reply(response).code(status_code);
    }



}

module.exports = Response;
