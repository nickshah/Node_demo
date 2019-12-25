var config = require('./config');
var CallApi = require('./Classes/Util/CallApi');
var cron = require('node-schedule');
var async = require('async');


var kafka = require('kafka-node'),
    Producer = kafka.Producer,
    client = new kafka.Client('localhost:2181'),
    producer = new Producer(client);


client.on('ready', function (){
    console.log('client ready');
})

client.on('error', function (err){
    console.log('client error: ' + err);
})

producer.on('ready', function () {

    var rule = new cron.RecurrenceRule();
    rule.second = [0, 10, 20, 30, 40, 50];
    cron.scheduleJob(rule, function(){
        console.log('job called');
        callInstagramGet();
    });
});


var ACCESS_TOKEN = '5479028578.936a3f1.2ec52dd104124494828407513b238c39';

//8a13e521bb0e491195e956815880d018

var MIN_TAG_ID;

function callInstagramGet () {

    var url = '';

    
    if(MIN_TAG_ID){
        url = 'https://api.instagram.com/v1/tags/' + config.util.instagram_handle + '/media/recent?access_token=' + ACCESS_TOKEN + '&min_tag_id=' + MIN_TAG_ID;
    }else{
        url = 'https://api.instagram.com/v1/tags/' + config.util.instagram_handle + '/media/recent?access_token=' + ACCESS_TOKEN;
    }

    var api_call = new CallApi("GET", url, null);

    console.log(url);

    api_call.makeRequest(function (success_data) {
        //console.log(success_data);

        if(success_data.pagination && success_data.pagination.next_min_id){
            MIN_TAG_ID = success_data.pagination.next_min_id;
        }

        if(success_data.data) {
            var cnt = success_data.data.length;

            async.eachSeries(success_data.data, function iteratee(item, callback) {
                //console.log(success_data.data[i].user);
                var user_profile_url = 'https://api.instagram.com/v1/users/'+item.user.id+'/?access_token='+ACCESS_TOKEN;
                var user_api_call = new CallApi("GET", user_profile_url, null);
                user_api_call.makeRequest(function (user_success_data) {
                    if(user_success_data.data){
                        //console.log("USER SUCCESS-----",user_success_data);
                        var ig_followers = user_success_data.data.counts.followed_by;

                        //console.log(item.user);
                        
                        
                        item.user.followers = ig_followers;
                        var producer_data = {
                            data: item,
                            social_media_id: 1
                        };
        
                        var payloads = [
                            {topic: config.util.kafka_topic_instagram, messages: JSON.stringify(producer_data), partition: 0}
                        ];
        
                        producer.send(payloads, function (err, data) {
                            //console.log('send: ' + data);
        
                        });
                    }else{
                        console.log('Success while getting ig followers but data is null', user_success_data);
                    }
                },function(error){
                    console.log('Error while getting ig followers', error);
                });
                
            });


           /* for (var i = 0; i < cnt; i++) {

                console.log(success_data.data[i].user);
                var user_profile_url = 'https://api.instagram.com/v1/users/'+success_data.data[i].user.id+'/?access_token='+ACCESS_TOKEN;
                var user_api_call = new CallApi("GET", user_profile_url, null);
                user_api_call.makeRequest(function (user_success_data) {
                    if(user_success_data.data){
                        //console.log("USER SUCCESS-----",user_success_data);
                        var ig_followers = user_success_data.data.counts.followed_by;

                        console.log(success_data.data[i].user);
                        
                        success_data.data[i].user.followers = ig_followers;
                        var producer_data = {
                            data: success_data.data[i],
                            social_media_id: 1
                        };
        
                        var payloads = [
                            {topic: config.util.kafka_topic_instagram, messages: JSON.stringify(producer_data), partition: 0}
                        ];
        
                        producer.send(payloads, function (err, data) {
                            console.log('send: ' + data);
        
                        });
                    }else{
                        console.log('Success while getting ig followers but data is null', user_success_data);
                    }
                },function(error){
                    console.log('Error while getting ig followers', error);
                });
            }
            */
        }
        //callInstagramGet();
    });

}

producer.on('error', function (err) {
    console.log('error: ' + err);
    process.exit();
});