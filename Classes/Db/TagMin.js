'use strict';

var Response = require('../Util/Response');


class TagMin {

    constructor(data) {

        //Models to use
        this.models = server._plugins['hapi-sequelize'].new_tagloy.models.tagmin;

        //Attributes
        this.id =  data.id != undefined ? data.id : null ;
        this.venue_id = data.venue_id != undefined ? data.venue_id : null ;
        this.type = data.type != undefined ? data.type : "IMAGE" ;
        this.media_url = data.media_url != undefined ? data.media_url : "IMAGE" ;
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

    getRecordsForVenue(success,error) {

        try {


            this.models.getEntriesForVenue(this, function (response_data) {

                success(response_data);
            }, function (error_data) {

                error(error_data);
            });
        }catch (err) {

            error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));

        }
    };


    deleteRecord( success , error  ) {

        try {

            this.models.deleteEntry(this, function (response_data) {

                success(response_data);
            }, function (error_data) {

                error(error_data);
            });
        }catch (err) {

            error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
        }
    }

}

module.exports = TagMin;