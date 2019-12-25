'use strict';

var Joi = require('joi');

module.exports = function() {
    return  {

        create_feature : {
            payload:{
                name : Joi.string().required(),
                type : Joi.string().required().valid('API','UI')
            }
        },

        delete_feature : {
            payload : {
                id : Joi.number().required()
            }
        },

        createRoleFeatureMapping : {
            payload:{
                organization_group : Joi.string().required(),
                role_id : Joi.number().required(),
                feature_id : Joi.number().required()
            }
        }

    };
}();


