'use strict';

//  npm dependencies
var jsonfile = require('jsonfile');
var config = require('./config');
var async = require('async');
var filter_controller = require('./Controllers/FilterController');
var CheckHashTags = require('./Classes/CheckHashTags');
var CustomerSocialMediaMapping = require('./Classes/Db/CustomerSocialMediaMapping');
var VenueCustomerMapping = require('./Classes/Db/VenueCustomerMapping');
var VenueBlockCustomerMapping = require('./Classes/Db/VenueBlockCustomerMapping');
var VenueFavouriteCustomerMapping = require('./Classes/Db/VenueFavouriteCustomerMapping');
var PendingFeeds = require('./Classes/Db/Feeds/PendingFeeds');
var PublishedFeeds = require('./Classes/Db/Feeds/PublishedFeeds');
var FeedImages = require('./Classes/Db/Feeds/FeedImages');
var FeedController = require('./Controllers/FeedController');
var Customer = require('./Classes/Db/Customer');
const Hapi = require('hapi');

//  Declare the global variables
if ( !global.Sequelize )
    global.Sequelize = require('sequelize');

if ( !global.Joi )
    global.Joi = require('joi');

if(  !global._ )
    global._ = require('underscore');

if ( !global.hapi_sequelize  )
    global.hapi_sequelize = require('hapi-sequelize');

if( !global.config )
    global.config = require('./config');

//  Start the server with dependencies
if( !global.server )
    global.server = new Hapi.Server();

if( !global.status_codes )
    global.status_codes = require('./util/status_codes');

if( !global.custom_message )
    global.custom_message = require('./util/error_messages');



////Redis
var myPluginOpts = {
    connection: {
        host: config.server_details.host,
        "opts": {
            "parser": "javascript"
        }
    }
};




console.log(config.server_details.host);

//  Start the server with dependencies
var server = new Hapi.Server();

var myPluginOpts = {
    connection: {
        host: config.server_details.host,
        "opts": {
            "parser": "javascript"
        }
    }
};

server.connection({
    routes: {
        cors: true
    },
    //host: credentials.server_details.host,
    host: config.consumer_server_details.host,
    //port: credentials.server_details.port
    port: config.consumer_server_details.port
});


server.register([
    {
        register: global.hapi_sequelize,
        options: [
            {
                name: 'new_tagloy', // identifier
                models: ['models/**/*.js'],  // paths/globs to model files
                //sequelize: new Sequelize(config.db_details.database, config.db_details.username, config.db_details.password), // sequelize instance

                sequelize: new Sequelize(
                    config.db_details.database,  //Database Name
                    config.db_details.username,  //Database Username
                    config.db_details.password,   //Database Password,
                    {
                        logging: false,
                        host: config.db_details.host
                    }
                ) // sequelize instance

                // sync: true // sync models - default false
                //forceSync: false // force sync (drops tables) - default false
            }
        ]
    },{
        register: require('hapi-auth-jwt2')
    }, {
        register: require('hapi-redis'),
        options: myPluginOpts
    }
], function(err) {

    var kafka = require('kafka-node'),
        Consumer = kafka.Consumer,
        client = new kafka.Client('localhost:2181'),
        consumer = new Consumer(
            client,
            [
                { topic: config.util.kafka_topic_instagram, partition: 0 }
            ],
            {
                autoCommit: true
            }
        );

    consumer.on('message', function (message) {

        console.log('Message from instagram', message);

        var db_models = server._plugins['hapi-sequelize'].new_tagloy.models;


        var value = JSON.parse(message.value);

        if (value.data.user && value.data.images && value.data.caption) {

            //var url = value.data.images.standard_resolution.url;
            var url = [];

            if(value.data.carousel_media){
                var cnt = value.data.carousel_media.length;
                for(var i=0;i<cnt;i++){
                    
                    if(value.data.carousel_media[i].images){
                        var obj = {};
                        obj.url = value.data.carousel_media[i].images.standard_resolution.url;
                        obj.mediaType = 'image';
                        obj.width = value.data.carousel_media[i].images.standard_resolution.width;
                        obj.height = value.data.carousel_media[i].images.standard_resolution.height;    
                        url.push(obj);
                    }else if(value.data.carousel_media[i].videos){
                        var obj = {};
                        obj.url = value.data.carousel_media[i].videos.standard_resolution.url;
                        obj.mediaType = 'video';
                        obj.width = value.data.carousel_media[i].videos.standard_resolution.width;
                        obj.height = value.data.carousel_media[i].videos.standard_resolution.height;    
                        url.push(obj);
                    }
                }
            }else if(value.data.videos){
                var obj = {};
                obj.url = value.data.videos.standard_resolution.url;
                obj.mediaType = 'video';
                obj.width = value.data.videos.standard_resolution.width;
                obj.height = value.data.videos.standard_resolution.height;    
                url.push(obj);
            }else{
                var obj = {};
                obj.url = value.data.images.standard_resolution.url;
                obj.mediaType = 'image';
                obj.width = value.data.images.standard_resolution.width;
                obj.height = value.data.images.standard_resolution.height;    
                url.push(obj);
            }

            var tags = value.data.tags;

            var user_details = {};
            user_details.instagram_id = value.data.user.id;
            user_details.full_name = value.data.user.full_name;
            user_details.handle = value.data.user.username;
            user_details.ig_follower = value.data.user.followers;
            user_details.image_url = value.data.user.profile_picture;

            console.log('Username', user_details.instagram_id);
            console.log('Tag', tags);
            console.log('Image URL', url);


            var redisClient = server._plugins['hapi-redis'].client;

            var f = {
                'instagram_media_id' : value.data.id
            };
            var fi = new FeedImages(f,db_models);
            fi.checkIfFeedPresent(function(success_data){

                //callaback(success_data);
                console.log('successs Media id',success_data);
           

            
            async.parallel([

                
                function(callback) {

                
                    console.log("First callaback");

                    filter_controller.userIgFilter(user_details,function(success_data){

                        console.log('userTwitterFilter: ', success_data);

                        var twt_user_details = success_data.result;

                        var twt_user_details_object = success_data;

                        var customer_social_media_mapping = new CustomerSocialMediaMapping(success_data.result,db_models);

                        customer_social_media_mapping.checkHandlePresent(function(success_data){

                            console.log('checkHandlePresent: ', success_data);

                            twt_user_details.customer_id = success_data.result.customer_id;

                            var customer = new Customer(twt_user_details,db_models);

                            customer.updateFollowers(function(success_data){

                                console.log('updateFollowers: ', success_data);

                                callback(null, twt_user_details_object);
                            },function(error_data){


                                console.log("Error in update follwers");
                                callback(error_data);
                            });
                        },function(error_data){

                            console.log('checkHandlePresent Error: ', error_data);

                            twt_user_details.social_media_id = 1;
                            var customer = new Customer(twt_user_details, db_models);

                            customer.createRecord(function(success_data){

                                console.log('checkHandlePresent Error Insert User: ', success_data);

                                //console.log(success_data.result);


                                var social_media_mapping = {

                                    customer_id : success_data.result.customer_id,
                                    handle : user_details.handle,
                                    social_media_id : 1
                                };

                                var customer_social_media_mapping = new CustomerSocialMediaMapping(social_media_mapping,db_models);

                                customer_social_media_mapping.createRecord(function(success_data){

                                    return callback(null,success_data);
                                },function(error_data){


                                    console.log("Error in customer social media cretirng entry");
                                    callback(error_data);
                                });
                            },function(error_data){

                                console.log('checkHandlePresent Error Insert User Error: ', error_data);

                                console.log("error in customer creating entry");

                                callback(error_data,null);
                            });
                        })
                    },function(error_data){

                        console.log('userTwitterFilter Error: ', error_data);

                        console.log("error in twitter filter");

                        callback(error_data,null);
                    });
                },

                function(callback) {

                    //console.log(JSON.stringify(data));

                    //tag = tag.replace('#', '');

                    var hashtags =  value.data.tags;


                    console.log("hashtags", hashtags);

                    var check = new CheckHashTags(hashtags,redisClient);

                    check.checkForRequiredFieldsInArray(function(success_data){

                        console.log('checkForRequiredFieldsInArray Error: ', success_data);

                        callback(null,success_data)
                    },function(error_data){

                        callback(error_data,null);
                    });

                }
            ], function(err, results) {

                console.log("After Parallel Code: ", results);

                console.log("After Parallel Code: RESULT venue_data", results[1].venue_data);
                

                if( err  ){

                    console.log(err);
                    return 0;
                }

                let is_venue_present = results[1].venue_data != null ? results[1].venue_data.id : false;

                if (is_venue_present != false) {

                    var venue_details = results[1].venue_data;

                    var customer_mapping = {
                        'customer_id': results[0].result.customer_id,
                        'venue_id': results[1].venue_data.id
                    };

                    var feed_data = {};
                    feed_data.feed_msg = (value.data.caption.text != undefined || value.data.caption.text != null) ? value.data.caption.text : '';
                    feed_data.customer_id = results[0].result.customer_id;
                    feed_data.venue_id = results[1].venue_data.id;
                    feed_data.is_celebration = results[1].is_celebration;
                    feed_data.social_media_id = 1;
                    feed_data.media_url = url;


                    async.waterfall([

                        function (callback) {


                            var blocked_customer_mapping = new VenueCustomerMapping( customer_mapping , server._plugins['hapi-sequelize'].new_tagloy.models );

                            //VenueCustomerMapping
                            blocked_customer_mapping.checkBlockedCustomerPresent(function (success_data) {

                                callback(null);
                            }, function (error_data) {

                                callback(error_data);
                            });

                        }, function (callback) {

                            var favourite_customer_mapping = new VenueCustomerMapping( customer_mapping , server._plugins['hapi-sequelize'].new_tagloy.models );

                            favourite_customer_mapping.checkFavouriteCustomerPresent(function (success_data) {

                                feed_data.is_favourite = 1;
                                callback(null);
                            }, function (error_data) {


                                callback(null);
                            });
                        }, function (callback) {

                            callback(null);
                        }
                    ], function (err, results) {


                        if( err ) {

                            return 0;
                        }

                        console.log('feed_data: ', feed_data);

                        var pending_feed = new PendingFeeds(feed_data,db_models);
                        pending_feed.createRecord(feed_data.media_url, value.data.id, function(success_data){

                            /**
                             * Here check for multiple images for single feed and insert into database
                             * @type {{feed_id: *, image: *}}
                             */
                            var image_info = {
                                feed_id : success_data.result.id,
                                image : JSON.stringify(success_data.media_url),
                                instagram_media_id : success_data.instagram_media_id
                            };

                            console.log("Image Info: ",image_info);

                            var feed_image = new FeedImages(image_info,db_models);

                            feed_image.createRecord(function(){

                                /**
                                 * Check for autoapproval and shift from pending to published
                                 */
                                if( venue_details.auto_approval == 1 ) {

                                    /**
                                     * Todo create separate method in separate class for this field
                                     */
                                    async.waterfall([

                                        function( callback ) {

                                            var pending_feeds = new PendingFeeds(success_data.result,db_models);

                                            pending_feeds.getFeedById(function(success_data){

                                                callback( null,success_data.result )
                                            },function(error_data){

                                                callback(error_data);
                                            })
                                        },
                                        function( arg1 , callback ) {

                                            arg1.feed_id = arg1.id;
                                            delete arg1.id;

                                            var published_Feed = new PublishedFeeds(arg1,db_models);

                                            published_Feed.createRecord(function(success_data){

                                                callback(null, arg1)
                                            },function(error_data){

                                                callback(error_data);
                                            })
                                        },
                                        function( arg1 , callback ) {


                                            var pending_feeds = new PendingFeeds(success_data.result,db_models);

                                            pending_feeds.deleteFeedById(function(success_data){

                                                callback( null,success_data.result )
                                            },function(error_data){

                                                callback(error_data);
                                            })
                                        }
                                    ],function(err,results) {

                                        if( err ) {

                                            console.log(err);
                                            //reply( err).code( err.status_code )  ;
                                            return 0;
                                        }
                                        //reply( Response.sendResponse(true,null,custom_message.FEED_APPROVED,status_codes.OK) );
                                    });
                                }
                            },function(){

                            });
                        },function(error_data){

                            console.log(error_data);
                        });


                        console.log(results);
                    });
                } else {

                    console.log("Venue not present");
                    return 0;
                }
            });

        },function(error_data){
            console.log('ERROR instagram media already added',error_data);
            //callaback(null,error_data);
        });

        }

    });

});
