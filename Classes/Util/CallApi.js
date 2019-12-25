"use strict";

var Response = require('./Response');
var request = require('request');
var social_media_details = require('../../config/social_media_details');

class CallApi {

    constructor( method , url , data, headers  ) {

        console.log(data);
        this.method = (method != undefined) ? method : 'POST';
        this.url = (url != undefined) ? url : '';
        this.data = (data != undefined) ? data : null ;
        this.headers = (headers != undefined) ? headers : null ;
    }


    makeRequest(  success , error  ) {

        try {

            var instance = this;

            var options = {
                url: this.url,
                method: this.method
            };

            if(this.headers != null)
                options.headers = this.headers;

            if( this.method == "GET"  ) {

            } else if( this.method == "POST"  ) {

                options.form = this.data;
            }

            console.log("Make request changed");

            request( options , function( err , response , body ) {

                if( err  ) {
                    console.log('ERROR', err.message);
                    return error(Response.sendResponse(false,null,err.Error,500));
                } else {

                    console.log("inside else");
                    if(instance.url == social_media_details.twitter.twitter_authorize_url || instance.url == social_media_details.twitter.twitter_access_token_url)
                    {
                        var response = {
                            is_success : true,
                            message : "SUCCESS",
                            result : body,
                            status_code : 200
                        }
                        success(response);
                    }
                    else
                    {
                        
                        var response_data = JSON.parse(body);

                        
                        if(response_data.is_success == undefined){
                            console.log("response_data: ", response_data);
                            return success(response_data);
                        }
                        
                        if (response_data.is_success == true) {

                            return success(response_data);
                        }
                        
                        if(response_data.data){
                            console.log("Data: ", response_data);
                            return success(response_data);
                        } 
                        else {
                            console.log("Response"+ JSON.stringify(response_data));
                            return error(response_data);
                        }
                    }
                }
            });
        }catch (err) {

            console.log('ERRORR: ',err.message);
            return error( Response.sendResponse(false,null,err.message,500) );
        }
    }
}

module.exports = CallApi;