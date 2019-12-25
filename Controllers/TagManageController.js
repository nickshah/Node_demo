'use strict';

var Response = require('../Classes/Util/Response');
var TagMedia = require('../Classes/Db/TagMedia');
var ImageUpload = require('../Classes/Util/UploadFile');

function insertIntoTagManage(request,reply) {

    try {

        var image_upload = new ImageUpload(request.payload.media);

        image_upload.uploadImage(function (success_data) {

            console.log(success_data.result.filename);

            request.payload.media_url = success_data.result.filename;


            var tag_media = new TagMedia(request.payload);

            tag_media.createRecord(function(success_data){

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


function getEntriesForTagManage(request,reply) {

    try {

        var tag_media = new TagMedia(request.payload);

        tag_media.getRecordsForVenue(function(success_data){

            reply(success_data).code(success_data.status_code);
        },function(error_data){

            reply(error_data).code(error_data.status_code);
        })

    }catch (err) {

        reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}

function getLiveEntriesForTagManage(request,reply) {
    
        try {
    
            var tag_media = new TagMedia(request.payload);
    
            tag_media.getLiveRecordsForVenue(function(success_data){
    
                reply(success_data).code(success_data.status_code);
            },function(error_data){
    
                reply(error_data).code(error_data.status_code);
            })
    
        }catch (err) {
    
            reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
        }
}

function getLiveAdEntriesForTagManage(request,reply) {
    
    try {

        var tag_media = new TagMedia(request.payload);

        tag_media.getLiveAdRecordsForVenue(function(success_data){

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

        var tag_media = new TagMedia(request.payload);

        tag_media.deleteRecord(function(success_data){

            reply(success_data).code(success_data.status_code);
        },function(error_data){

            reply(error_data).code(error_data.status_code);
        })

    }catch (err) {

        reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}


function updateEntry(request,reply) {
    
        try {
    
            if(request.payload.media){

            
            var image_upload = new ImageUpload(request.payload.media);
            
                    image_upload.uploadImage(function (success_data) {
            
                        console.log(success_data.result.filename);
            
                        request.payload.media_url = success_data.result.filename;
            
            
                        var tag_media = new TagMedia(request.payload);
            
                        tag_media.updateRecord(function(success_data){
            
                            reply(success_data).code(success_data.status_code);
                        },function(error_data){
            
                            reply(error_data).code(error_data.status_code);
                        })
                    }, function (error_data) {
            
                        reply(error_data).code(error_data.status_code);
                    });
                }else{

            var tag_media = new TagMedia(request.payload);
    
            tag_media.updateRecord(function(success_data){
    
                reply(success_data).code(success_data.status_code);
            },function(error_data){
    
                reply(error_data).code(error_data.status_code);
            })
        }
    
        }catch (err) {
    
            reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
        }
    }




exports.insertIntoTagManage = insertIntoTagManage;
exports.getEntriesForTagManage = getEntriesForTagManage;
exports.getLiveEntriesForTagManage = getLiveEntriesForTagManage;
exports.getLiveAdEntriesForTagManage = getLiveAdEntriesForTagManage;
exports.deleteEntry = deleteEntry;
exports.updateEntry = updateEntry;

