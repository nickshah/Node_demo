'use strict';

var Response = require('../Classes/Util/Response');
var StatusCodes = require('../Classes/Util/StatusCodes');
var CheckHashTags = require('../Classes/CheckHashTags');
var CustomerSocialMediaMapping = require('../Classes/Db/CustomerSocialMediaMapping');
var Customer = require('../Classes/Db/Customer');


var Perks = require('../Classes/Db/Perks/Perks');
var VenuePerks = require('../Classes/Db/Perks/VenuePerks');

var PendingEmails = require('../Classes/Db/PendingEmails');



var VenueCustomer = require('../Classes/Db/VenueCustomerMapping');


var CallApi = require('../Classes/Util/CallApi');
var UploadToTwitter = require('../Classes/UploadToTwitter');


var Send = require('../Classes/Util/Send');
var EmailEvents = require('../Classes/Util/EmailEvents');



var userTransaction = require('sequelize-transactions');


function instagram(request,reply) {

}

function test(request,reply) {

    try {


        //var data = {};
        //data.email = "anway.kulkarni@iauro.com";
        //var pending_emails = new PendingEmails(data);
        //
        //
        //pending_emails.sendPendingEmails(function(s){
        //
        //    reply(s);
        //},function(e){
        //
        //    reply(e);
        //});


        var perks = new Perks({});
        //
        //var data ={};
        //data.id = 13;
        //data.name = "New Perk";
        //data.f_start_time = '01:00:00';
        //
        //var venue_perks = new VenuePerks(data);
        //
        //venue_perks.updatePerk(function(s){
        //
        //    reply(s);
        //},function(e) {
        //
        //    reply(e);
        //});

        //
        //

        perks.getAllPerks(function(s) {

            var inserted_data = [];

            for( let i = 0; i < s.result.length; i++ ) {

                var my_object = s.result[i].dataValues;
                delete my_object.id;
                my_object.venue_id = 32;
                inserted_data.push(my_object);
            }


            var data ={};
            data.array = inserted_data;

            var venue_perks = new VenuePerks(data);

            venue_perks.createMultipleRecords(function(s){

                reply(s);
            },function(e) {

                reply(e);
            });


        },function(e){

            reply(e);
        });
        //
        //
        //var data = {
        //
        //    customer_id : 67,
        //    venue_id : 176
        //};
        //
        //var venue_c = new VenueCustomer(data);
        //
        //
        //venue_c.checkFavouriteCustomerPresent(function(su) {
        //
        //
        //    reply(su);
        //},function(err) {
        //
        //
        //    reply(err);
        //});


        ////
        //var db = server._plugins['hapi-sequelize'].new_tagloy;
        ////
        ////db.trx.start(true, function(commit, rollback) {
        ////
        ////
        ////    console.log("herere");
        ////
        ////});
        //
        //
        //return db.transaction({
        //    type: Sequelize.Transaction.EXCLUSIVE
        //}, function (t) {
        //
        //    console.log("jererer");
        //
        //    // your transactions
        //
        //}).then(function(result) {
        //    // transaction has been committed. Do something after the commit if required.
        //}).catch(function(err) {
        //    // do something with the err.
        //});



        //var url = "http://localhost:33000/organization";

        //localhost:33000/organization
        //var url = "localhost:33000/organization";
        //var url = "localhost:33000/organization";

        //var args = {
        //    name : "Anway",
        //    type : "GROUP",
        //    organization_category_id : 2,
        //    city_id : 1
        //
        //};


        //var api_call = new CallApi( "POST" , url , args  );
        //api_call.makeRequest(function( success_data ){
        //
        //    reply(success_data);
        //},function(error_data){
        //
        //    reply( error_data );
        //});


        //rest_client.registerMethod("category", url, "POST");
        //
        //rest_client.methods.category(args,function (data, response) {
        //
        //    reply(data);
        //});

        //var hash_tags =  [{
        //    "text": "OneLetterForAfia",
        //    "indices": [24, 41]
        //}, {
        //    "text": "PakvAus",
        //    "indices": [42, 50]
        //}, {
        //    "text": "BreakingNews",
        //    "indices": [51, 64]
        //}, {
        //    "text": "PanamaLeaks",
        //    "indices": [65, 77]
        //}, {
        //    "text": "INDvENG",
        //    "indices": [78, 86]
        //}, {
        //    "text": "funkkykona1",
        //    "indices": [94, 110]
        //}];
        //
        //
        //var check = new CheckHashTags(hash_tags);
        //check.checkForRequiredFieldsInArray();


        //var c = new CustomerSocialMediaMapping({'handle': "iyopine1",'customer_id': 1});
        //c.createRecord(function(success_data){
        //
        //    reply(success_data);
        //},function(error_data){
        //
        //    reply(error_data);
        //})

        //var data = {
        //    'first_name' : "Anway",
        //    'customer_id' : 2
        //};
        //
        //
        //var c = new Customer(data);
        //c.createRecord(function(success_data){
        //
        //    reply(success_data);
        //},function(error_data){
        //
        //    reply(error_data);
        //})


        //var email = new Send();
        //
        //email.sendMail(
        //    'anway.kulkarni@iauro.com',
        //    EmailEvents.forgot_password.template,
        //    EmailEvents.forgot_password.subject,
        //    {}
        //);
        //email : data.result.data.email,
        //    email_template  : EmailEvents.forgot_password.template,
        //    email_event  : EmailEvents.forgot_password.subject,
        //    data : send_email_data



    }catch (err) {

        reply( Response.sendResponse(false,StatusCodes.INTERNAL_SERVER_ERROR,null,err.message)).code(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}



exports.test = test;
exports.instagram = instagram;