'use strict';

var jsonfile = require('jsonfile');
var Twitter = require('twitter');
var config = require('./config');


var kafka = require('kafka-node'),
    Producer = kafka.Producer,
    client = new kafka.Client('localhost:2181'),
    producer = new Producer(client);

//console.log(credentials);
var twitter_client = new Twitter(config.social_media_details.twitter);

try {

    producer.on('ready', function () {

        console.log(" Producer is ready, we now streaming tweets for " + config.util.twitter_handle);

        var stream = twitter_client.stream('statuses/filter', {track: config.util.twitter_handle});
        stream.on('data', function (event) {

            var producer_data = {
                data : event,
                social_media_id : 2
            };

            //console.log(producer_data);

            var payloads = [
                {topic: config.util.kafka_topic, messages: JSON.stringify(producer_data), partition: 0}
            ];

            producer.send(payloads, function (err, data) {

                console.log(data);
            });
        });
    });
}catch (e) {

    console.log(e);
}

