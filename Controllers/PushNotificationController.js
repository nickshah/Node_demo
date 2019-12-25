/**
 * Created by mayur on 21/6/17.
 */

'use strict';

var Customer = require('../Classes/Db/Customer');

var social_media_details = require('../config/social_media_details');
var https = require('https');


function updateFireBaseToken( request ,reply ){

    try {
        var customer = new Customer(request.payload);

        customer.updateFireBaseToken(function (success_data) {

            reply(success_data).code(success_data.status_code);
            
        }, function (error_data) {
            reply(error_data).code(error_data.status_code);
        });


    }catch ( err ) {

        reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}


function sendPushNotification(data, to, callback){
    var options = {
        host: 'fcm.googleapis.com',
        method: 'POST',
        path: '/fcm/send',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'key='+social_media_details.fcm.key
        }
    };

    var notf = {};
    notf.body = data.message;
    notf.title = data.title;

    var postData = {};
    postData.data = data;
    postData.registration_ids = to;
    postData.priority = 'high';
    postData.notification = notf;

    var requestCallback = function(response) {
        response.on('data', function (body) {
            console.log('Notification Response data: ' + body);
            callback(body);
        });

        response.on('end', function (data) {
            console.log('Notification Response END: ' + data);
            callback(data);
        });
    };

    var request = https.request(options, requestCallback);
    console.log(postData);
    request.write(JSON.stringify(postData));
    request.end();
}

exports.sendPushNotification = sendPushNotification;
exports.updateFireBaseToken = updateFireBaseToken;