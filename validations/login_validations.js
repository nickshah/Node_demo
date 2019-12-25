'use strict';

var Joi = require('joi');

module.exports = function() {
    return  {

        login : {
            payload:{
                email : Joi.string().required(),
                password : Joi.string().required(),
                organization_id : Joi.number(),
                host_name : Joi.string()
            }
        },

        verify_email : {
            payload:{
                encrypted_user_id : Joi.string().required(),
                token : Joi.string().required(),
                password : Joi.string()
            }
        },

        forgot_password : {
            payload:{
                email : Joi.string().required()
            }
        },

        update_password : {
            payload:{
                encrypted_user_id : Joi.string().required(),
                token : Joi.string().required(),
                password : Joi.string().required()
            }
        }


    };
}();


