'use strict';

var Response = require('../Classes/Util/Response');
var StatusCodes = require('../Classes/Util/StatusCodes');
var ImageUpload = require('../Classes/Util/UploadFile');


var PendingSpotlightView = require('../Classes/Db/Spotlights/PendingSpotlightView');
var PublishedSpotlightView = require('../Classes/Db/Spotlights/PublishedSpotlightView');
var HistoricalSpotlightView = require('../Classes/Db/Spotlights/HistoricalSpotlightView');

var PendingSpotlights = require('../Classes/Db/Spotlights/PendingSpotlights');
var PublishedSpotlights = require('../Classes/Db/Spotlights/PublishedSpotlights');
var HistoricalSpotlights = require('../Classes/Db/Spotlights/HistoricalSpotlights');


var SpotlightRequest = require('../Classes/Db/Spotlights/SpotlightRequest');

var SpotlightImage = require('../Classes/Db/Spotlights/SpotlightImages');
var UploadToTwitter = require('../Classes/UploadToTwitter');

var async = require('async');


// Step 1 : Create a spotlight
// Step 2 : Upload image and create entry into spotlight image
// Step 3 : return the response with pending queue data for spotlight for that creator

function createSpotLight( request , reply ) {

    try {

        if( typeof request.payload.image[0] == "undefined" ) {

            var array = [];
            array.push(request.payload.image);
            request.payload.image = array;
        }

        var pending_spotlight = new PendingSpotlights(request.payload);

        pending_spotlight.createRecord(function( success_data ) {

            var spotlight_data = success_data.result;

            for ( var i = 0 ; i < request.payload.image.length ; i++ ) {

                var image_upload = new ImageUpload(request.payload.image[i]);

                image_upload.uploadImage(function (success_data) {

                    console.log(success_data.result.filename);

                    var spotlight_image = {

                        spotlight_id : spotlight_data.id,
                        image : success_data.result.filename,
                        type : "IMAGE"
                    };

                    var image = new SpotlightImage(spotlight_image);

                    image.createRecord(function(success_data){

                    },function(error_data){

                    })
                }, function (error_data) {

                    console.log(error_data);
                });
            }

            reply( Response.sendResponse(true,null,custom_message.SPOTLIGHT_CREATED,status_codes.CREATED) )

        },function(error_data) {

            //console.log(error_data);

            reply(error_data).code(error_data.status_code);
        });
    }catch (err) {

        reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}

function approveSpotlight (  request , reply ) {

    try {

        async.waterfall([

            function( callback ) {

                var pending_spotlight = new PendingSpotlights(request.payload);

                pending_spotlight.getSpotlightById(function(success_data){

                    console.log(success_data.result);

                    callback( null,success_data.result )
                },function(error_data){

                    console.log(error_data);

                    callback(error_data);
                })
            },
            function( arg1 , callback ) {



                arg1.spotlight_id = arg1.id;
                delete arg1.id;

                console.log(arg1);

                var published_spotlight = new PublishedSpotlights(arg1);

                published_spotlight.createRecord(function(success_data){

                    callback(null, arg1)
                },function(error_data){

                    callback(error_data);
                })
            },
            function( arg1 , callback ) {

                console.log("In pending");

                var pending_spotlight = new PendingSpotlights(request.payload);

                pending_spotlight.deleteSpotLightById(function(success_data){

                    callback( null,success_data.result )
                },function(error_data){

                    callback(error_data);
                })
            }
        ],function(err,results) {

            if( err ) {

                reply( err).code( err.status_code )  ;
                return 0;
            }

            reply( Response.sendResponse(true,null,custom_message.SPOTLIGHT_APPROVED,status_codes.OK) );
        });
    }catch (err) {


        reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}



function rejectSpotlight (  request , reply ) {

    try {

        async.waterfall([

            function( callback ) {

                console.log(request.payload);


                var spotlights = null;
                if( request.payload.type == "PENDING"  ) {

                    spotlights = new PendingSpotlights(request.payload);
                } else {

                    spotlights = new PublishedSpotlights(request.payload);
                }

                spotlights.getSpotlightById(function(success_data){

                    console.log("Spotlight Data" , success_data.result);

                    callback( null,success_data.result )
                },function(error_data){

                    console.log(error_data);

                    callback(error_data);
                })
            },
            function( arg1 , callback ) {



                arg1.rejected_reason = request.payload.rejected_reason;
                arg1.status = "REJECTED";

                if( request.payload.type == "PENDING"  ) {

                    arg1.spotlight_id = arg1.id;
                    delete arg1.id;
                } else {

                    if( arg1.id != undefined )
                        delete arg1.id;
                }


                console.log(arg1);

                var historical_spotlight = new HistoricalSpotlights(arg1);

                historical_spotlight.createRecord(function(success_data){

                    callback(null, arg1)
                },function(error_data){

                    callback(error_data);
                })
            },
            function( arg1 , callback ) {

                console.log("In pending");

                var spotlights = null;

                if( request.payload.type == "PENDING"  ) {

                    spotlights = new PendingSpotlights(request.payload);
                } else {

                    spotlights = new PublishedSpotlights(request.payload);
                }

                //var pending_spotlight = new PendingSpotlights(request.payload);

                spotlights.deleteSpotLightById(function(success_data){

                    callback( null,success_data.result )
                },function(error_data){

                    callback(error_data);
                })
            }
        ],function(err,results) {

            if( err ) {

                reply( err).code( err.status_code )  ;
                return 0;
            }

            reply( Response.sendResponse(true,null,custom_message.SPOTLIGHT_REJECTED,status_codes.OK) );
        });
    }catch (err) {


        reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}


function getPendingSpotlights(request,reply) {

    try {

        var pending_spotlights = new PendingSpotlightView(request.payload);

        pending_spotlights.getPendingSpotLights(function(success_data){

            reply(success_data).code(success_data.status_code);
        },function(error_data){

            reply(error_data).code(error_data.status_code);
        })
    }catch (err) {


        reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}

function getPublishedSpotlights(request,reply) {

    try {

        var published_spotlight = new PublishedSpotlightView(request.payload);

        published_spotlight.getPublishedSpotlights(function(success_data){

            reply(success_data).code(success_data.status_code);
        },function(error_data){

            reply(error_data).code(error_data.status_code);
        })
    }catch (err) {


        reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}

function getHistoricalSpotlights(request,reply) {

    try {

        var historical_spotlights = new HistoricalSpotlightView(request.payload);

        historical_spotlights.getHistoricalSpotlights(function(success_data){

            reply(success_data).code(success_data.status_code);
        },function(error_data){

            reply(error_data).code(error_data.status_code);
        })
    }catch (err) {

        reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}

function requestSpotlight( request , reply ) {

    try {

        var spotlight_request = new SpotlightRequest(request.payload);

        spotlight_request.createRecord(function(success_data){

            reply(success_data).code(success_data.status_code);
        },function(error_data){

            reply(error_data).code(error_data.status_code);
        })
    } catch (err) {

        reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}


function getRequestedSpotlights( request , reply ) {

    try {

        var spotlight_request = new SpotlightRequest(request.payload);

        spotlight_request.getRecordsForCreator(function(success_data){

            reply(success_data).code(success_data.status_code);
        },function(error_data){

            reply(error_data).code(error_data.status_code);
        })
    } catch (err) {

        reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}



//Creator apis

function getQueuedSpotlightsForCreator( request , reply   ) {

    try {

        var pending_spotlights = new PendingSpotlightView(request.payload);

        pending_spotlights.getPendingSpotlightsForCreator(function(success_data){

            reply(success_data).code(success_data.status_code);
        },function(error_data){

            reply(error_data).code(error_data.status_code);
        })
    } catch (err) {

        reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}


function getScheduledSpotlightsForCreator( request , reply  ) {

    try {

        var published_spotlights = new PublishedSpotlightView(request.payload);

        published_spotlights.getPublishedSpotlightsForCreator(function(success_data){

            reply(success_data).code(success_data.status_code);
        },function(error_data){

            reply(error_data).code(error_data.status_code);
        })
    } catch (err) {

        reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}


function getRejectedSpotlightForCreator( request , reply   ) {

    try {

        var historical_spotlights = new HistoricalSpotlightView(request.payload);

        historical_spotlights.getHistoricalSpotlightsForCreator(function(success_data){

            reply(success_data).code(success_data.status_code);
        },function(error_data){

            reply(error_data).code(error_data.status_code);
        })
    } catch (err) {

        reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}


/**
 * Muliple uploads to twitter
 * @param request
 * @param reply
 */
function uploadSpotlightsToTwitter( request , reply ) {

    try {

        var published_spotlight = new PublishedSpotlights({});

        published_spotlight.getSpotlightsForUpload(function (success_data) {

            for( let i = 0 ; i < success_data.result.length ; i++ ) {

                var upload_to_twitter = new UploadToTwitter(success_data.result[i].dataValues);
                upload_to_twitter.uploadToTwitter()
            }

            reply(Response.sendResponse(true,null,null,status_codes.OK)).code(status_codes.OK);
        },function (error_data){

            reply(error_data).code(error_data.status_code);
        });
    }catch (err) {

        reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}




function movePublishedToHistorical( request , reply ) {

    try {

        async.waterfall([

            function( callback ) {

                var spotlights = new PublishedSpotlights({});

                spotlights.getSpotlightsToMoveIntoHistorical(function(success_data){

                    callback( null,success_data.result )
                },function(error_data){

                    callback(error_data);
                })
            },
            function( arg1 , callback ) {


                async.each(arg1, function (item,done,callback) {

                    delete item.dataValues.id;
                    item.dataValues.status = "APPROVED";

                    var historical_spotlight = new HistoricalSpotlights(item.dataValues);

                    historical_spotlight.createRecord(function(success_data){

                        done();
                    },function(error_data){

                        console.log(error_data);
                    })

                }, function (err) {


                    if (err) {

                        callback(err);
                    }

                    callback(null,arg1);
                });
            },
            function( arg1 , callback ) {



                async.each(arg1, function (item,done,callback) {

                    item.dataValues.id = item.dataValues.feed_id;
                    var spotlights = new PublishedSpotlights(item.dataValues);

                    spotlights.deleteFeedById(function(success_data){

                        done();
                    },function(error_data){

                        console.log(error_data);
                    })
                }, function (err) {


                    if (err) {

                        callback(err);
                    }

                    console.log("jerere");

                    callback(null,arg1);
                });
            }
        ],function(err,results) {

            if( err ) {

                reply( err).code( err.status_code )  ;
                return 0;
            }

            reply( "Success"   );
        });
    }catch (err) {

        reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}


exports.createSpotLight = createSpotLight;
exports.approveSpotlight = approveSpotlight;
exports.rejectSpotlight = rejectSpotlight;

exports.getPendingSpotlights = getPendingSpotlights;
exports.getPublishedSpotlights = getPublishedSpotlights;
exports.getHistoricalSpotlights = getHistoricalSpotlights;

exports.requestSpotlight = requestSpotlight;
exports.getRequestedSpotlights = getRequestedSpotlights;



exports.getQueuedSpotlightsForCreator = getQueuedSpotlightsForCreator;
exports.getScheduledSpotlightsForCreator = getScheduledSpotlightsForCreator;
exports.getRejectedSpotlightForCreator = getRejectedSpotlightForCreator;


exports.movePublishedToHistorical = movePublishedToHistorical;


exports.uploadSpotlightsToTwitter = uploadSpotlightsToTwitter;






//var data = {
//    image_url : "/var/www/html/tagloy_new/images/1.png",
//    msg : "Hello all never give up on your dreams",
//    access_token_key : "2765384522-m1g7P43s5BWNoTDKagOl4guj5GSNwbSwYosRZAr",
//    access_token_secret : "jM1dTZrkg6vp1WuVJ5B0WWw0ONu9wwJ6rETlJWacQ9QNW",
//    consumer_key : "yRkfcUYrkBlAkDSRbaMezqMQc",
//    consumer_secret : "eLiXejvy045Rt7zCXbDrcthbh3YyTNtMpvdTPC5oHKXJBqS3qx"
//};
//var upload = new UploadToTwitter();
//console.log(success_data.result[0].dataValues);
