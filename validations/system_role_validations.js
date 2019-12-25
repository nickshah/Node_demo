'use strict';

var Joi = require('joi');

module.exports = function() {
    return  {

        create_api : {
            payload:{
                name : Joi.string().required(),
                is_active : Joi.number().required()
            }
        },

        update_api : {
            payload: {
                name: Joi.string().required(),
                is_active: Joi.number().required(),
                id: Joi.number().required()
            }
        },

        delete_api : {
            payload: {
                id: Joi.number().required()
            }
        }
    };
}();
