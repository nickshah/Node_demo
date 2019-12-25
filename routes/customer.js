"use strict";

var validations = require('../validations');
var VenueController = require('../Controllers/VenueController');
var CustomerController = require('../Controllers/CustomerController');
var PushNotificationController = require('../Controllers/PushNotificationController');

var ServerDetails = require('../config/server_details');

/**
 * @apiDefine ErrorResponseFormat
 * @apiErrorExample {json} Error-Response:
 * {
    "is_success": false,
    "result": null,
    "message": "Error message",
    "status_code": 400
 * }
 */

module.exports = function() {
    return [

        {
            method: 'POST',
            path: ServerDetails.env+'/customer/create',
            config: {
                auth : false,
                validate : validations.customer_validations.create,
                handler: CustomerController.createCustomer
            }
        },

        {
            method: 'POST',
            path: ServerDetails.env+'/customer/login',
            config: {
                auth : false,
                validate : validations.customer_validations.login,
                handler: CustomerController.loginCustomer
            }
        },

        {
            method: 'POST',
            path: ServerDetails.env+'/customer/nearbyvenues',
            config: {
                auth :  "jwt",
                validate : validations.customer_validations.get_nearby_venues,
                handler: CustomerController.getNearByVenues
            }
        },

        {
            method: 'POST',
            path: ServerDetails.env+'/customer/allcheckins',
            config: {
                auth :  "jwt",
                validate : validations.customer_validations.customer_info,
                handler: CustomerController.getCheckedInVenues
            }
        },


        {
            method: 'POST',
            path: ServerDetails.env+'/customer/perks',
            config: {
                auth :  "jwt",
                validate : validations.customer_validations.get_perks_for_customers,
                handler: CustomerController.getPerks
            }
        },

        {
            method: 'POST',
            path: ServerDetails.env+'/customer/getperk',
            config: {
                auth :  "jwt",
                validate : validations.customer_validations.get_single_perks_for_customers,
                handler: CustomerController.getSinglePerk
            }
        },


        {
            method: 'POST',
            path: ServerDetails.env+'/customer/perks/search',
            config: {
                auth :  "jwt",
                validate : validations.customer_validations.search_perks,
                handler: CustomerController.searchPerks
            }
        },


        {
            method: 'POST',
            path: ServerDetails.env+'/customer/venue/search',
            config: {
                auth :  "jwt",
                validate : validations.customer_validations.search_venue,
                handler: CustomerController.searchVenues
            }
        },

        {
            method: 'POST',
            path: ServerDetails.env+'/venue/customer/checkin',
            config: {
                auth :  "jwt",
                validate : validations.customer_validations.checked_in,
                handler: VenueController.checkedIn
            }
        },

        {
            method: 'POST',
            path: ServerDetails.env+'/venue/customer/details',
            config: {
                auth : "jwt",
                validate : validations.customer_validations.get_venue_details,
                handler: CustomerController.getVenueDetailsForCustomer
            }
        },

        {
            method: 'POST',
            path: ServerDetails.env+'/customer/social-media-mapping',
            config: {
                auth :  "jwt",
                validate : validations.customer_validations.social_media_mapping,
                handler: CustomerController.addCustomerSocialMediaMapping
            }
        },

        {
            method: 'POST',
            path: ServerDetails.env+'/customer/social-media-mapping-remove',
            config: {
                auth :  "jwt",
                validate : validations.customer_validations.social_media_mapping,
                handler: CustomerController.removeCustomerSocialMediaMapping
            }
        },

        {
            method: 'POST',
            path: ServerDetails.env+'/customer/stats',
            config: {
                auth : "jwt",
                validate : validations.customer_validations.customer_stats,
                handler: CustomerController.getCustomerStats
            }
        },

        {
            method: 'POST',
            path: ServerDetails.env+'/customer/qrcode',
            config: {
                auth : "jwt",
                validate : validations.customer_validations.qrcode,
                handler: CustomerController.getQRCode
            }
        },

        {
            method: 'POST',
            path: ServerDetails.env+'/customer/redeemPerk',
            config: {
                auth : "jwt",
                validate : validations.customer_validations.redeem,
                handler: CustomerController.redeemPerk
            }
        },

        {
            method: 'POST',
            path: ServerDetails.env+'/customer/updateFCMToken',
            config: {
                auth : "jwt",
                validate : validations.customer_validations.update_token,
                handler: PushNotificationController.updateFireBaseToken
            }
        },

        {
            method: 'GET',
            path: ServerDetails.env+'/customer/instagram',
            config: {
                auth : false,
                handler: CustomerController.redirectInstagram
            }
        },

        {
            method: 'POST',
            path: ServerDetails.env+'/customer/currentCheckins',
            config: {
                auth : "jwt",
                validate : validations.customer_validations.current_checkins,
                handler: CustomerController.getCurrentCheckIns
            }
        },

        {
            method: 'POST',
            path: ServerDetails.env+'/customer/get-profile',
            config: {
                auth : "jwt",
                validate : validations.customer_validations.get_profile,
                handler: CustomerController.getProfile
            }
        },

        {
            method: 'POST',
            path: ServerDetails.env+'/customer/getProfileForScanner',
            config: {
                auth : "jwt",
                validate : validations.customer_validations.get_profile_for_scanner,
                handler: CustomerController.getProfileForScanner
            }
        },

        {
            method: 'POST',
            path: ServerDetails.env+'/customer/update-profile',
            config: {
                auth : "jwt",
                validate : validations.customer_validations.update_profile,
                handler: CustomerController.updateProfile
            }
        },


        {
            method: 'POST',
            path: ServerDetails.env+'/customer/get-notification',
            config: {
                auth : "jwt",
                validate : validations.customer_validations.get_notification,
                handler: CustomerController.getCustomerNotification
            }
        }
    ];
}();