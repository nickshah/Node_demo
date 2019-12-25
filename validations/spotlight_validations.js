'use strict';

var Joi = require('joi');

module.exports = function() {
    return  {

        get_spotlight : {
            payload : {
                'page' : Joi.number().required(),
                'venue_id' : Joi.number().required()
            }
        },

        create_spotlight : {
            payload:{

                title : Joi.string().required(),
                description : Joi.string(),
                type : Joi.string().required().valid('FLASH OFFER','CREATIVE','EVENT','SPECIAL','TAGTV CREATIVE','TAGVIDEO CREATIVE'),
                venue_id : Joi.number().required(),
                published_start_date_time : Joi.number().required(),
                published_end_date_time : Joi.number().required(),
                event_start_date : Joi.number(),
                event_end_date : Joi.number(),
                event_start_time : Joi.number(),
                event_end_time : Joi.number(),
                active_day_string : Joi.string(),
                is_recurring : Joi.number(),
                venue_user_creator_id : Joi.number().required(),
                fb : Joi.number(),
                twt : Joi.number(),
                ig : Joi.number(),
                'image' : Joi.any()
            }
        },

        request_spotlight : {
            payload : {
                'venue_id': Joi.number().required(),
                'creator_id': Joi.number().required(),
                'requester_id': Joi.number().required(),
                'message': Joi.string().required()
            }
        },


        get_requested_spotlight : {
            payload : {
                'venue_id': Joi.number().required(),
                'creator_id': Joi.number().required()
            }
        },

        approve_spotlight : {
            payload:{
                'id' : Joi.number().required()
            }
        },

        reject_spotlight : {
            payload:{
                'id' : Joi.number().required(),
                'rejected_reason' : Joi.string().required(),
                'type' : Joi.string().required().valid('PENDING','PUBLISHED')
            }
        },

        get_spotlight_for_creator : {
            payload : {
                'page' : Joi.number().required(),
                'venue_id' : Joi.number().required(),
                'creator_id' : Joi.number().required()
            }
        }



    };
}();


