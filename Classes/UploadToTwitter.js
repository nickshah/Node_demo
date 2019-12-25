"use strict";

var Twitter = require('twitter');
var async = require('async');

var VenueSocialMediaMapping = require('./Db/VenueSocialMediaMapping');
var SpotlightImages = require('./Db/Spotlights/SpotlightImages');


/**
 * Step to upload spotlight to twitter
 * Convert the image array into the media string
 * upload the status with description and images
 */

class UploadToTwitter {

    constructor( spotlight_data ) {

        this.twitter_client = null;
        this.spotlight_data = spotlight_data;
    };

    uploadToTwitter () {

        var instance = this;
        var media_id_string = "";

        async.waterfall([

            //Get the venue social media details
            function(callback) {

                var data = {
                    'venue_id' : instance.spotlight_data.venue_id,
                    'social_media_id' : 1
                };

                var venue_social_media_mapping = new VenueSocialMediaMapping(data);
                venue_social_media_mapping.getSocialMediaDetailsForVenue(function(success_data){

                    callback(null,success_data);
                },function(error_data){

                    callback(error_data);
                })
            },

            // Create twitter client for venue
            function(arg1, callback) {

                var twitter_data = config.social_media_details.twitter;
                twitter_data.consumer_key = arg1.result.consumer_key;
                twitter_data.consumer_secret = arg1.result.secret_key;
                instance.twitter_client = new Twitter(twitter_data);
                callback(null,arg1);
            },

            //Get images for spotlight
            function( arg1 , callback ) {

                var spotlight_data = {
                    'spotlight_id' : instance.spotlight_data.spotlight_id
                };

                var spotlight_images = new SpotlightImages(spotlight_data);

                spotlight_images.getImagesForSpotlight(function(success_data){

                    callback(null,success_data.result);
                },function(error_data){

                    callback(error_data);
                })
            },

            //Upload images to twitter
            function( arg1, callback ) {

                async.each(arg1, function (item,done,callback) {


                    var my_data = require('fs').readFileSync(item.dataValues.image);

                    console.log("herere");

                    var status = {};

                    instance.twitter_client.post('media/upload', {media: my_data}, function(error, media, response) {

                        if (!error) {

                            media_id_string += media.media_id_string + ",";
                            done();
                        }
                    });
                }, function (err) {

                    if (err) {

                        callback(err.message);
                    }

                    var status = {
                        status: instance.spotlight_data.description,
                        media_ids : media_id_string
                    };


                    instance.twitter_client.post('statuses/update', status, function (error, tweet, response) {
                        if (!error) {
                            console.log(tweet);
                        }
                    });
                });
            }
        ], function (err, result) {
            // result now equals 'done'
        });
    }

}

module.exports = UploadToTwitter;

//
//
//var my_data = require('fs').readFileSync(this.image);
//
//console.log("herere");
//
////841526813922861057
////841527430611374080
//
////var instance = this;
////var status = {};
////
////this.twitter_client.post('media/upload', {media: my_data}, function(error, media, response) {
////
////    if (!error) {
////
////        // If successful, a media object will be returned.
////        console.log(media);
////
////        // Lets tweet it
////        status = {
////            status: "checking",
////            media_ids: media.media_id_string // Pass the media id string
////        };
////
////        //console.log(media.media_id_string);
////        //
////        //instance.twitter_client.post('statuses/update', status, function(error, tweet, response) {
////        //    if (!error) {
////        //        console.log(tweet);
////        //    }
////        //});
////        //
////    }
////});
//
////console.log("out");
//
////
//var status = {
//    status: "Hello",
//    media_ids : "841527430611374080,841526813922861057"
//    //media_ids: [841526813922861057, 841527430611374080]
//};
//
////console.log(status);
////
//this.twitter_client.post('statuses/update', status, function (error, tweet, response) {
//    if (!error) {
//        console.log(tweet);
//    }
//});
//
////console.log("herere");
////
////
////try {
////    var status = {
////        status: "muliple image upload",
////        media_ids : 841526813922861057
////        //media_ids: [841526813922861057, 841527430611374080]
////    };
////
////    console.log(status);
////
////    this.twitter_client.post('statuses/update', status, function (error, tweet, response) {
////        if (!error) {
////            console.log(tweet);
////        }
////    });
////}catch (err) {
////
////    console.log(err.message);
////}
