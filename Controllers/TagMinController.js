'use strict';

var Response = require('../Classes/Util/Response');
var TagMin = require('../Classes/Db/TagMin');
var ImageUpload = require('../Classes/Util/UploadFile');

function insertIntoTagMin(request,reply) {

    try {

        var image_upload = new ImageUpload(request.payload.media);

        image_upload.uploadImage(function (success_data) {

            console.log(success_data.result.filename);

            request.payload.media_url = success_data.result.filename;


            var tag_min = new TagMin(request.payload);

            tag_min.createRecord(function(success_data){

                reply(success_data).code(success_data.status_code);
            },function(error_data){

                reply(error_data).code(error_data.status_code);
            })
        }, function (error_data) {

            reply(error_data).code(error_data.status_code);
        });
    }catch (err) {

        reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}


function getEntriesForTagMin(request,reply) {

    try {

        var tag_min = new TagMin(request.payload);

        tag_min.getRecordsForVenue(function(success_data){

            reply(success_data).code(success_data.status_code);
        },function(error_data){

            reply(error_data).code(error_data.status_code);
        })

    }catch (err) {

        reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}



function deleteEntry(request,reply) {

    try {

        var tag_min = new TagMin(request.payload);

        tag_min.deleteRecord(function(success_data){

            reply(success_data).code(success_data.status_code);
        },function(error_data){

            reply(error_data).code(error_data.status_code);
        })

    }catch (err) {

        reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}





exports.insertIntoTagMin = insertIntoTagMin;
exports.getEntriesForTagMin = getEntriesForTagMin;
exports.deleteEntry = deleteEntry;
