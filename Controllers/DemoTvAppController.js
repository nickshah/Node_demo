'use strict';

var Response = require('../Classes/Util/Response');
var JwtTokenGenerator = require('../Classes/Util/JwtTokenGenerator');




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

        var result = {
            "is_success": true,
            "result": {
                "venue_tag" : "#FUNKYKONA",
                "tagloy_tag" : "#TAGLOY",
                "venue_icon" : "http://cdn.massblurb.com/brands/585/logo/1490002670.png",
                "tagloy_icon" : "http://tagloy.com/images/tagloyLogo.png",
                "timestamp" : 1490598367
            },
            "status_code": 200,
            "message": "Success"
        };

        return reply( result).code(status_codes.OK);
    }catch (err) {

        return reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}

function getBannersForVenue( request , reply  ) {


    try {

        var result = {
            "is_success": true,
            "result": [{
                "id": 1243,
                "media_url": "https://tagloyimages.s3.ap-south-1.amazonaws.com/b47065ce4f6177bc3ea8897b2728f4cd.jpg",
                "type": "IMAGE",
                "from_tagmin": 1,
                "timestamp" : 1490598367
            }, {
                "id": 1243,
                "media_url": "https://tagloyimages.s3.ap-south-1.amazonaws.com/PFYIwnA.png",
                "type": "VIDEO",
                "from_tagmin": 0,
                "timestamp" : 1490598367
            }],
            "status_code": 200,
            "message": "Success"
        };

        return reply( result).code(status_codes.OK);
    }catch (err) {

        return reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}

function getBlackBoardForVenue( request , reply  ) {


    try {

        var result = {
            "is_success": true,
            "result": {
                    "color": "#FF0000",
                    "heading": "Chirtsmas party nights",
                    "content": "Coffee & Cake, Vodka and rum, Corona and Miller",
                    "footer": "FunkkyKona"
                },
            "status_code": 200,
            "message": "Success"
        };

        return reply( result).code(status_codes.OK);
    }catch (err) {

        return reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}



function feedsForVenue(  request , reply  ) {

    try {





        var result = {
            "is_success": true,
            "result": [{
                "feed_id": 5,
                "feed_msg": "#TAGLOY #FUNKYKONA  One of the best, most energetic concerts ever: @mothermother’s No Culture Tour @theMassey Hall last night!! #concerts #MotherMother",
                "feed_image": "https://pbs.twimg.com/media/C7tsLViXkAACdkT.jpg:large",
                "cust_name": "Kajal Agarwal",
                "cust_image": "https://pbs.twimg.com/profile_images/817027637466005505/IwRu9byQ.jpg",
                "handle" : "@MsKajalAggarwal",
                "feed_count": 120,
                "source" : 1,
                "published_feed_count": 5,
                "twt_follower": 6,
                "facebook_follower": 3,
                "ig_follower": 1,
                "is_celebration": 1,
                "bookmark_feed": 0,
                "feed_from_fame_user": 0,
                "feed_from_favourite_user": 0,
                "feed_recieved_at": 1489233221143,
                "venue_id": 176,
                timestamp : 1490598367
            },{
                "feed_id": 14,
                "feed_msg": "#TAGLOY #FUNKYKONA  One of the best, most energetic concerts ever: @mothermother’s No Culture Tour @theMassey Hall last night!! #concerts #MotherMother",
                "feed_image": "https://pbs.twimg.com/media/C7tsLViXkAACdkT.jpg:large",
                "cust_name": "Tamannaah Bhatia",
                "cust_image": "https://pbs.twimg.com/profile_images/832897221620281344/Ef0XzER-.jpg",
                "handle" : "@tamannaahspeaks",
                "feed_count": 120,
                "source" : 1,
                "published_feed_count": 5,
                "twt_follower": 6,
                "facebook_follower": 3,
                "ig_follower": 1,
                "is_celebration": 1,
                "bookmark_feed": 0,
                "feed_from_fame_user": 0,
                "feed_from_favourite_user": 0,
                "feed_recieved_at": 1489233221143,
                "venue_id": 176,
                timestamp : 1490598367
            }],
            "status_code": 200,
            "message": "Success"
        };

        return reply( result).code(status_codes.OK);
    }catch (err) {

        return reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}

function fameUsersForVenue(  request , reply  ) {

    try {

        var result = {
            "is_success": true,
            "result": [{
                "customer_id": 67,
                "first_name": "Richard Branson",
                "image": "https://pbs.twimg.com/profile_images/817027637466005505/IwRu9byQ.jpg",
                "handle" : "@richardbranson",
                "is_superstar" : 1,
                "venue_published_feed_count": 1000,
                "timestamp" : 1490598367
            },{
                "customer_id": 68,
                "first_name": "Kajal Agarwal",
                "image": "https://pbs.twimg.com/profile_images/727053878978449408/rHgoO6Za.jpg",
                "handle" : "@MsKajalAggarwal",
                "is_superstar" : 0,
                "venue_published_feed_count": 700,
                "timestamp" : 1490598367
            },{
                "customer_id": 69,
                "first_name": "Tamannaah Bhatia",
                "image": "https://pbs.twimg.com/profile_images/832897221620281344/Ef0XzER-.jpg",
                "handle" : "@tamannaahspeaks",
                "is_superstar" : 0,
                "venue_published_feed_count": 585,
                "timestamp" : 1490598367
            }],
            "status_code": 200,
            "message": "Success"
        };

        return reply( result).code(status_codes.OK);
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