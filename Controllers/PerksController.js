'use strict';

var Response = require('../Classes/Util/Response');

var Perks = require('../Classes/Db/Perks/Perks');
var VenuePerks = require('../Classes/Db/Perks/VenuePerks');
var VenuePerkCustomerMapping = require('../Classes/Db/Perks/VenuePerkCustomerMapping');
var Venue = require('../Classes/Db/Venue');
var VenueStars = require('../Classes/Db/VenueStars');
var VenueCustomerMapping = require('../Classes/Db/VenueCustomerMapping');
var CustomerPerkDetails = require('../Classes/Db/Perks/CustomerPerkDetails');


var async = require('async');

function getPerksForVenue( request , reply ) {

    try {

        var venue_perks = new VenuePerks(request.payload);

        venue_perks.getPerksForVenue(function(success_data){

            reply(success_data).code(success_data.status_code);
        },function(error_data){

            reply(error_data).code(error_data.status_code);
        })

    }catch(err) {

        reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}


function getCustomPerksForVenue( request , reply ) {

    try {

        var venue_perks = new VenuePerks(request.payload);

        venue_perks.getCustomPerksForVenue(function(success_data){

            reply(success_data).code(success_data.status_code);
        },function(error_data){

            reply(error_data).code(error_data.status_code);
        })

    }catch(err) {

        reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}


function updatePerk( request , reply  ) {

    try {

        var venue_perks = new VenuePerks(request.payload);

        venue_perks.updatePerk(function(success_data){

            reply(success_data).code(success_data.status_code);
        },function(error_data){

            reply(error_data).code(error_data.status_code);
        })

    }catch(err) {

        reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}

function getPerkReport(request, reply){
    try{

        var cpd = new CustomerPerkDetails(request.payload);
        
                cpd.getPerkReports(function(success_data){
        
                    reply(success_data).code(success_data.status_code);
                },function(error_data){
        
                    reply(error_data).code(error_data.status_code);
                })            

    }catch(err){
        reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}


function getPerkReportExcel(request, reply){
    try{

        var cpd = new CustomerPerkDetails(request.payload);

        cpd.getPerkReportExcel(function(success_data){

            var filename = request.payload.venue_id + "_" + Date.now();

            reply(success_data)
                .header('Content-Type', 'text/xlsx')
                .header('Content-Disposition', 'attachment; filename=' + filename + '.xlsx');

            //reply(success_data).code(success_data.status_code);
        },function(error_data){

            reply(error_data).code(error_data.status_code);
        })

    }catch(err){
        reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}


function calculateMonthlyPerks(  request , reply  ) {


    try {

       
        var venue_stars = new VenueStars({});
        venue_stars.updateRecords(function(){

        var venue = new Venue({});

        venue.getAllVenues(function(venue_data) {

            //console.log("venue data: ", venue_data);

            async.each(venue_data.result, function (item,callback) {

                console.log("Venue ID========: ", item.dataValues.venue_id);
                if(item.dataValues.venue_id!=2){

                var venue_customer_mapping = new VenueCustomerMapping(item.dataValues);

                
                venue_customer_mapping.getStarCustomersForVenue( function(star_customer_data) {

                    star_customer_data = JSON.parse(JSON.stringify(star_customer_data));
                    var flag = 1;
                    console.log("STAR star_customer_data======: ", star_customer_data.result);
                    

                    async.each(star_customer_data.result[0], function (itm,callback) {

                        console.log("STAR item========: ", itm);
                        

                        var perk_checking_data = {

                            venue_id: itm.venue_id
                        };

                        var venue_star_data = {
                            venue_id : itm.venue_id,
                            customer_id : itm.customer_id,
                            tag_count : itm.published_feed_count,
                            is_superstar : flag
                        };

                        perk_checking_data.name = flag == 1 ? "SuperStar" : "Star";
                        flag = flag == 1 ?  0 : 0;

                        var venue_perks = new VenuePerks(perk_checking_data);

                        venue_perks.checkPerkIsEnabledOrNot(function(perk_data){


                            var customer_perk = {
                                customer_id : itm.customer_id,
                                venue_perk_id : perk_data.result.id
                            };

                            var venue_perk_customer = new VenuePerkCustomerMapping(customer_perk);

                            venue_perk_customer.createRecord(function(success_data){


                                var venue_stars = new VenueStars(venue_star_data);

                                venue_stars.createRecord(function(success_data){

                                },function(error_data){

                                });

                            },function(error_data){

                                console.log(error_data);
                            });

                            //console.log(perk_data);
                        },function(){

                        })

                    }, function (err) {


                        if (err) {

                            callback(err);
                        }
                    });




                },function(error_data){

                    console.log("Error in getting top3 customers",error_data);
                });
            }
            }, function (err) {


                if (err) {

                    callback(err);
                }
            });

        },function(error_data){


            console.log("error",error_data);
        });

    }, function(){
        
                });


    } catch (err) {
        
    }


}



exports.getPerksForVenue = getPerksForVenue;
exports.getCustomPerksForVenue = getCustomPerksForVenue;
exports.updatePerk = updatePerk;
exports.getPerkReport = getPerkReport;
exports.getPerkReportExcel = getPerkReportExcel;
exports.calculateMonthlyPerks = calculateMonthlyPerks;
