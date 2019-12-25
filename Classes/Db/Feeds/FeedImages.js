'use strict';

var Response = require('../../Util/Response');


class FeedImages {

    constructor(data,model) {

        console.log(server._plugins['hapi-sequelize']);
        

        if( model != null )
            this.models = model.feed_images;
        else
            this.models = server._plugins['hapi-sequelize'].new_tagloy.models.feed_images;


        this.id =  data.id != undefined ? data.id : null ;
        this.feed_id = data.feed_id != undefined ? data.feed_id : null ;
        this.image = data.image != undefined ? data.image : null ;
        this.instagram_media_id = data.instagram_media_id != undefined ? data.instagram_media_id : null ;

    }

//    Write the getters and setter here


    createRecord(success,error) {

        this.models.createEntry(this,function(response_data){

           return  success(response_data);
        },function(error_data){

            return error(error_data);
        });
    };

    checkIfFeedPresent(success,error) {
        
        try {
            
            console.log("checking instagram_media_id present", this.instagram_media_id);
            
                this.models.getFeedInstagramId(this,function(success_data){
                        console.log("getFeedInstagramId success", success_data);
                    
                        success(success_data);
                },function(error_data){
            
                        error(error_data);
                })
        }catch ( err ) {
            
                error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
        }
    };


//    Actual operations

}


module.exports = FeedImages;