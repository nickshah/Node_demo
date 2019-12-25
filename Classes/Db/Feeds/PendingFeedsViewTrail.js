'use strict';

var Response = require('../../Util/Response');


class PendingFeedsViewTrail {

    constructor(data,model) {

        if( model != null )
            this.models = model.v_pending_feeds_trail;
        else
            this.models = server._plugins['hapi-sequelize'].new_tagloy.models.v_pending_feeds_trail;


        this.customer_id = data.customer_id != undefined ? data.customer_id : null ;
        this.venue_id = data.venue_id != undefined ? data.venue_id : null ;
        this.page = data.page != undefined ? data.page : null;
    }

    getFeedTrails( success , error  ) {

        try {

            console.log(this);

            this.models.getTrail( this , function( success_data ){

                success(success_data);
            },function(error_data){

                error(error_data);
            })
        }catch ( err ) {

            error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
        }
    }

}


module.exports = PendingFeedsViewTrail;