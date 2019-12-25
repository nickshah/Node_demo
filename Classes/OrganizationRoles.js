'use strict';

var Response = require('./Util/Response');
var EmailEvents = require('./Util/EmailEvents');
var CallApi = require('./Util/CallApi');

var PendingEmails = require('./Db/PendingEmails');


class OrganizationRoles{

    constructor( data ) {

        this.get_venue_user_roles_url = config.util.user_management_url + 'organization/list-users';

        //Attributes
        this.organization_id = data.venue_id != undefined ? data.venue_id : null ;
    }

    getVenueUserRoles( success , error ) {

        try {

            var data = {
                organization_id: this.organization_id
            };

            var api_call = new CallApi( "POST" , this.get_venue_user_roles_url , data  );

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

}

module.exports = OrganizationRoles;