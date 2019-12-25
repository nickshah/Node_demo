'use strict';

var Joi = require('joi');

module.exports = function() {
    return  {

        image_upload : {
            payload:{
                'image' : Joi.any().required()
            }
        }
    };
}();


