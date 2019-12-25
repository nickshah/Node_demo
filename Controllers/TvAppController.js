'use strict';

var Response = require('../Classes/Util/Response');
var JwtTokenGenerator = require('../Classes/Util/JwtTokenGenerator');

var Venue = require('../Classes/Db/Venue');
var TagTv = require('../Classes/Db/TagTv');
var TagMin = require('../Classes/Db/TagMin');
var VenueStarsView = require('../Classes/Db/VenueStarsView');
var VenuePerks = require('../Classes/Db/Perks/VenuePerks');

var PublishedFeedsView = require('../Classes/Db/Feeds/PublishedFeedsView');
var util = require('../config/util');


function login( request , reply  ) {

    try {

        if( request.payload.email == 'dummyuser@tagloy.com' && request.payload.password == "password"  ) {

            var data = {};
            data.token = JwtTokenGenerator.createToken(1,"CUSTOMER","TVUSER");
            data.venue_id = 190;

            reply(Response.sendResponse(false,data,null,status_codes.OK)).code(status_codes.OK);
        } else {

            reply(Response.sendResponse(false,null,custom_message.INCORRECT_CREDENTIALS,status_codes.UNAUTHORIZED)).code(status_codes.UNAUTHORIZED);
        }
    }catch (err) {

        reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}

function getMetaDataForVenue(  request , reply  ) {

    try {

        var vp = {
            venue_id : request.payload.venue_id
        }
        var venue_perks = new VenuePerks(vp);

        venue_perks.isStarPerkEnabled(function(success){
            console.log(success);

            var venue = new Venue(request.payload);
            var d = new Date();

            var isStarEnabled = 1;
            if(success != 2){ 
                isStarEnabled = 0;
            }
            var today = new Date();
            today.setDate(today.getDate() + 1);
            
    
            venue.getVenueDetails( function(success_data){
    
                var isVenuePaused = 0;
                if(today > new Date(success_data.result.subscription_expiry_date)){
                    isVenuePaused = 1;
                }else{
                    isVenuePaused = 0;
                }

                var data = {
                    venue_tag : '#'+success_data.result.hash_tag,
                    venue_icon : success_data.result.logo,
                    tagloy_tag : config.util.tagloy_handle, 
                    tagloy_icon : config.util.tagloy_image,
                    timestamp : d.getTime,
                    subscription_expiry_date : success_data.result.subscription_expiry_date,
                    is_blackboard : success_data.result.is_blackboard,                    
                    isStarEnabled : isStarEnabled,
                    isVenueSuspended : isVenuePaused
                };
    
                return reply(Response.sendResponse(true,data,custom_message.SUCCESS,status_codes.OK)).code(status_codes.OK);
            } ,function(error_data) {
    
    
                reply(error_data).code(error_data.status_code);
            });

        }, function(err){
            console.log(err);
        });

    }catch (err) {

        return reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}

function getBannersForVenue( request , reply  ) {


    try {


        var response_data = {};
        var tag_tv = new TagTv(request.payload);

        tag_tv.getRecordsForVenue(function(tag_tv_data){

            response_data['tag_tv'] = tag_tv_data.result;

            var tag_min = new TagMin(request.payload);

            tag_min.getRecordsForVenue(function (tag_min_data) {

                //var return_data = tag_tv_data.result.concat(tag_min_data.result);
                response_data['tag_min'] = tag_min_data.result;
                return reply(Response.sendResponse(true,response_data,custom_message.SUCCESS,status_codes.OK)).code(status_codes.OK);
            },function(error_data){

            });


            //console.log(success_data);

        },function(error_data){

        });


        //var result = {
        //    "is_success": true,
        //    "result": [{
        //        "id": 1243,
        //        "media_url": "https://tagloyimages.s3.ap-south-1.amazonaws.com/b47065ce4f6177bc3ea8897b2728f4cd.jpg",
        //        "type": "IMAGE",
        //        "from_tagmin": 1,
        //        "timestamp" : 1490598367
        //    }, {
        //        "id": 1243,
        //        "media_url": "https://tagloyimages.s3.ap-south-1.amazonaws.com/PFYIwnA.png",
        //        "type": "VIDEO",
        //        "from_tagmin": 0,
        //        "timestamp" : 1490598367
        //    }],
        //    "status_code": 200,
        //    "message": "Success"
        //};
        //
        //return reply( result).code(status_codes.OK);
    }catch (err) {

        return reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}

function getBlackBoardForVenue( request , reply  ) {


    try {

        var venue = new Venue(request.payload);

        venue.getBlackBoard(function(success_data){

            reply(success_data).code(success_data.status_code);
        },function(error_data){

            reply(error_data).code(error_data.status_code);
        });
    }catch (err) {

        return reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}



function feedsForVenue(  request , reply  ) {

    try {

        var published_feeds = new PublishedFeedsView(request.payload);

        published_feeds.getPublishedFeeds(function(success_data){

            reply(success_data).code(success_data.status_code);
        },function(error_data){

            reply(error_data).code(error_data.status_code);
        });
    }catch (err) {

        return reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}

function fameUsersForVenue(  request , reply  ) {

    try {

        var venue_stars = new VenueStarsView(request.payload);

        venue_stars.getVenueStars(function(success_data){

            reply(success_data).code(success_data.status_code);
        },function(error_data){

            reply(error_data).code(error_data.status_code);
        });
    }catch (err) {

        return reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}


function getScreenContent(  request , reply  ) {

    try {

        var request_data = request.payload;

        var screen_content = util.tv_content_api_response;

        var response;
        var response_content;

        for (var i = 0; i < screen_content.length; i++)
        {
            if(screen_content[i].screenType == request_data.screen_type.toUpperCase())
            {
                response_content = screen_content[i];
                break;
            }
        }

        response = {
            is_success : true,
            message : "SUCCESS",
            result : response_content,
            status_code : 200,
        };

        reply(response).code(200);
    }catch (err) {

        return reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}



exports.login = login;
exports.getMetaDataForVenue = getMetaDataForVenue;
exports.getBannersForVenue = getBannersForVenue;
exports.getBlackBoardForVenue = getBlackBoardForVenue;
exports.getFeedsForVenue = feedsForVenue;
exports.fameUsersForVenue = fameUsersForVenue;
exports.getScreenContent = getScreenContent;