'use strict';

var Response = require('../../Util/Response');

class HistoricalSpotlights {

    constructor(data,model) {

        if( model != null )
            this.models = model.historical_spotlight;
        else
            this.models = server._plugins['hapi-sequelize'].new_tagloy.models.historical_spotlight;

        this.id =  data.id != undefined ? data.id : null ;
        this.spotlight_id =  data.spotlight_id != undefined ? data.spotlight_id : null ;
        this.title = data.title != undefined ? data.title : null;
        this.status = data.status != undefined ? data.status : null;
        this.rejected_reason	 = data.rejected_reason != undefined ? data.rejected_reason : null;
        this.parent_spotlight_id	 = data.parent_spotlight_id != undefined ? data.parent_spotlight_id : null;
        this.description = data.description != undefined ? data.description : null;
        this.type = data.type != undefined ? data.type : null;
        this.venue_id = data.venue_id != undefined ? data.venue_id : null ;
        this.published_start_date_time = data.published_start_date_time != undefined ? data.published_start_date_time : null;
        this.published_end_date_time = data.published_end_date_time != undefined ? data.published_end_date_time : null;
        this.event_start_date = data.event_start_date != undefined ? data.event_start_date : null;
        this.event_end_date = data.event_end_date != undefined ? data.event_end_date : null;
        this.event_start_time = data.event_start_time != undefined ? data.event_start_time : null;
        this.event_end_time = data.event_end_time != undefined ? data.event_end_time : null;
        this.active_day_string = data.active_day_string != undefined ? data.active_day_string : null;
        this.is_recurring = data.is_recurring != undefined ? data.is_recurring : null;
        this.venue_user_creator_id = data.venue_user_creator_id != undefined ? data.venue_user_creator_id : null;
        this.venue_user_moderator_id = data.venue_user_moderator_id != undefined ? data.venue_user_moderator_id : null;
        this.fb = data.fb != undefined ? data.fb : 0;
        this.twt = data.twt != undefined ? data.twt : 0;
        this.ig = data.ig != undefined ? data.ig : 0;
    }

//    Write the getters and setter here

//    Actual operations


    createRecord( success , error ) {

        try {
            this.models.createEntry(this,function(success_data){

                console.log("success");

                success(success_data);
            },function(error_data){


                error(error_data);
            });
        }catch (err) {

            //console.log(err.message);
            error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
        }
    }
}


module.exports = HistoricalSpotlights;