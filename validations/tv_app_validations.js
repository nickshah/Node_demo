'use strict';

var Joi = require('joi');

module.exports = function() {
    return  {

        login : {
            payload:{
                email : Joi.string().required(),
                password : Joi.string().required(),
                organization_id : Joi.number()
            }
        },


        get_metadata : {
            payload : {
                venue_id : Joi.number().required(),
                timestamp : Joi.number().required()
            }
        },



        get_banners : {
            payload : {
                venue_id : Joi.number().required(),
                timestamp : Joi.number().required()
            }
        },


        get_feeds : {
            payload: {
                venue_id: Joi.number().required(),
                timestamp: Joi.number().required(),
                page: Joi.number()
            }
        },


        get_fame_user : {
            payload : {
                venue_id : Joi.number().required(),
                timestamp : Joi.number().required()
            }
        },


        get_black_board : {
            payload : {
                venue_id : Joi.number().required(),
                timestamp : Joi.number().required()
            }
        },

        get_screen_content : {
            payload : {
                venue_id : Joi.number().required(),
                screen_type : Joi.number().required().valid('TAGMIN', 'TAGTRADE', 'TAGBIZ', 'MAINSCREEN'),
                timestamp : Joi.number().required()
            }
        }
    };
}();


