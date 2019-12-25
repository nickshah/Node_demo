"use strict";

var validations = require('../validations');
var TvAppController = require('../Controllers/TvAppController');
var ServerDetails = require('../config/server_details');


var LoginController = require('../Controllers/LoginController');

module.exports = function() {
    return [
        {
            method: 'POST',
            path: ServerDetails.env+'/live/tv/login',
            config: {
                auth : false,
                validate : validations.tv_app_validations.login,
                handler: LoginController.login
            }
        },

        {
            method: 'POST',
            path: ServerDetails.env+'/live/tv/metadata',
            config: {
                auth : "jwt",
                validate : validations.tv_app_validations.get_metadata,
                handler: TvAppController.getMetaDataForVenue
            }
        },

        //    Feeds
        {
            method: 'POST',
            path: ServerDetails.env+'/live/tv/feeds',
            config: {
                auth : "jwt",
                validate : validations.tv_app_validations.get_feeds,
                handler: TvAppController.getFeedsForVenue
            }
        },

        //    Banners
        {
            method: 'POST',
            path: ServerDetails.env+'/live/tv/banners',
            config: {
                auth : "jwt",
                validate : validations.tv_app_validations.get_banners,
                handler: TvAppController.getBannersForVenue
            }
        },

        //    fame users
        {
            method: 'POST',
            path: ServerDetails.env+'/live/tv/fameusers',
            config: {
                auth : "jwt",
                validate : validations.tv_app_validations.get_fame_user,
                handler: TvAppController.fameUsersForVenue
            }
        },

        //    Blackboard
        {
            method: 'POST',
            path: ServerDetails.env+'/live/tv/blackboard',
            config: {
                auth : "jwt",
                validate : validations.tv_app_validations.get_black_board,
                handler: TvAppController.getBlackBoardForVenue
            }
        },


        //    Blackboard
        {
            method: 'POST',
            path: ServerDetails.env+'/live/tv/screen-content',
            config: {
                auth : false,
                validate : validations.tv_app_validations.get_screen_content,
                handler: TvAppController.getScreenContent
            }
        }
    ];
}();