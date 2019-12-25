'use strict';

var Response = require('../Classes/Util/Response');

var PendingFeedsView = require('../Classes/Db/Feeds/PendingFeedsView');
var PendingFeedsViewTrail = require('../Classes/Db/Feeds/PendingFeedsViewTrail');



var PublishedFeedsView = require('../Classes/Db/Feeds/PublishedFeedsView');
var HistoricalFeedsView = require('../Classes/Db/Feeds/HistoricalFeedsView');


var PendingFeeds = require('../Classes/Db/Feeds/PendingFeeds');
var PublishedFeeds = require('../Classes/Db/Feeds/PublishedFeeds');
var HistoricalFeeds = require('../Classes/Db/Feeds/HistoricalFeeds');

var VenueSocialMediaMapping = require('../Classes/Db/VenueSocialMediaMapping');

var async = require('async');
var https = require('https');

var CallApi = require('../Classes/Util/CallApi');


function getPendingFeeds(request,reply) {

    try {

        var pending_feeds = new PendingFeedsView(request.payload);

        pending_feeds.getPendingFeeds(function(success_data){

            reply(success_data).code(success_data.status_code);
        },function(error_data){

            reply(error_data).code(error_data.status_code);
        })
    }catch (err) {


        reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}


function getPendingFeedsTrail(request,reply) {

    try {

        var pending_feeds_trail = new PendingFeedsViewTrail(request.payload);

        pending_feeds_trail.getFeedTrails(function(success_data){

            reply(success_data).code(success_data.status_code);
        },function(error_data){

            reply(error_data).code(error_data.status_code);
        })
    }catch (err) {

        reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}


function getPublishedFeeds(request,reply) {

    try {

        var published_feeds = new PublishedFeedsView(request.payload);

        published_feeds.getPublishedFeeds(function(success_data){

            reply(success_data).code(success_data.status_code);
        },function(error_data){

            reply(error_data).code(error_data.status_code);
        })
    }catch (err) {

        reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}


function getHistoricalFeeds(request,reply) {

    try {

        var historical_feeds = new HistoricalFeedsView(request.payload);

        historical_feeds.getHistoricalFeeds(function(success_data){

            reply(success_data).code(success_data.status_code);
        },function(error_data){

            reply(error_data).code(error_data.status_code);
        })
    }catch (err) {

        reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}


function approveFeed( request , reply ) {

    try {

        async.waterfall([

            function( callback ) {

                //Get feed from pending or historical feeds for approval
                var feeds = null;
                if( request.payload.type == "PENDING"  ) {

                    feeds = new PendingFeeds(request.payload);
                } else {

                    feeds = new HistoricalFeeds(request.payload);
                }

                feeds.getFeedById(function(success_data){

                    callback( null,success_data.result )
                },function(error_data){

                    callback(error_data);
                })
            },
            function( arg1 , callback ) {

                //Insert the feed into published feed
                var feeds = null;
                if( request.payload.type == "PENDING"  ) {

                    arg1.feed_id = arg1.id;
                    delete arg1.id;
                } else {

                    if( arg1.id != undefined )
                        delete arg1.id;
                }

                var published_Feed = new PublishedFeeds(arg1);

                published_Feed.createRecord(function(success_data){

                    callback(null, arg1)
                },function(error_data){

                    callback(error_data);
                })
            },
            function( arg1 , callback ) {

                //Delete the feed from respective location
                var feeds = null;
                if( request.payload.type == "PENDING"  ) {

                    feeds = new PendingFeeds(request.payload);
                } else {

                    feeds = new HistoricalFeeds(request.payload);
                }

                feeds.deleteFeedById(function(success_data){

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


            reply( Response.sendResponse(true,null,custom_message.FEED_APPROVED,status_codes.OK) );
        });
    }catch (err) {


        reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}

function rejectFeed( request , reply ) {

    try {

        async.waterfall([

            function( callback ) {

                //Get feed info from respected table

                var feeds = null;
                if( request.payload.type == "PENDING"  ) {

                    feeds = new PendingFeeds(request.payload);
                } else {

                    feeds = new PublishedFeeds(request.payload);
                }

                feeds.getFeedById(function(success_data){

                    callback( null,success_data.result )
                },function(error_data){

                    callback(error_data);
                })
            },
            function( arg1 , callback ) {

                //Insert the feed into the historical feeds
                arg1.rejected_reason = request.payload.rejected_reason;
                arg1.status = "REJECTED";

                if( request.payload.type == "PENDING"  ) {

                    arg1.feed_id = arg1.id;
                    delete arg1.id;
                } else {

                    if( arg1.id != undefined )
                        delete arg1.id;
                }

                var historical_feed = new HistoricalFeeds(arg1);

                historical_feed.createRecord(function(success_data){

                    callback(null, arg1)
                },function(error_data){

                    callback(error_data);
                })
            },
            function( arg1 , callback ) {

                //Delete the feed from respective location
                var feeds = null;

                if( request.payload.type == "PENDING"  ) {

                    feeds = new PendingFeeds(request.payload);
                } else {

                    feeds = new PublishedFeeds(request.payload);
                }

                feeds.deleteFeedById(function(success_data){

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

            reply( Response.sendResponse(true,null,custom_message.FEED_REJECTED,status_codes.OK)).code(status_codes.OK);
        });
    }catch (err) {

        reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}


function getCelebrationFeeds( request , reply ) {


    try {

        var published_feeds = new PublishedFeedsView(request.payload);

        published_feeds.getCelebrationFeeds(function(success_data){

            reply(success_data).code(success_data.status_code);
        },function(error_data){

            reply(error_data).code(error_data.status_code);
        })
    }catch (err) {


        reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}


function getFameFeeds( request , reply ) {


    try {

        var published_feeds = new PublishedFeedsView(request.payload);

        published_feeds.getFameFeeds(function(success_data){

            reply(success_data).code(success_data.status_code);
        },function(error_data){

            reply(error_data).code(error_data.status_code);
        })
    }catch (err) {


        reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}

function getBookmarkedFeeds( request , reply ) {


    try {

        var published_feeds = new PublishedFeedsView(request.payload);

        published_feeds.getBookmarkedFeeds(function(success_data){

            reply(success_data).code(success_data.status_code);
        },function(error_data){

            reply(error_data).code(error_data.status_code);
        })
    }catch (err) {


        reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}


function makeFeedBookMarked( request , reply ) {


    try {

        var published_feeds = new PublishedFeeds(request.payload);

        published_feeds.makeFeedBookMarked(function(success_data){

            reply(success_data).code(success_data.status_code);
        },function(error_data){

            reply(error_data).code(error_data.status_code);
        })
    }catch (err) {


        reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}



function makeFeedCelebration( request , reply ) {


    try {

        var published_feeds = new PublishedFeeds(request.payload);

        published_feeds.makeFeedCelebration(function(success_data){

            reply(success_data).code(success_data.status_code);
        },function(error_data){

            reply(error_data).code(error_data.status_code);
        })
    }catch (err) {


        reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}



function movePublishedToHistorical( request , reply ) {

    try {

        async.waterfall([

            function( callback ) {

                var feeds = new PublishedFeeds({});

                feeds.getFeedsToMoveIntoHistorical(function(success_data){

                    callback( null,success_data.result )
                },function(error_data){

                    callback(error_data);
                })
            },
            function( arg1 , callback ) {


                async.each(arg1, function (item,done,callback) {

                    delete item.dataValues.id;
                    item.dataValues.status = "APPROVED";

                    var historical_feed = new HistoricalFeeds(item.dataValues);

                    historical_feed.createRecord(function(success_data){

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
            },
            function( arg1 , callback ) {



                async.each(arg1, function (item,done,callback) {

                    item.dataValues.id = item.dataValues.feed_id;
                    var feeds = new PublishedFeeds(item.dataValues);

                    feeds.deleteFeedById(function(success_data){

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


function searchFeed( request , reply ) {

    try {


        var type = request.payload.type;
        var feed_view = null;

        if( type == 'PENDING'  ) {


            feed_view = new PendingFeedsView(request.payload);
        } else if( type == 'HISTORICAL' ) {


            feed_view = new HistoricalFeedsView(request.payload);
        } else if( type == 'PUBLISHED' ) {

            feed_view = new PublishedFeedsView(request.payload);
        }


        feed_view.searchForFeeds(function(success_data){

            reply(success_data).code(success_data.status_code);
        },function(error_data){

            reply(error_data).code(error_data.status_code);
        })


    }catch (err) {

        reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}


function getPendingFeedCount(request,reply) {

    try {

        var pending_feeds = new PendingFeedsView(request.payload);

        pending_feeds.getPendingFeedCount(function(success_data){

            reply(success_data).code(success_data.status_code);
        },function(error_data){

            reply(error_data).code(error_data.status_code);
        })
    }catch (err) {


        reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}

function sendInstagramMessage(request,reply) {

    var options = {
        host: 'api.instagram.com/v1/media',
        method: 'POST',
        path: '/'+request.payload.media_id+'/comments/',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    console.log('sendInstagramMessage request=', JSON.stringify(request.payload));

    var data = {
        venue_id : request.payload.venue_id,
        social_media_id : 1
    };

    var vn = new VenueSocialMediaMapping(data);
    vn.getSocialMediaDetailsForVenue(function (success_data) {

            if(!success_data || !success_data.result || !success_data.result.auth_token){
                reply(Response.sendResponse(false,null,'Please check if you have Instagram account linked.',status_codes.NO)).code(status_codes.INSTAGRAM_NOT_LINKED);
            }
            var data = {
                access_token : success_data.result.auth_token,
                text : request.payload.text
            };

            var headers = {
                'Content-Type' : 'application/x-www-form-urlencoded'
            };

           var api_call = new CallApi( "POST" , 'https://api.instagram.com/v1/media/'+request.payload.media_id+'/comments', data, headers );
                console.log("AFTER DECKARATION");
            api_call.makeRequest(function( data ){

                console.log('api response success',data);
                reply(data);

                //success(Response.sendResponse(true,null,custom_message.FORGOT_PASSWORD_LINK_SENT,status_codes.OK));

            },function(error_data){
                console('api response failure',error_data);
                reply(error_data);

                //error(error_data);
            });
            
    }, function (error_data) {
            reply(error_data).code(error_data.status_code);
    });
    
}



exports.getPendingFeeds = getPendingFeeds;
exports.getPendingFeedsTrail = getPendingFeedsTrail;


exports.getPublishedFeeds = getPublishedFeeds;
exports.approveFeed = approveFeed;
exports.rejectFeed = rejectFeed;
exports.getHistoricalFeeds = getHistoricalFeeds;


exports.getCelebrationFeeds = getCelebrationFeeds;
exports.getFameFeeds = getFameFeeds;
exports.getBookmarkedFeeds = getBookmarkedFeeds;
exports.makeFeedBookMarked = makeFeedBookMarked;


exports.searchFeed = searchFeed;


exports.makeFeedCelebration = makeFeedCelebration;
exports.movePublishedToHistorical = movePublishedToHistorical;
exports.getPendingFeedCount = getPendingFeedCount;
exports.sendInstagramMessage = sendInstagramMessage;




