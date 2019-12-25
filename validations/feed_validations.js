'use strict';

var Joi = require('joi');

module.exports = function() {
    return  {


        get_feeds : {
            payload:{
                'page' : Joi.number().required(),
                'venue_id' : Joi.number().required()
            }
        },

        get_feeds_trail : {
            payload:{
                'page' : Joi.number().required(),
                'customer_id' : Joi.number().required(),
                'venue_id' : Joi.number().required()
            }
        },



        bookmarked_feed : {
            payload : {
                'id' : Joi.number().required(),
            }
        },


        marked_as_celebration : {
            payload : {
                'id' : Joi.number().required(),
            }
        },
        approve_feed : {
            payload:{
                'id' : Joi.number().required(),
                'type' : Joi.string().required().valid('PENDING','HISTORICAL')
            }
        },

        reject_feed : {
            payload:{
                'id' : Joi.number().required(),
                'rejected_reason' : Joi.string().required(),
                'type' : Joi.string().required().valid('PENDING','PUBLISHED')

            }
        },


        search  : {
            payload : {
                'term' : Joi.string().required(),
                'type' : Joi.string().required().valid('PENDING', 'PUBLISHED' ,'HISTORICAL')
            }
        },

        get_feed_count : {
            payload:{
                'timestamp' : Joi.number().required(),
                'venue_id' : Joi.number().required()
            }
        },

        feed_comment : {
            payload : {
                'media_id' : Joi.string().required(),
                'venue_id' : Joi.number().required(),
                'text' : Joi.string().required()
            }
        }

    };
}();


