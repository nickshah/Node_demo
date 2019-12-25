'use strict';

var Response = require('../Classes/Util/Response');
var TagTv = require('../Classes/Db/TagTv');
var ImageUpload = require('../Classes/Util/UploadFile');

function insertIntoTagTv(request,reply) {

    try {

        var image_upload = new ImageUpload(request.payload.media);

        image_upload.uploadImage(function (success_data) {

            console.log(success_data.result.filename);

            request.payload.media_url = success_data.result.filename;

            console.log(request.payload);

            var tag_tv = new TagTv(request.payload);

            tag_tv.createRecord(function(success_data){

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


function getEntriesForVenue(request,reply) {

    try {

        var tag_tv = new TagTv(request.payload);

        tag_tv.getRecordsForVenue(function(success_data){

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

        var tag_tv = new TagTv(request.payload);

        tag_tv.deleteRecord(function(success_data){

            reply(success_data).code(success_data.status_code);
        },function(error_data){

            reply(error_data).code(error_data.status_code);
        })

    }catch (err) {

        reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}





exports.insertIntoTagTv = insertIntoTagTv;
exports.getEntriesForVenue = getEntriesForVenue;
exports.deleteEntry = deleteEntry;
