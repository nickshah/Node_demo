'use strict';

var Response = require('./Util/Response');
var CallApi = require('./Util/CallApi');

var PendingEmails = require('./Db/PendingEmails');


class SystemRoles{

    constructor( data ) {

        this.create_role_url = config.util.user_management_url + 'role/create';
        this.updatee_role_url = config.util.user_management_url + 'role/update';
        this.delete_role_url = config.util.user_management_url + 'role/delete';
        this.get_role_url = config.util.user_management_url + 'role';

        //Attributes

        this.name = data.name != undefined ? data.name : null ;
        this.id = data.id != undefined ? data.id : null ;
        this.is_active = data.is_active != undefined ? data.is_active : null ;
    }

    createRole( success , error ) {

        try {

            var data = {
                name: this.name,
                is_active: this.is_active
            };

            var api_call = new CallApi( "POST" , this.create_role_url , data  );

            api_call.makeRequest(function( success_data ){
                success(success_data);
            },function(error_data){

                error(error_data);
            });
        }catch (err) {

            console.log(err.message);

            error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
        }
    };

    updateRole( success , error  ) {

        try {

            var data = {
                name: this.name,
                is_active: this.is_active,
                id: this.id
            };

            var api_call = new CallApi( "POST" , this.updatee_role_url , data  );
            api_call.makeRequest(function( success_data ){

                success(success_data);
            },function(error_data){

                error(error_data);
            });

        }catch (err) {

            error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
        }
    };

    deleteRole( success , error ) {

        try {

            var data = {
                id: this.id
            };

            var api_call = new CallApi( "POST" , this.delete_role_url , data  );
            api_call.makeRequest(function( success_data ){

                success(success_data);
            },function(error_data){

                error(error_data);
            });
        }catch (err) {

            error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
        }
    };


    getAllRoles ( success , error ) {

        try {

            var data = {};

            var api_call = new CallApi( "GET" , this.get_role_url , data  );
            api_call.makeRequest(function( success_data ){

                success(success_data);
            },function(error_data){

                error(error_data);
            });
        }catch (err) {

            error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
        }
    }
}

module.exports = SystemRoles;