'use strict';


var RedisClient = require('./Util/RedisClient');
var async = require('async');

var ServerDetails = require('../config/server_details');

class CheckHashTags {

    constructor(hash_tag_array,redisClient){

        this.hast_tag_array = hash_tag_array;
        this.redisClient = redisClient;
    }


    checkForRequiredFieldsInArray(callback){

        var instance = this;
        var is_celebration = 0;
        var venue_data = null;

        var hash_tag_array = this.hast_tag_array;

        var async = require('async');

        //async.eachSeries(hash_tag_array, function(item, done) {
        //    //asyncFunction(data++, done);
        //
        //    console.log(item);
        //
        //    var word = item.text;
        //
        //    if ( config.celebrations.data.indexOf(word) > -1 )
        //        is_celebration = 1;
        //
        //    instance.redisClient.get(word, function (err, reply) {
        //
        //        console.log(err);
        //        console.log(reply);
        //
        //        if( reply != null )
        //            venue_data = JSON.parse(reply);
        //    });
        //
        //    //done();
        //    //done();
        //}, function(err) {
        //
        //    console.log("In complete function");
        //
        //    if (err) {
        //
        //        console.log(err.message);
        //    } else {
        //
        //        console.log("In end functions");
        //        console.log("Checck is celebration", is_celebration);
        //        console.log("Venue data",venue_data);
        //
        //        var data = {
        //            'is_celebration' : is_celebration,
        //            'venue_data' : venue_data
        //        };
        //    }
        //});



        async.each(hash_tag_array, function (item,done,callback) {

            var word = item.text;

            if(item.text==undefined){
                word = item;
            }
            

            if ( config.celebrations.data.indexOf(word) > -1 )
                is_celebration = 1;

            instance.redisClient.get(ServerDetails.redis_prefix+word, function (err, reply) {

                console.log(err);
                console.log(reply);

                if( reply != null )
                    venue_data = JSON.parse(reply);

                done();
            });

            //console.log(prime);
            //callback(); // Alternatively: callback(new Error());
        }, function (err) {
            if (err) {

                console.log(err.message);
            }


            //console.log("In end functions");
            //console.log("Checck is celebration", is_celebration);
            //console.log("Venue data",venue_data);

            var data = {
                'is_celebration' : is_celebration,
                'venue_data' : venue_data
            };

            callback(data);
        });
    }
}



module.exports = CheckHashTags;