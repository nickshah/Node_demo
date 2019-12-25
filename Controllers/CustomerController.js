'use strict';

var Response = require('../Classes/Util/Response');
var CustomerPerkDetails = require('../Classes/Db/Perks/CustomerPerkDetails');
var VenueCustomerMapping = require('../Classes/Db/VenueCustomerMapping');
var VenueCustomerCheckInView = require('../Classes/Db/VenueCustomerCheckInView');
var CustomerSocialMediaMapping = require('../Classes/Db/CustomerSocialMediaMapping');
var VenueDetailsView = require('../Classes/Db/VenueDetailsView');
var VenuePerks = require('../Classes/Db/Perks/VenuePerks');
var VenueStars = require('../Classes/Db/VenueStarsView');
var VenuePerkCustomerMapping = require('../Classes/Db/Perks/VenuePerkCustomerMapping');

var PublishedSpotlights = require('../Classes/Db/Spotlights/PublishedSpotlights');
var PublishedSpotlightsView = require('../Classes/Db/Spotlights/PublishedSpotlightView');

var Customer = require('../Classes/Db/Customer');
var CallApi = require('../Classes/Util/CallApi');


var async = require('async');
var Venue = require('../Classes/Db/Venue');

var qr = require('qr-image');
var QRCode = require('qrcode')

var CustomerDetailsView = require('../Classes/Db/VenueCustomerMappingView');


function getPerks( request , reply ) {

    var customer_perks = new CustomerPerkDetails(request.payload);

    customer_perks.getPerksForCustomer(function(success_data){

        reply(success_data).code(success_data.status_code);
    },function(error_data){

        reply(error_data).code(error_data.status_code);
    })
}

function getSinglePerk( request , reply ) {

    var customer_perks = new CustomerPerkDetails(request.payload);

    customer_perks.getSinglePerkForCustomer(function(success_data){

        reply(success_data).code(success_data.status_code);
    },function(error_data){

        reply(error_data).code(error_data.status_code);
    })
}


function searchPerks( request , reply ) {


    var customer_perks = new CustomerPerkDetails(request.payload);

    customer_perks.searchPerksForCustomer(function(success_data){

        reply(success_data).code(success_data.status_code);
    },function(error_data){

        reply(error_data).code(error_data.status_code);
    })
}


function getCheckedInVenues( request , reply ) {

    var venue = new VenueCustomerCheckInView(request.payload);

    venue.getCheckInVenuesForCustomer(function(success_data){

        reply(success_data).code(success_data.status_code);
    },function(error_data){

        reply(error_data).code(error_data.status_code);
    })
}


function searchVenues( request , reply ) {
    console.log("REQUEST"+request.payload);

    var venue = new Venue(request.payload);

    venue.searchVenue(function(success_data){

        reply(success_data).code(success_data.status_code);
    },function(error_data){

        reply(error_data).code(error_data.status_code);
    })

}

function getNearByVenues( request , reply ) {


    console.log("REQUEST"+JSON.stringify(request.payload));

    var venue = new Venue(request.payload);

    venue.getNearByVenues(function(success_data){

        reply(success_data).code(success_data.status_code);
    },function(error_data){

        reply(error_data).code(error_data.status_code);
    })

}


function getVenueDetailsForCustomer( request , reply ) {

    var vd = new VenueDetailsView(request.payload);

    vd.getVenueDetailsForCustomer(function (success_data) {

        var perks = new VenuePerks(request.payload);
        perks.getPerksForVenue(function (perks_success_data) {

            success_data.result.perks = perks_success_data.result;

            //var spotlights = new PublishedSpotlights(request.payload);
            var spotlights_view = new PublishedSpotlightsView(request.payload);
            spotlights_view.getPublishedSpotlights(function (sp_success_data) {

                success_data.result.spotlights = sp_success_data.result;
                var vs = new VenueStars(request.payload);
                vs.getVenueStars(function (vs_success_data) {

                    success_data.result.stars = vs_success_data.result;

                    var vcm = new VenueCustomerMapping(request.payload, server._plugins['hapi-sequelize'].new_tagloy.models);

                    vcm.getCheckedInCount(function(vcm_success_data){

                        console.log("vcm_success_data: ", vcm_success_data);
                        if(vcm_success_data.result != null)
                            success_data.result.check_in_count = vcm_success_data.result.check_in_count;
                        else
                            success_data.result.check_in_count = 0;
                        reply(success_data).code(success_data.status_code);
                    }, function(vcm_error_data){
                        reply(success_data).code(success_data.status_code);
                    });

                },function (vp_error_data) {
                    reply(success_data).code(success_data.status_code);
                })

            }, function (sp_error_data) {
                reply(error_data).code(error_data.status_code);
            });


        }, function (perks_error_data) {

            reply(error_data).code(error_data.status_code);
        })

        //reply(success_data).code(success_data.status_code);

    }, function (error_data) {
        reply(error_data).code(error_data.status_code);
    });

}

function getCustomerStats( request , reply ) {

    var customer = new Customer(request.payload);
    customer.getCustomerStats(function (success_data) {
        reply(success_data).code(success_data.status_code);
    },function (error_data) {
        reply(error_data).code(error_data.status_code);
    });
}

function createCustomer( request ,reply ) {

    try {
        var customer = new Customer(request.payload);

        console.log(customer);

        customer.createRecord(function (success) {

            var social_media_mapping = {
                "customer_id" : "",
                "social_media_id" : "",
                "handle" : ""

            };
            var customer_social_media_mapping = new CustomerSocialMediaMapping(social_media_mapping);

            customer_social_media_mapping.createRecord(function(success_data){

                reply(Response.sendResponse(true,success.result,null,status_codes.CREATED));

            },function(error_data){
                console.log("Error in customer social media cretirng entry");
                reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
            });

        }, function (error) {
            console.log(error);
            reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
        });

    }catch ( err ) {
        console.log(err);
        reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}

function loginCustomer( request ,reply ) {

    try {
        var customer = new Customer(request.payload);

        console.log(customer);

        customer.login(function (success) {
            reply(Response.sendResponse(true,success,null,status_codes.CREATED));

        }, function (error) {
            console.log(error);
            reply(Response.sendResponse(false,error.result,error.message,status_codes.NOT_FOUND));
        });



    }catch ( err ) {
        console.log(err);
        reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}

function addCustomerSocialMediaMapping( request ,reply ) {

    try {

        var venue_social_media = new CustomerSocialMediaMapping(request.payload);

        venue_social_media.linkSocialAccount(function(success_data){

            reply(success_data).code(success_data.status_code);
        },function(error_data){

            reply(error_data).code(error_data.status_code);
        })
    }catch ( err ) {

        reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}

function removeCustomerSocialMediaMapping( request ,reply ) {
    
        try {
    
            var venue_social_media = new CustomerSocialMediaMapping(request.payload);
    
            venue_social_media.linkSocialAccount(function(success_data){
    
                reply(success_data).code(success_data.status_code);
            },function(error_data){
    
                reply(error_data).code(error_data.status_code);
            })
        }catch ( err ) {
    
            reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
        }
}


function getQRCode( request , reply ) {

    try {

        var timestamp = -1;
        var perk_id = -1;
        var customer_id;

        var date = new Date();

        var qr_str = "";

        if(request.payload.perk_id != undefined)
        {
            timestamp = date.getTime();
            console.log("Timestamp: ", timestamp);
            perk_id = request.payload.perk_id;
            qr_str = qr_str + timestamp + '-' + perk_id + '-';
        }
        customer_id = request.payload.customer_id;
        qr_str = qr_str + customer_id;

        var encodedString = new Buffer(qr_str).toString('base64');

        QRCode.toDataURL(encodedString, function (err, url) {
            console.log(url);
            reply(Response.sendResponse(true,url,null,status_codes.OK));
        })

    }catch(err){
        reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}

function redeemPerk(request, reply) {
    try{

        var vpc = new VenuePerkCustomerMapping(request.payload);
        vpc.redeemPerk(function (response_data) {
            reply(Response.sendResponse(response_data.is_success, response_data.result, response_data.message, response_data.status_code));

        }, function (error) {
            reply(error).code(error.status_code);
        });


    }catch(err){
        reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}


function redirectInstagram(request, reply){
    try {

        console.log(request.url.query["hub.challenge"]);

        reply(request.url.query["hub.challenge"]);

    }catch(err){
        reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}


function getCurrentCheckIns(request, reply){
    try {

        var vcm = new VenueCustomerMapping(request.payload, server._plugins['hapi-sequelize'].new_tagloy.models);

        vcm.getCurrentCheckIn(function(success_data){

            reply(success_data).code(success_data.status_code);
        },function(error_data){

            reply(error_data).code(error_data.status_code);
        })

    }catch(err){
        reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}

function getProfile(request, reply){
    try {

        var customer = new Customer(request.payload);

        console.log(customer);

        customer.getCustomerProfile(function (success) {
            reply(success);

        }, function (error) {
            console.log(error);
            reply(Response.sendResponse(false,error.result,error.message,status_codes.NOT_FOUND));
        });

    }catch(err){
        reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}

function getProfileForScanner(request, reply){
    try {

        var customer = new CustomerDetailsView(request.payload);

        customer.getCustomersForVenue(function(success_data){

            reply(success_data).code(success_data.status_code);
        },function(error_data){

            reply(error_data).code(error_data.status_code);
        })
    }catch ( err ) {

        reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}


function updateProfile(request, reply){
    try {

        console.log("request.payload: ", request.payload);
        var customer = new Customer(request.payload);

        console.log(customer);

        customer.updateProfile(function (success) {
            reply(success);

        }, function (error) {
            console.log(error);
            reply(Response.sendResponse(false,error.result,error.message,status_codes.NOT_FOUND));
        });

    }catch(err){
        reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}


function getCustomerNotification(request, reply){
    try {

        console.log("request.payload: ", request.payload);
        var customer = new Customer(request.payload);

        console.log(customer);

        customer.getCustomerNotification(function (success) {
            reply(success);

        }, function (error) {
            console.log(error);
            reply(Response.sendResponse(false,error.result,error.message,status_codes.NOT_FOUND));
        });

    }catch(err){
        reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}

exports.getPerks = getPerks;
exports.getSinglePerk = getSinglePerk;
exports.createCustomer = createCustomer;
exports.loginCustomer = loginCustomer;
exports.getCheckedInVenues = getCheckedInVenues;
exports.searchPerks = searchPerks;
exports.searchVenues = searchVenues;
exports.getNearByVenues = getNearByVenues;
exports.getVenueDetailsForCustomer = getVenueDetailsForCustomer;
exports.addCustomerSocialMediaMapping = addCustomerSocialMediaMapping;
exports.removeCustomerSocialMediaMapping = removeCustomerSocialMediaMapping;

exports.getCustomerStats = getCustomerStats;
exports.getQRCode = getQRCode;
exports.redeemPerk = redeemPerk;
exports.redirectInstagram = redirectInstagram;
exports.getCurrentCheckIns = getCurrentCheckIns;
exports.getProfile = getProfile;
exports.getProfileForScanner = getProfileForScanner;
exports.updateProfile = updateProfile;
exports.getCustomerNotification = getCustomerNotification;


