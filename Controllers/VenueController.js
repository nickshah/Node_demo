'use strict';

var Response = require('../Classes/Util/Response');
var StatusCodes = require('../Classes/Util/StatusCodes');
var Venue = require('../Classes/Db/Venue');

var VenueDetailsView = require('../Classes/Db/VenueDetailsView');

var Customer = require('../Classes/Db/Customer');
var VenueBlockCustomerMapping = require('../Classes/Db/VenueBlockCustomerMapping');
var VenueSocialMediaMapping = require('../Classes/Db/VenueSocialMediaMapping');

var CustomerDetailsView = require('../Classes/Db/VenueCustomerMappingView');
var VenueCustomerMapping = require('../Classes/Db/VenueCustomerMapping');
var VenuePerks = require('../Classes/Db/Perks/VenuePerks');

var OrganizationRoles = require('../Classes/OrganizationRoles');



function addVenue(request,reply) {

    try {

        var venue = new Venue(request.payload);
        venue.venueOnBoard(function(success_data){

            reply(success_data).code(success_data.status_code);
        },function(error_data){

            reply(error_data).code(error_data.status_code);
        });
    }catch (err) {

        reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}

function addGroup(request,reply) {
    
        try {
    
            request.payload.parent_id=-1;
            
            var venue = new Venue(request.payload);
            venue.groupOnBoard(function(success_data){
    
                reply(success_data).code(success_data.status_code);
            },function(error_data){
    
                reply(error_data).code(error_data.status_code);
            });
        }catch (err) {
    
            reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
        }
}

function assignUserToVenue( request , reply ) {

    try {

        var venue = new Venue(request.payload);

        venue.assignUserToVenue(function(success_data){

            reply(success_data).code(success_data.status_code);
        },function(error_data){

            reply(error_data).code(error_data.status_code);
        });
    }catch (err) {

        reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}


function removeUserFromVenue( request , reply ) {

    try {

        var venue = new Venue(request.payload);

        venue.removeUserFromVenue(function(success_data){

            reply(success_data).code(success_data.status_code);
        },function(error_data){

            reply(error_data).code(error_data.status_code);
        });
    }catch (err) {

        reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}

function addVenueSocialMediaMapping( request ,reply ) {

    try {

        var venue_social_media = new VenueSocialMediaMapping(request.payload);

        venue_social_media.createRecord(function(success_data){

            reply(success_data).code(success_data.status_code);
        },function(error_data){

            reply(error_data).code(error_data.status_code);
        })
    }catch ( err ) {

        reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}


function removeVenueSocialMediaMapping( request ,reply ) {
    
        try {
    
            var venue_social_media = new VenueSocialMediaMapping(request.payload);
    
            venue_social_media.deleteEntry(function(success_data){
    
                reply(success_data).code(success_data.status_code);
            },function(error_data){
    
                reply(error_data).code(error_data.status_code);
            })
        }catch ( err ) {
    
            reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
        }
}



function getTwitterRequestToken( request ,reply ) {

    try {

        var venue_social_media = new VenueSocialMediaMapping(request.payload);

        venue_social_media.getTwitterRequestToken(function(success_data){

            reply(success_data).code(success_data.status_code);
        },function(error_data){

            reply(error_data).code(error_data.status_code);
        })
    }catch ( err ) {

        reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}


function getTwitterAccessToken( request ,reply ) {

    try {

        var venue_social_media = new VenueSocialMediaMapping(request.payload);

        venue_social_media.getTwitterAccessToken(function(success_data){

            reply(success_data).code(success_data.status_code);
        },function(error_data){

            reply(error_data).code(error_data.status_code);
        })
    }catch ( err ) {

        reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}


function updateVenueSocialMediaMapping( request ,reply ) {

    try {

        var venue_social_media = new VenueSocialMediaMapping(request.payload);

        venue_social_media.updateRecord(function(success_data){

            reply(success_data).code(success_data.status_code);
        },function(error_data){

            reply(error_data).code(error_data.status_code);
        })
    }catch ( err ) {

        reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}

function getVenueSocialMediaMapping( request ,reply ) {

    try {

        var venue_social_media = new VenueSocialMediaMapping(request.payload);

        venue_social_media.getAllSocialMediaDetailsForVenue(function(success_data){

            reply(success_data).code(success_data.status_code);
        },function(error_data){

            reply(error_data).code(error_data.status_code);
        })
    }catch ( err ) {

        reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}

function updateBlackBoard( request ,reply ) {

    try {

        var venue = new Venue(request.payload);

        venue.updateBlackBoard(function(success_data){

            reply(success_data).code(success_data.status_code);
        },function(error_data){

            reply(error_data).code(error_data.status_code);
        })
    }catch ( err ) {

        reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}


function getBlackBoard( request ,reply ) {

    try {

        var venue = new Venue(request.payload);

        venue.getBlackBoard(function(success_data){

            reply(success_data).code(success_data.status_code);
        },function(error_data){

            reply(error_data).code(error_data.status_code);
        })
    }catch ( err ) {

        reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}



function getCustomersForVenue( request ,reply ) {

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




function getInVenueCustomersForVenue( request ,reply ) {

    try {

        var customer = new CustomerDetailsView(request.payload);

        customer.getInVenueCustomersForVenue(function(success_data){

            reply(success_data).code(success_data.status_code);
        },function(error_data){

            reply(error_data).code(error_data.status_code);
        })
    }catch ( err ) {

        reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}


function checkedIn( request ,reply ) {

    try {

        var customer = new VenueCustomerMapping(request.payload);

        customer.checkedIn(function(success_data){

            reply(success_data).code(success_data.status_code);
        },function(error_data){

            reply(error_data).code(error_data.status_code);
        })
    }catch ( err ) {

        reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}


//Make user


function banUser( request ,reply  ) {


    try {

        var customer = new VenueCustomerMapping(request.payload);

        customer.makeCustomerBanned(function(success_data){

            reply(success_data).code(success_data.status_code);
        },function(error_data){

            reply(error_data).code(error_data.status_code);
        })
    }catch ( err ) {

        reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }

}


function venueNoteUser( request ,reply  ) {


    try {

        var customer = new VenueCustomerMapping(request.payload);

        customer.addVenueNote(function(success_data){

            reply(success_data).code(success_data.status_code);
        },function(error_data){

            reply(error_data).code(error_data.status_code);
        })
    }catch ( err ) {

        reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }

}



function favouriteUser( request ,reply  ) {


    try {

        var customer = new VenueCustomerMapping(request.payload);

        customer.makeCustomerFavourite(function(success_data){

            reply(success_data).code(success_data.status_code);
        },function(error_data){

            reply(error_data).code(error_data.status_code);
        })
    }catch ( err ) {

        reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }

}




function updateVenue( request ,reply ) {

    try {

        console.log("request.payload: ", request.payload);

        var venue = new Venue(request.payload);

        console.log("venue.open_on: ", venue.is_grouping_feature);
        venue.updateVenue(function(success_data){

            reply(success_data).code(success_data.status_code);
        },function(error_data){

            reply(error_data).code(error_data.status_code);
        });
    }catch ( err ) {

        reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}


function getVenue( request ,reply ) {

    try {

        var venue = new VenueDetailsView(request.payload);
        venue.getVenueDetails(function(success_data){

            reply(success_data).code(success_data.status_code);
        },function(error_data){

            reply(error_data).code(error_data.status_code);
        });
    }catch ( err ) {

        reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}


function getVenueTVStatus( request ,reply ) {

    try {

        var venue = new VenueDetailsView(request.payload);
        venue.getVenueTVStatus(function(success_data){

            reply(success_data).code(success_data.status_code);
        },function(error_data){

            reply(error_data).code(error_data.status_code);
        });
    }catch ( err ) {

        reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}

function getVenueRoles( request ,reply ) {

    try {

        console.log('Organization ROles', request.payload);
        var organizationRoles = new OrganizationRoles(request.payload);
        organizationRoles.getVenueUserRoles(function(success_data){

            reply(success_data).code(success_data.status_code);
        },function(error_data){

            reply(error_data).code(error_data.status_code);
        });
    }catch ( err ) {

        reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}


function removeCheckedInUser( request ,reply ) {

    try {

        console.log('Organization ROles', request.payload);
        var venueCustomerMapping = new VenueCustomerMapping(request.payload);
        venueCustomerMapping.removeCheckedInUser(function(success_data){

            reply(success_data).code(success_data.status_code);
        },function(error_data){

            reply(error_data).code(error_data.status_code);
        });
    }catch ( err ) {

        reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}


function getVenueList( request ,reply ) {

    try {

        var venue = new VenueDetailsView({});
        venue.getAllVenues(function(success_data){

            reply(success_data).code(success_data.status_code);
        },function(error_data){

            reply(error_data).code(error_data.status_code);
        });
    }catch ( err ) {

        reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}


function sendPerk( request ,reply ) {

    try {

        var payload = {
            id : request.payload.venue_perk_id,
            venue_id : request.payload.venue_id,
            user_ids : (request.payload.user_ids) ? JSON.parse(request.payload.user_ids) : null
        };

        var venuePerks = new VenuePerks(payload);

        venuePerks.createPerkReplica(function(success_data){

            reply(success_data);

            console.log("SEND PERK success_data: ", success_data);

        }, function(error_data){

            reply(error_data);
            console.log("SEND PERK error_data: ", error_data);
        });

    }catch ( err ) {

        reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}

function getGroupOrganizationList( request ,reply ) {

    try {

        var venue = new Venue({});
        venue.getGroupOrganizationList(function(success_data){

            reply(success_data).code(success_data.status_code);
        },function(error_data){

            reply(error_data).code(error_data.status_code);
        });
    }catch ( err ) {

        reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
    }
}

function getVenueByBeacon( request ,reply ) {
    
        try {
    
            console.log("request.payload: ", request.payload);
    
            var venue = new Venue(request.payload);
    
            venue.getVenueByBeacon(function(success_data){
    
                reply(success_data).code(success_data.status_code);
            },function(error_data){
    
                reply(error_data).code(error_data.status_code);
            });
        }catch ( err ) {
    
            reply( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR)).code(status_codes.INTERNAL_SERVER_ERROR);
        }
    }


exports.addVenue = addVenue;
exports.addGroup = addGroup;

exports.getVenue = getVenue;
exports.getVenueRoles = getVenueRoles;
exports.updateVenue = updateVenue;
exports.assignUserToVenue = assignUserToVenue;
exports.removeUserFromVenue = removeUserFromVenue;



exports.addVenueSocialMediaMapping = addVenueSocialMediaMapping;
exports.removeVenueSocialMediaMapping = removeVenueSocialMediaMapping;

exports.getVenueSocialMediaMapping = getVenueSocialMediaMapping;
exports.updateVenueSocialMediaMapping = updateVenueSocialMediaMapping;
exports.getTwitterRequestToken = getTwitterRequestToken;
exports.getTwitterAccessToken = getTwitterAccessToken;

exports.updateBlackBoard = updateBlackBoard;
exports.getBlackBoard = getBlackBoard;
exports.getVenueTVStatus = getVenueTVStatus;


exports.getCustomersForVenue = getCustomersForVenue;
exports.getInVenueCustomersForVenue = getInVenueCustomersForVenue;
exports.checkedIn = checkedIn;



//Make User
exports.banUser = banUser;
exports.favouriteUser = favouriteUser;
exports.venueNoteUser = venueNoteUser;
exports.getVenueByBeacon = getVenueByBeacon;


exports.removeCheckedInUser = removeCheckedInUser;
exports.getVenueList = getVenueList;
exports.getGroupOrganizationList = getGroupOrganizationList;
exports.sendPerk = sendPerk;