'use strict';

var Response = require('../Util/Response');
var EmailEvents = require('../Util/EmailEvents');
var CallApi = require('../Util/CallApi');
var PendingEmails = require('./PendingEmails');
var UploadFile = require('../Util/UploadFile');
var VenuePerks = require('./Perks/VenuePerks');
var Perks = require('./Perks/Perks');

var async = require('async');

class VenueDetailsView {

    constructor(data) {

        this.models = server._plugins['hapi-sequelize'].new_tagloy.models.v_venue_details;

        this.venue_id =  data.venue_id != undefined ? data.venue_id : null ;

        this.page = data.page != undefined ? data.page : 0;
        this.search_term = data.search_term != undefined ? data.search_term : null;
    }



    getVenueDetails( success , error ) {

        try {

            this.models.getVenueDetails(this, function (success_data) {

                success(success_data);
            }, function (error_data) {

                error(error_data);
            });
        }catch ( err ) {

            error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
        }
    }


    getVenueTVStatus( success , error ) {

        try {

            this.models.getVenueTVStatus(this, function (success_data) {

                success(success_data);
            }, function (error_data) {

                error(error_data);
            });
        }catch ( err ) {

            error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
        }
    }

    getVenueDetailsForCustomer( success , error ) {

        try {

            this.models.getVenueDetailsForCustomer(this, function (success_data) {

                success(success_data);
            }, function (error_data) {

                error(error_data);
            });
        }catch ( err ) {

            error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
        }
    }


    searchVenue( success , error ) {

        try {

            this.models.searchVenue( this,function(success_data) {

                success( success_data );
            },function( error_data ) {

                error( error_data );
            })

        }catch (err) {

            error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
        }

    }

    getAllVenues( success , error  ) {

        try  {


            console.log("jere");

            this.models.getAllVenues(  function(success_data) {

                success( success_data );
            },function( error_data ) {

                error( error_data );
            })
        }catch (err) {

            error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
        }

    }



}

module.exports = VenueDetailsView;
