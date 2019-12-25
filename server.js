'use strict';

//  npm dependencies
var jsonfile = require('jsonfile');
var routes = require('./routes');
const Hapi = require('hapi');
var winston  = require('winston');

var Response = require('./Classes/Util/Response');

var SendMail = require('./Classes/Util/Send');

var JwtValidation = require('./Classes/TokenValidation');
var venueCustomerMapping = require('./Classes/Db/VenueCustomerMapping');
var perkController = require('./Controllers/PerksController');

/**
 * @TODO make a seprate file for email sending
 *
 * */
var ee = require('event-emitter');

var email = new SendMail();

global.emitter = ee({});

emitter.on('send_mail', function (args) {

    var data = JSON.parse(args);

    console.log(args);

    email.sendMail(
        data.email,
        data.email_template,
        data.email_event,
        data.data
    );
});

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
        host: global.config.server_details.host,
        "opts": {
            "parser": "javascript"
        }
    }
};

/**
 * {
        register : require('hapi-s3-upload'),
        options :
         s3_options
    }*/



// Scheduler for removing in-venue users at 5am
var cron = require('node-schedule');
var rule = new cron.RecurrenceRule();
rule.hour = 5;
rule.minute = 0;
cron.scheduleJob(rule, function(){
    var data = {};

    var vcm = new venueCustomerMapping(data);

    vcm.removeCheckedInUser(function(success_data){
       //console.log("Success Data: ", success_data);
    }, function(error_data){
        console.log("Error Data: ", error_data);
    });
});


// Scheduler for removing in-venue users at 3pm
/*var cron = require('node-schedule');
var rule = new cron.RecurrenceRule();
rule.hour = 15;
rule.minute = 0;
cron.scheduleJob(rule, function(){
    console.log(new Date(), 'its 05.16 PM.');
    var data = {};

    var vcm = new venueCustomerMapping(data);

    vcm.removeCheckedInUser(function(success_data){
        console.log("Success Data: ", success_data);
    }, function(error_data){
        console.log("Error Data: ", error_data);
    });
});*/


// Midnight 1st of every month - To calculate Star of the house
var cron = require('node-schedule');
var rule = new cron.RecurrenceRule();
rule.date = 1;
rule.hour = 3;
rule.minute = 0;
//var rule = '*/1 * * * *';
//var rule = '0 0 * * * *'; //Changed it to hourly basis for testing
cron.scheduleJob(rule, function(){
    console.log(new Date(), 'CALLED JOB FOR STARS AND SUPERSTARS');
    perkController.calculateMonthlyPerks({}, {});
});



server.connection({
    routes: {
        cors: true
    },
    //host: credentials.server_details.host,
    host: global.config.server_details.host,
    //port: credentials.server_details.port
    port: global.config.server_details.port
});

server.register([
    {
        register: global.hapi_sequelize,
        options: [
            {
                name: 'new_tagloy', // identifier
                models: ['models/**/*.js'],  // paths/globs to model files
                //sequelize: new Sequelize(global.config.db_details.database, global.config.db_details.username, global.config.db_details.password), // sequelize instance

                sequelize: new Sequelize(
                    config.db_details.database,  //Database Name
                    config.db_details.username,  //Database Username
                    config.db_details.password,   //Database Password,
                    {
                        logging: true,
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


    if( err ){

        console.log(err.message);
        console.log("Server not started");
        return false;
    }

    try {

        server.auth.strategy('jwt', 'jwt',
            {
                key: config.util.secret_key,
                validateFunc: JwtValidation.validateToken,
                verifyOptions: {algorithms: ['HS256']} // pick a strong algorithm
            }
        );

        server.auth.default('jwt');

        if (err)
            console.log(err);

        console.log("Routes", routes);


        for (var route in routes) {

            server.route(routes[route]);
        }

        server.start(function (err) {

            if (err) {

                console.log("SErver not started");
                console.log(err);
            } else {

                console.log('hapi server started at port ' + config.server_details.port);
            }
        });

        server.on('response', function (request) {
            if (request.response)
                console.log(request.info.remoteAddress + ': ' + request.method.toUpperCase() + ' ' + request.url.path + ' --> ' + request.response.statusCode);
            else
                console.log("No statusCode : ", request.info.remoteAddress + ': ' + request.method.toUpperCase() + ' ' + request.url.path + ' --> ');
        });


        /**
         * Format response before sending
         */
        server.ext('onPreResponse', function (request, reply) {


            //console.log("$$$$$$$$$$$$$$$",request.response.output);
            //console.log("$$$$$$$$$$$$$$$",request.response.payload);

            var validation = request.response.output != undefined ? request.response.output.payload : {};

            //console.log(validation);
            if( validation.error != undefined  ) {

                status_code = validation.statusCode != undefined ? validation.statusCode : -1;

                if(  status_code == 401  ) {

                    return reply(Response.sendResponse(false, null,custom_message.UN_AUTHORISED_REQUEST, status_codes.UNAUTHORIZED)).code(status_codes.UNAUTHORIZED);
                }

                if(  status_code == 415  ) {

                    return reply(Response.sendResponse(false, null,validation.error, status_codes.UNSUPPORTED_MEDIA_TYPE)).code(status_codes.UNAUTHORIZED);
                }

                if (  status_code == 500 ) {

                    return reply(Response.sendResponse(false, null,custom_message.SERVER_ERROR, status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
                }

                var check = validation.source != undefined ? validation.source == 'payload' : false;

                if (  check  ) {

                    return reply(Response.sendResponse(false, validation.keys, custom_message.REQUIRED_KEYS_NOT_AS_PER_SPECIFICATION, status_codes.BAD_REQUEST)).code(status_codes.BAD_REQUEST);
                } else {

                    var status_code = validation.statusCode != undefined ? validation.statusCode : 1;

                    if( status_code == 404   )
                        return reply(Response.sendResponse(false, null,validation.error, status_codes.BAD_REQUEST)).code(status_codes.NOT_FOUND);

                    return reply(Response.sendResponse(false, null,validation.message, status_codes.BAD_REQUEST)).code(status_codes.BAD_REQUEST);
                }
            }
            return reply.continue();
        });

    }catch (err){

        console.log(err.message);
    }
});


