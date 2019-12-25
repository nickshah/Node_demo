'use strict';

var Response = require('../Classes/Util/Response');
var ImageUpload = require('../Classes/Util/UploadFile');


function uploadImage( request , reply ){

    try {

        var image_upload = new ImageUpload(request.payload.image);

        image_upload.uploadImage(function (success_data) {

            reply(success_data).code(success_data.status_code);
        },function(error_data){

            reply(error_data).code(error_data.status_code);
        });
    }catch (err) {

        reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}


exports.uploadImage = uploadImage;
