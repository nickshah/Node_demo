'use strict';

var Response = require('../../Util/Response');


class FeedImages {

    constructor(data,model) {


        if( model != null )
            this.models = model.spotlight_request;
        else
            this.models = server._plugins['hapi-sequelize'].new_tagloy.models.spotlight_request;


        this.id =  data.id != undefined ? data.id : null ;
        this.venue_id	 = data.venue_id	 != undefined ? data.venue_id	 : null ;
        this.requester_id	 = data.requester_id	 != undefined ? data.requester_id	 : null ;
        this.creator_id	 = data.creator_id	 != undefined ? data.creator_id	 : null ;
        this.message	 = data.message	 != undefined ? data.message	 : null ;
        this.status	 = data.status	 != undefined ? data.status	 : null ;
        this.timestamp	 = data.timestamp	 != undefined ? data.timestamp	 : null ;
    }

//    Write the getters and setter here


    createRecord(success,error) {

        this.models.createEntry(this,function(response_data){

            success(response_data);
        },function(error_data){

            error(error_data);
        });
    };

//    Actual operations

    getRecordsForCreator( success , error ) {


        try{

            this.models.getEntries(this,function(success_data){

                success(success_data);
            },function(error_data){

                error(error_data);
            })
        }catch (err) {

            error( Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR) );
        }
    }
}


module.exports = FeedImages;