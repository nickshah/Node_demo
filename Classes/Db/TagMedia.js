'use strict';

var Response = require('../Util/Response');


class TagMedia {

    constructor(data) {

        //Models to use
        this.models = server._plugins['hapi-sequelize'].new_tagloy.models.tagmedia;

        //Attributes
        this.id =  data.id != undefined ? data.id : null ;
        this.organization_id = data.organization_id != undefined ? data.organization_id : null ;
        this.slot =  data.slot != undefined ? data.slot : null ;
        this.title =  data.title != undefined ? data.title : null ;
        this.duration =  data.duration != undefined ? data.duration : null ;
        this.screen_type =  data.screen_type != undefined ? data.screen_type : null ;
        this.type = data.type != undefined ? data.type : "IMAGE" ;
        this.media_url = data.media_url != undefined ? data.media_url : "IMAGE" ;
        this.start_datetime = data.start_datetime != undefined ? data.start_datetime : 0;
        this.end_datetime = data.end_datetime != undefined ? data.end_datetime : 0;
        this.extension = data.extension != undefined ? data.extension : '';
     
        this.datetime = data.datetime != undefined ? data.datetime : 0;
        this.force_create = data.force_create != undefined ? data.force_create : 0;
        
        

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

    getLiveRecordsForVenue(success,error) {
        
                try {
        
                    this.models.getLiveEntriesForVenue(this, function (response_data) {
        
                        success(response_data);
                    }, function (error_data) {
        
                        error(error_data);
                    });
                }catch (err) {
        
                    error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
        
                }
    };

    getLiveAdRecordsForVenue(success,error) {
        
        try {

            this.models.getLiveAdEntriesForVenue(this, function (response_data) {

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

    updateRecord( success , error  ) {
        
                try {

                    var update_data = {};

                    update_data.id = this.id;
                    
                    if(this.organization_id != null)
                        update_data.organization_id = this.organization_id;
                        
                    if(this.slot != null)    
                        update_data.slot =  this.slot;

                    if(this.title != null)    
                        update_data.title =  this.title;
    
                    if(this.duration != null)
                        update_data.duration =  this.duration;

                    if(this.screen_type != null)    
                        update_data.screen_type =  this.screen_type;
                    
                    if(this.type != 'IMAGE')    
                        update_data.type = this.type;

                    if(this.media_url != 'IMAGE')    
                        update_data.media_url = this.media_url;

                    if(this.start_datetime != 0)    
                        update_data.start_datetime = this.start_datetime;

                    if(this.end_datetime != 0)    
                        update_data.end_datetime = this.end_datetime;

                    if(this.extension != '')    
                        update_data.extension = this.extension;
                       
                    if(this.datetime != 0)    
                        update_data.datetime = this.datetime;

                    if(this.force_create != 0)    
                        update_data.force_create = this.force_create;

        
                    this.models.updateEntry(update_data, function (response_data) {
        
                        success(response_data);
                    }, function (error_data) {
        
                        error(error_data);
                    });
                }catch (err) {
        
                    error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
                }
    }

}

module.exports = TagMedia;