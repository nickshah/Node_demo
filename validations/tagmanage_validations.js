'use strict';

var Joi = require('joi');

module.exports = function() {
    return  {

        create_entry : {
            payload:{
                'slot' : Joi.string().required(),
                'title' : Joi.string().required(),
                'organization_id' : Joi.number().required(),
                'type' : Joi.string().required().valid('IMAGE','VIDEO'),
                'screen_type' : Joi.string().required().valid('TAGBIZ','TAGAPP','TAGTRADE','TAGMIN','MAINSCREEN'),
                'duration' : Joi.number().required(),
                'start_datetime' : Joi.string().required(),
                'end_datetime' : Joi.string().required(),
                'media' : Joi.any().required(),
                'extension' : Joi.string().required(),
                'force_create' : Joi.number().required()
            }
        },


        get_entries : {
            payload:{
                'organization_id' : Joi.number().required(),
                'screen_type' : Joi.string().required().valid('TAGBIZ','TAGAPP','TAGTRADE','TAGMIN','MAINSCREEN'),
                'slot' : Joi.string().required()
            }
        },

        get_live_entries : {
            payload:{
                'organization_id' : Joi.number().required(),
                'screen_type' : Joi.string().required().valid('TAGBIZ','TAGAPP','TAGTRADE','TAGMIN','MAINSCREEN'),
                'datetime' : Joi.string().required()
            }
        },

        get_liveAd_entries : {
            payload:{
                'organization_id' : Joi.number().required(),
                'screen_type' : Joi.string().required().valid('TAGAD','TAGMM'),
                'datetime' : Joi.string().required()
            }
        },

        delete_entry : {
            payload:{
                'id' : Joi.number().required(),
            }
        },

        update_entry : {
            payload:{
                'id' : Joi.number().required(),
                'slot' : Joi.string().required(),
                'title' : Joi.string().required(),
                'organization_id' : Joi.number().required(),
                'type' : Joi.string().required().valid('IMAGE','VIDEO'),
                'screen_type' : Joi.string().required().valid('TAGBIZ','TAGAPP','TAGTRADE','TAGMIN','MAINSCREEN'),
                'duration' : Joi.number().required(),
                'start_datetime' : Joi.string().required(),
                'end_datetime' : Joi.string().required(),
                'media' : Joi.any(),
                'extension' : Joi.string().required(),
                'force_create' : Joi.number().required()
            }
        }

    };
}();


