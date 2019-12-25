'use strict';

class PendingEmails {

    constructor(data) {

        //Models to use
        this.models = server._plugins['hapi-sequelize'].new_tagloy.models.pending_emails;

        //Attributes
        this.id =  data.id != undefined ? data.id : null ;
        this.name = data.name != undefined ? data.name : null ;
        this.organization_user_id = data.organization_user_id != undefined ? data.organization_user_id : null;
        this.organization_name = data.organization_name != undefined ? data.organization_name : null ;
        this.role_name = data.role_name != undefined ? data.role_name : null ;
        this.email = data.email != undefined ? data.email : null ;
    };


    createRecord(success,error) {

        try {

            this.models.createEntry(this, function (response_data) {

                success(response_data);
            }, function (error_data) {

                error(error_data);
            });
        }catch (err) {

            error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
        }
    };

    sendPendingEmails( success , error  ) {

        try {

            this.models.sendPendingEmails(this, function (response_data) {

                success(response_data);
            }, function (error_data) {

                error(error_data);
            });
        } catch (err) {

            console.log(err.message);

            error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
        }


    }

}

module.exports = PendingEmails;