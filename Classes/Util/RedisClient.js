'use strict';


class  RedisClient {

    constructor() {

    }

    static setData(key,value) {

        this.redisClient = server._plugins['hapi-redis'].client;

        this.redisClient.set(key.toLowerCase(),value,function(err,reply){

            console.log("Venue hashtag added into the system");
        });

    }

    static getData(redisClient,key,callback) {

        //this.redisClient = server._plugins['hapi-redis'].client;
        //var instance = this;

        redisClient.get(key.toLowerCase(), function (err, reply) {

            callback(reply);
        });
    }



}




module.exports = RedisClient;