'use strict';

var Joi = require('joi');

module.exports = function() {
    return  {

        get_perks : {
            payload:{
                'venue_id' : Joi.number().required()
            }
        },

        perk_report : {
            payload:{
                'venue_id' : Joi.number().required(),
                'page' : Joi.number().required(),
                'limit' : Joi.number().required(),
                'month' : Joi.number().integer().min(1).max(12),
                'year' : Joi.number().integer(),
                'starttime' : Joi.number().integer(),
                'endtime' : Joi.number().integer(),
                'is_claimed' : Joi.string().required()
            }
        },

        update_perk : {
            payload:{
                'id' : Joi.number().required(),
                'venue_id' : Joi.number().required(),
                'name' : Joi.string().required(),
                'type' : Joi.number().required(),
                'offer_type' : Joi.number().required(),
                'description' : Joi.string().required(),
                'amount' : Joi.number().required(),
                'expiry' : Joi.number().required(),
                'tag_count' : Joi.number().required(),
                'check_in_count' : Joi.number().required(),
                'valid_on' : Joi.string(),
                'f_start_time' : Joi.string().required(),
                'f_end_time' : Joi.string().required(),
                's_start_time' : Joi.any(),
                's_end_time' : Joi.any(),
                'message' : Joi.string(),
                'sponsorer' : Joi.string(),
                'terms' : Joi.string(),
                'is_enabled' : Joi.string().required()
            }
        }


        //"id" , "name" , "type" , "description" , "amount" , "tag_count" , "valid_on" ,
        //"f_start_time" , "f_end_time" , "s_start_time" , "s_end_time" , "message",
        //"sponsorer" , "terms" , "is_enabled","venue_id"



    };
}();


