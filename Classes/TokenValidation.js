'use strict';

var Rbac = require('../rbac');
var dbDetails = require('../config/db_details');
var ServerDetails = require('../config/server_details');

class TokenValidation{

    //Here use rbac for validating token
    static validateToken(decoded,request,callback) {

        try {
            console.log("URI: ", request.connection.info.host);
            console.log("URL: ", request.url.path.substr(ServerDetails.env.length, request.url.path.length));

            var api_end_point = request.url.path.substr(ServerDetails.env.length, request.url.path.length);

            var rbac_checking_data = {
                'role_id': decoded.role_id,
                'organization_group': decoded.organization_group,
                feature_name: api_end_point
            };

            console.log("Rback checking", rbac_checking_data);

            var rbac = new Rbac(dbDetails.rbac_database, dbDetails.username, dbDetails.password, dbDetails.host);

            rbac.connectedToDatabase(function (is_connected) {

                if (is_connected) {

                    rbac.checkValidRole(rbac_checking_data, function (data) {


                        console.log(data);
                        callback(null, data.is_success);
                    }, function (error_data) {


                        console.log("I am here",error_data);

                        return callback(null, false);
                    });
                }
            }, function (error_data) {

                callback(null, false);
            });
        }catch (err) {



            console.log(err.message);
        }
    }


    static responseFunction(request,reply) {
        
                try {
                    console.log("##################################",request.response);
                    reply.continue();
                }
                catch(err){

                }
    }
}

module.exports = TokenValidation;