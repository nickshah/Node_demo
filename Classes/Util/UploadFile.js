"use strict";

const fs = require('fs');
var Response = require('./Response');
var AWS = require('aws-sdk');


class UploadFile {

    constructor( file_name ){

        this.temp_file = file_name;
        this.path = "/var/www/html/tagloy_new/images/";

        AWS.config.update({
            accessKeyId: config.s3_keys.access_key,
            secretAccessKey: config.s3_keys.secret_key,
            region: config.s3_keys.region,
            signatureVersion: 'v4'
        });

        AWS.config.update({region: 'us-east-1'});
    }


    uploadImage( success , error  ) {

        try {

            var d = new Date();
            var timestamp = d.getTime();

            if (this.temp_file) {

                var name = timestamp + "_" + this.temp_file.hapi.filename;

                var params = {
                    ACL: 'public-read',
                    Bucket: config.s3_keys.bucket_name,
                    Body : this.temp_file,
                    Key :  name
                };

                var s3bucket = new AWS.S3();

                s3bucket.upload(params, function(error, response) {

                    var data = {
                        //filename: response.Location
                        filename: config.util.cdn_path  + name
                    };

                    success(Response.sendResponse(true, data, null, status_codes.OK));
                });
            } else {

                error(Response.sendResponse(false, null, custom_message.IMAGE_NOT_PRESENT, status_codes.BAD_REQUEST));
            }

        }catch (err) {
            console.log("IMAGE UPLOAD ERROR 2 ++++++++++++++++++++++++++");
            error(Response.sendResponse(false, null, err.message, status_codes.INTERNAL_SERVER_ERROR));
        }
    }


    uploadGeneratedImage( success , error  ) {

        try {

            var d = new Date();
            var timestamp = d.getTime();

            if (this.temp_file) {

                var name = timestamp + "_" + this.temp_file.filename;

                var params = {
                    ACL: 'public-read',
                    Bucket: config.s3_keys.bucket_name,
                    Body : this.temp_file.data,
                    Key :  name
                };

                var s3bucket = new AWS.S3();

                s3bucket.upload(params, function(error, response) {

                    var data = {
                        //filename: response.Location
                        filename: config.util.cdn_path  + name
                    };

                    success(Response.sendResponse(true, data, null, status_codes.OK));
                });
            } else {

                error(Response.sendResponse(false, null, custom_message.IMAGE_NOT_PRESENT, status_codes.BAD_REQUEST));
            }

        }catch (err) {

            error(Response.sendResponse(false, null, err.message, status_codes.INTERNAL_SERVER_ERROR));
        }
    }



}

module.exports =  UploadFile;




/*

 uploadImage( success , error  ) {

 try {
 if (this.temp_file) {

 var name = this.temp_file.hapi.filename;
 var path = this.path + name;
 var file = fs.createWriteStream(path);

 console.log(name);

 //console.log("in file upload file", temp_file.hapi.filename);

 file.on('error', function (err) {
 console.log(err)
 });

 this.temp_file.pipe(file);

 this.temp_file.on('end', function (err) {

 var data = {
 filename: path
 };

 success(Response.sendResponse(true, data, null, status_codes.OK));

 })
 } else {

 error(Response.sendResponse(false, null, custom_message.IMAGE_NOT_PRESENT, status_codes.BAD_REQUEST));
 }

 }catch (err) {

 error(Response.sendResponse(false, null, err.message, status_codes.INTERNAL_SERVER_ERROR));
 }


 }
 */
