"use strict";

var validations = require('../validations');
var PerksController = require('../Controllers/PerksController');
var ServerDetails = require('../config/server_details');


module.exports = function() {
    return [

    /**
     * @api {POST}  /v1/perks  Perks  : Get Perks for venue
     * @apiName Get Perks for venue
     * @apiGroup Perks
     * @apiDescription Get Perks for venue
     * @apiHeader {String} Authorization
     * @apiParam {Number} venue_id
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
     * }
     * @apiUse ErrorResponseFormat
     * */
        {
            method: 'POST',
            path: ServerDetails.env+'/perks',
            config: {
                auth : "jwt",
                validate : validations.perks_validations.get_perks,
                handler: PerksController.getPerksForVenue
            }
        },


    /**
     * @api {POST}  /v1/perk/custom  Perks  : Get Custom Perk for venue
     * @apiName Get Custom Perk for venue
     * @apiGroup Perks
     * @apiDescription Get Custom Perk for venue
     * @apiHeader {String} Authorization
     * @apiParam {Number} venue_id
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
     * }
     * @apiUse ErrorResponseFormat
     * */
        {
            method: 'POST',
            path: ServerDetails.env+'/perk/custom',
            config: {
                auth : "jwt",
                validate : validations.perks_validations.get_perks,
                handler: PerksController.getCustomPerksForVenue
            }
        },


        /*
         'id' : Joi.number().required(),
         'venue_id' : Joi.number().required(),
         'name' : Joi.string().required(),
         'type' : Joi.number().required(),
         'offer_type' : Joi.number().required(),
         'description' : Joi.string().required(),
         'amount' : Joi.number().required(),
         'tag_count' : Joi.number().required(),
         'check_in_count' : Joi.number().required(),
         'valid_on' : Joi.string().required(),
         'f_start_time' : Joi.string().required(),
         'f_end_time' : Joi.string().required(),
         's_start_time' : Joi.string().required(),
         's_end_time' : Joi.string().required(),
         'message' : Joi.string().required(),
         'sponsorer' : Joi.string().required(),
         'terms' : Joi.string().required(),
         'is_enabled' : Joi.string().required()
         */

    /**
     * @api {POST}  /v1/perk/update  Perks  : Update perk
     * @apiName Update perk
     * @apiGroup Perks
     * @apiDescription Update perk
     * @apiHeader {String} Authorization
     * @apiParam {Number} id
     * @apiParam {Number} venue_id
     * @apiParam {String} name
     * @apiParam {Number} type
     * @apiParam {Number} offer_type
     * @apiParam {String} description
     * @apiParam {Number} amount
     * @apiParam {Number} expiry
     * @apiParam {Number} check_in_count
     * @apiParam {Number} tag_count
     * @apiParam {Number} tag_count
     * @apiParam {String} f_start_time '01:00:00' in this format
     * @apiParam {String} f_end_time '01:00:00' in this format
     * @apiParam {String} s_start_time '01:00:00' in this format
     * @apiParam {String} s_end_time '01:00:00' in this format
     * @apiParam {String} message
     * @apiParam {String} sponsorer
     * @apiParam {String} terms
     * @apiParam {Number} is_enabled
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
     * }
     * @apiUse ErrorResponseFormat
     * */
        {
            method: 'POST',
            path: ServerDetails.env+'/perk/update',
            config: {
                auth : "jwt",
                validate : validations.perks_validations.update_perk,
                handler: PerksController.updatePerk
            }
        },

        {
            method: 'POST',
            path: ServerDetails.env+'/perk/report',
            config: {
                auth : "jwt",
                validate : validations.perks_validations.perk_report,
                handler: PerksController.getPerkReport
            }
        },


        {
            method: 'POST',
            path: ServerDetails.env+'/perk/report/excel',
            config: {
                auth : "jwt",
                validate : validations.perks_validations.perk_report,
                handler: PerksController.getPerkReportExcel
            }
        },

        //Scheduler
        {
            method: 'GET',
            path: ServerDetails.env+'/perk/calculatemonthlyperk',
            config: {
                auth : "jwt",
                handler: PerksController.calculateMonthlyPerks
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