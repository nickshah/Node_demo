"use strict";


/**
 * @apiDefine ErrorResponseFormat
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 400 BAD REQUEST
 * {
    "is_success": false,
    "result": null,
    "message": "Error message",
    "status_code": 400
 * }
 */



/**
 * @api {POST}  v1/tv/login Login
 * @apiName Login
 * @apiGroup Login
 * @apiPermission TvUser
 * @apiDescription Login api for tv application to authenticate the request and get necessary data
 * @apiParam {String} email dummyuser@tagloy.com
 * @apiParam {String} password password
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
	"is_success": true,
	"result": {
		"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFud2F5Lmt1bGthcm5pQGlhdXJvLmNvbSIsImlkIjo2NCwiaWF0IjoxNDg5NTUzOTQwLCJleHAiOjE0ODk2NDAzNDB9.d6fQlMvvzKsGkQyYcyh4TXyjsCEUnBbXmBLdntc_N6A",
		"venue_id": 1434
	},
	"status_code": 200,
	"message": "Success"
 * }
 * @apiUse ErrorResponseFormat
 * */

/**
 * @api {POST}  v1/tv/metadata metadata
 * @apiName metadata
 * @apiGroup TvApp
 * @apiPermission TvUser
 * @apiDescription Get the metadata for tv app like venue image,tagloy image,venue tag,tagloy tag
 * @apiHeader {String} Authorization
 * @apiParam {Number} venue_id
 * @apiParam {Number} timestamp
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
	"is_success": true,
	"result": {
		"venue_tag" : "#FUNKYKONA",
		"tagloy_tag" : "#TAGLOY",
		"venue_icon" : "https://bucket_name.s3.amazonaws.com/venue_icon.png",
		"tagloy_icon" : "https://bucket_name.s3.amazonaws.com/tagloy_icon.png",
		"timestamp" : 1490598367
	},
	"status_code": 200,
	"message": "Success"
 * }
 * @apiUse ErrorResponseFormat
 * */


/**
 * @api {POST}  v1/tv/feeds Feeds
 * @apiName Feeds
 * @apiGroup TvApp
 * @apiPermission TvUser
 * @apiDescription Get current feeds on timestamp, In response source is the integer value with corresponding meaning - 1 - twitter 2 - instagram 3 - facebook
 * @apiHeader {String} Authorization
 * @apiParam {Number} venue_id
 * @apiParam {Number} timestamp
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
    "is_success": true,
    "result": [
        {
            "feed_id": 5,
            "feed_msg": "#TAGLOY #FUNKYKONA  One of the best, most energetic concerts ever: @mothermother’s No Culture Tour @theMassey Hall last night!! #concerts #MotherMother",
            "feed_image": "https://pbs.twimg.com/media/C7tsLViXkAACdkT.jpg:large",
            "cust_name": "Kajal Agarwal",
            "cust_image": "https://pbs.twimg.com/profile_images/817027637466005505/IwRu9byQ.jpg",
            "handle": "@MsKajalAggarwal",
            "feed_count": 120,
            "source": 1,
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
            "timestamp": 1490598367
        },
        {
            "feed_id": 14,
            "feed_msg": "#TAGLOY #FUNKYKONA  One of the best, most energetic concerts ever: @mothermother’s No Culture Tour @theMassey Hall last night!! #concerts #MotherMother",
            "feed_image": "https://pbs.twimg.com/media/C7tsLViXkAACdkT.jpg:large",
            "cust_name": "Tamannaah Bhatia",
            "cust_image": "https://pbs.twimg.com/profile_images/832897221620281344/Ef0XzER-.jpg",
            "handle": "@tamannaahspeaks",
            "feed_count": 120,
            "source": 1,
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
            "timestamp": 1490598367
        }
    ],
    "status_code": 200,
    "message": "Success"
 * }
 * @apiUse ErrorResponseFormat
 * */




/**
 * @api {POST}  v1/tv/banners Banners
 * @apiName Banners
 * @apiGroup TvApp
 * @apiPermission TvUser
 * @apiDescription Get Banner media on timestamp
 * @apiHeader {String} Authorization
 * @apiParam {Number} venue_id
 * @apiParam {Number} timestamp
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
    "is_success": true,
    "result": [
        {
            "id": 1243,
            "media_url": "https://tagloyimages.s3.ap-south-1.amazonaws.com/b47065ce4f6177bc3ea8897b2728f4cd.jpg",
            "type": "IMAGE",
            "from_tagmin": 1,
            "timestamp": 1490598367
        },
        {
            "id": 1243,
            "media_url": "https://tagloyimages.s3.ap-south-1.amazonaws.com/PFYIwnA.png",
            "type": "VIDEO",
            "from_tagmin": 0,
            "timestamp": 1490598367
        }
    ],
    "status_code": 200,
    "message": "Success"
 * }
 * @apiUse ErrorResponseFormat
 * */



/**
 * @api {POST}  v1/tv/fameusers Get Fame users
 * @apiName Fame users
 * @apiGroup TvApp
 * @apiPermission TvUser
 * @apiDescription Get fame users for venue on timestamp
 * @apiHeader {String} Authorization
 * @apiParam {Number} venue_id
 * @apiParam {Number} timestamp
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
	 "is_success": true,
    "result": [
        {
            "customer_id": 67,
            "first_name": "Richard Branson",
            "image": "https://pbs.twimg.com/profile_images/817027637466005505/IwRu9byQ.jpg",
            "handle": "@richardbranson",
            "is_superstar": 1,
            "venue_published_feed_count": 1000,
            "timestamp": 1490598367
        },
        {
            "customer_id": 68,
            "first_name": "Kajal Agarwal",
            "image": "https://pbs.twimg.com/profile_images/727053878978449408/rHgoO6Za.jpg",
            "handle": "@MsKajalAggarwal",
            "is_superstar": 0,
            "venue_published_feed_count": 700,
            "timestamp": 1490598367
        },
        {
            "customer_id": 69,
            "first_name": "Tamannaah Bhatia",
            "image": "https://pbs.twimg.com/profile_images/832897221620281344/Ef0XzER-.jpg",
            "handle": "@tamannaahspeaks",
            "is_superstar": 0,
            "venue_published_feed_count": 585,
            "timestamp": 1490598367
        }
    ],
    "status_code": 200,
    "message": "Success"
 * }
 * @apiUse ErrorResponseFormat
 * */



/**
 * @api {POST}  v1/tv/blackboard Blackboard
 * @apiName Get blackboard
 * @apiGroup TvApp
 * @apiPermission TvUser
 * @apiDescription Get Blackboard data for showcasing on TvApp
 * @apiHeader {String} Authorization
 * @apiParam {Number} venue_id
 * @apiParam {Number} timestamp
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
        "is_success": true,
        "result": {
                "color": "#FF0000",
                "heading": "Chirtsmas party nights",
                "content": "Coffee & Cake, Vodka and rum, Corona and Miller",
                "footer": "FunkkyKona"
            },
        "status_code": 200,
        "message": "Success"
 * }
 * @apiUse ErrorResponseFormat
 * */