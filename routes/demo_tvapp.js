"use strict";

var validations = require('../validations');
var TvAppController = require('../Controllers/DemoTvAppController');
var ServerDetails = require('../config/server_details');


module.exports = function() {
    return [

        //    Login
        {
            method: 'POST',
            path: ServerDetails.env+'/tv/login',
            config: {
                auth : "jwt",
                validate : validations.tv_app_validations.login,
                handler: TvAppController.login
            }
        },

        {
            method: 'POST',
            path: ServerDetails.env+'/tv/metadata',
            config: {
                auth : "jwt",
                validate : validations.tv_app_validations.get_metadata,
                handler: TvAppController.getMetaDataForVenue
            }
        },



        //    Feeds
        {
            method: 'POST',
            path: ServerDetails.env+'/tv/feeds',
            config: {
                auth : "jwt",
                validate : validations.tv_app_validations.get_feeds,
                handler: TvAppController.getFeedsForVenue
            }
        },


        //    Banners
        {
            method: 'POST',
            path: ServerDetails.env+'/tv/banners',
            config: {
                auth : "jwt",
                validate : validations.tv_app_validations.get_banners,
                handler: TvAppController.getBannersForVenue
            }
        },

        //    fame users

        {
            method: 'POST',
            path: ServerDetails.env+'/tv/fameusers',
            config: {
                auth : "jwt",
                validate : validations.tv_app_validations.get_fame_user,
                handler: TvAppController.fameUsersForVenue
            }
        },

        //    Blackboard

        {
            method: 'POST',
            path: ServerDetails.env+'/tv/blackboard',
            config: {
                auth : "jwt",
                validate : validations.tv_app_validations.get_black_board,
                handler: TvAppController.getBlackBoardForVenue
            }
        }


    ];
}();

//
//exports.login = login;
//exports.getMetaDataForVenue = getMetaDataForVenue;
//exports.getBannersForVenue = getBannersForVenue;
//exports.getBlackBoardForVenue = getBlackBoardForVenue;
//exports.getFeedsForVenue = feedsForVenue;
//exports.fameUsersForVenue = fameUsersForVenue;