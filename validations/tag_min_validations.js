'use strict';

var Joi = require('joi');

module.exports = function() {
    return  {

        create_entry : {
            payload:{
                'media' : Joi.any().required(),
                'venue_id' : Joi.number().required(),
                'type' : Joi.string().required().valid('IMAGE','VIDEO','GIF','BANNER')
            }
        },


        get_entries : {
            payload:{
                'venue_id' : Joi.number().required()
            }
        },

        delete_entry : {
            payload:{
                'id' : Joi.number().required(),
            }
        }

    };
}();


