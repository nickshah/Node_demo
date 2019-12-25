'use strict';


class Response {

    static sendResponse(is_success,result,message) {

        var response = {};
        response.is_success = is_success;
        response.result = result;
        response.message = message;
        return response;
    }
}

module.exports = Response;
