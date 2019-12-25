"use strict";

var validations = require('../validations');
var UtilController = require('../Controllers/UtilController');
var ServerDetails = require('../config/server_details');


console.log(UtilController);

module.exports = function() {
    return [

        //Login
        {
            method: 'GET',
            path: ServerDetails.env+'/test',
            config: {
                auth : "jwt",
                handler: UtilController.test
            }
        },

        {
            method: 'GET',
            path: ServerDetails.env+'/instagram/callback',
            config: {
                auth : "jwt",
                handler: UtilController.instagram
            }
        }


    ];
}();

