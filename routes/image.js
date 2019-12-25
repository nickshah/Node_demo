"use strict";

var validations = require('../validations');
var ImageController = require('../Controllers/ImageController');
var ServerDetails = require('../config/server_details');



module.exports = function() {
    return [

        //Login
        {
            method: 'POST',
            path: ServerDetails.env+'/image/upload',
            config: {
                payload: {
                    output: 'stream',
                    parse: true,
                    allow: 'multipart/form-data',
                    maxBytes: 104857600
                },
                auth : "jwt",
                validate : validations.image_validations.image_upload,
                handler: ImageController.uploadImage
            }
        }
    ];
}();

