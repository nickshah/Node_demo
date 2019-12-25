'use strict';

var Response = require('../Classes/Util/Response');
var StatusCodes = require('../Classes/Util/StatusCodes');
var Venue = require('../Classes/Db/Venue');

function userTwitterFilter(data,success,error) {

    try {

        if ( data == null ) {

            return error(Response.sendResponse(false, null, custom_message.TWITTER_DATA_IS_NULL));
        }

        var user_details = {};
        user_details.twitter_id = data.id;
        user_details.first_name = data.name;
        user_details.handle = data.screen_name;
        user_details.twt_follower = data.followers_count;
        user_details.image_url = data.profile_image_url;
        return success(Response.sendResponse(true,user_details,null,status_codes.OK));
    }catch (err) {

        return error(Response.sendResponse(false,null,err.message));
    }
}


function userIgFilter(data,success,error) {

    try {

        if ( data == null ) {

            return error(Response.sendResponse(false, null, custom_message.TWITTER_DATA_IS_NULL));
        }

        var user_details = {};
        user_details.instagram_id = data.instagram_id;
        user_details.first_name = data.full_name;
        user_details.handle = data.handle;
        user_details.ig_follower = data.ig_follower;
        user_details.image_url = data.image_url;
        user_details.social_media_id=1;
        return success(Response.sendResponse(true,user_details,null,status_codes.OK));
    }catch (err) {

        return error(Response.sendResponse(false,null,err.message));
    }
}

exports.userTwitterFilter = userTwitterFilter;
exports.userIgFilter = userIgFilter;
