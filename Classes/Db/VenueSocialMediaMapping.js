'use strict';

var Response = require('../Util/Response');
var social_media_details = require('../../config/social_media_details');
var CallApi = require('../Util/CallApi');
var oauthSignature = require('oauth-signature');
var oauth_nonce = require( 'oauth_nonce' );

class VenueSocialMediaMapping {

    constructor(data,model) {

        console.log(data);

        if( model != null || model != undefined )
            this.models = model.venue_social_media_mapping;
        else {
            this.models = server._plugins['hapi-sequelize'].new_tagloy.models.venue_social_media_mapping;
        }

        console.log(this.models);

        this.venue_id = data.venue_id != undefined ? data.venue_id : null;
        this.social_media_id = data.social_media_id != undefined ? data.social_media_id : null;
        this.auth_token = data.auth_token != undefined ? data.auth_token : null;
        this.consumer_key = data.consumer_key != undefined ? data.consumer_key : null;
        this.secret_key = data.secret_key != undefined ? data.secret_key : null;
        this.handle = data.handle != undefined ? data.handle : null;
        this.code = data.code != undefined ? data.code : null;

        if(data.app_id != undefined)
            this.app_id = data.app_id;
        else if(this.social_media_id == 1)
            this.app_id = social_media_details.instagram.client_id;
        else if(this.social_media_id == 2)
            this.app_id = social_media_details.twitter.client_id;
        else if(this.social_media_id == 3)
            this.app_id = social_media_details.facebook.client_id;
        else
            this.app_id = null;


        this.get_insta_access_token = "https://api.instagram.com/oauth/access_token";
        this.twitter_authorize_url = "https://api.twitter.com/oauth/request_token";
        this.twitter_access_token_url = "https://api.twitter.com/oauth/access_token";
        this.oauth_signature_method = "HMAC-SHA1";
        this.oauth_version = "1.0";


        this.oauth_token = data.oauth_token != undefined ? data.oauth_token : null;
        this.oauth_verifier = data.oauth_verifier != undefined ? data.oauth_verifier : null;
    }

    createRecord( success , error ) {

        try {

            var instance = this;

            if (this.social_media_id == 1) {
                var instaCredentials = {
                    'client_id': social_media_details.instagram.client_id,
                    'client_secret': social_media_details.instagram.client_secret,
                    'grant_type': 'authorization_code',
                    'redirect_uri': social_media_details.instagram.redirect_url,
                    'code': this.code
                };
                var api_call = new CallApi("POST", this.get_insta_access_token, instaCredentials);

                api_call.makeRequest(function (success_data) {

                    //console.log("Success Data rom insta: ", JSON.stringify(success_data));

                    var new_data = {
                        venue_id: instance.venue_id,
                        social_media_id: instance.social_media_id,
                        auth_token: success_data.access_token,
                        handle: success_data.user.username
                    };

                    console.log(instance.models);
                    console.log("Data before add: ", new_data);

                    instance.models.createEntry(new_data, function (created_success_data) {

                        success(created_success_data);
                    }, function (error_data) {

                        error(error_data);
                    });

                }, function (error_data) {

                    console.log(JSON.stringify(error_data));
                });
            }
            else if (this.social_media_id == 3) {
                instance.models.createEntry(this, function (created_success_data) {

                    success(created_success_data);
                }, function (error_data) {

                    error(error_data);
                });
            }
            else if (this.social_media_id == 2)
            {
                var new_data = {
                    venue_id: instance.venue_id,
                    social_media_id: instance.social_media_id,
                    consumer_key: instance.consumer_key,
                    secret_key: instance.secret_key,
                    handle: instance.handle
                };

                console.log("Twitter New Data: ", new_data);

                instance.models.createEntry(new_data, function (created_success_data) {

                    success(created_success_data);
                }, function (error_data) {

                    error(error_data);
                });

            }
        }catch (err) {

            error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
        }
    }

    updateRecord( success , error ) {

        try {

            this.models.updateEntry(this,function(success_data){

                success(success_data);
            },function(error_data){

                error(error_data);
            });
        }catch (err) {

            error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
        }
    }

    deleteEntry( success , error ) {
        
                try {
        
                    this.models.deleteEntry(this,function(success_data){
        
                        success(success_data);
                    },function(error_data){
        
                        error(error_data);
                    });
                }catch (err) {
        
                    error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
                }
            }

    getSocialMediaDetailsForVenue( success , error  ) {

        try {

            this.models.getSocialMediaDetailsForVenue(this,function(success_data){

                success(success_data);
            },function(error_data){

                error(error_data);
            });
        }catch (err) {

            error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
        }
    }


    getAllSocialMediaDetailsForVenue( success , error  ) {

        try {

            this.models.getAllSocialMediaDetails(this,function(success_data){

                success(success_data);
            },function(error_data){

                error(error_data);
            });
        }catch (err) {

            error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));

        }
    }

    generateNonce(num)
    {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < num; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }


    getTwitterRequestToken(success , error ){

        var nonce = oauth_nonce();
        var url = this.twitter_authorize_url;
        var httpMethod = 'POST';
        var parameters = {
            oauth_callback : social_media_details.twitter.redirect_url,
            oauth_consumer_key : social_media_details.twitter.consumer_key,
            oauth_nonce : nonce,
            oauth_timestamp : Math.floor(Date.now() / 1000),
            oauth_signature_method : this.oauth_signature_method,
            oauth_version : this.oauth_version
        };

        var signature = oauthSignature.generate(httpMethod, url, parameters, social_media_details.twitter.consumer_secret, null);

        console.log(signature);

        let authHeader = 'OAuth oauth_consumer_key="' + parameters.oauth_consumer_key + '",' +
            'oauth_signature_method="' + parameters.oauth_signature_method + '",' +
            'oauth_timestamp="' + parameters.oauth_timestamp + '",' +
            'oauth_nonce="' + parameters.oauth_nonce + '",' +
            'oauth_version="' + parameters.oauth_version + '",' +
            'oauth_signature="' + signature + '"';

        console.log("authHeader: ", authHeader);

        var data = {
            oauth_callback : parameters.oauth_callback
        };

        var headers = {
            'Authorization' : authHeader,
            'Content-Type' : 'application/json',
            'Accept' : '*/*'
        };

        var api_call = new CallApi("POST", url, data, headers);

        api_call.makeRequest(function (success_data) {

            success(success_data);

            //console.log("Success Data: ", success_data);

        }, function (error_data) {

            console.log(JSON.stringify(error_data));
            error(error_data);
        });

    }


    getTwitterAccessToken(success , error ){

        var instance = this;

        var nonce = oauth_nonce();
        var url = this.twitter_access_token_url;
        var httpMethod = 'POST';
        var parameters = {
            oauth_token : this.oauth_token,
            oauth_consumer_key : social_media_details.twitter.consumer_key,
            oauth_nonce : nonce,
            oauth_timestamp : Math.floor(Date.now() / 1000),
            oauth_signature_method : this.oauth_signature_method,
            oauth_version : this.oauth_version
        };

        var signature = oauthSignature.generate(httpMethod, url, parameters, social_media_details.twitter.consumer_secret, null);

        console.log(signature);

        let authHeader = 'OAuth oauth_consumer_key="' + parameters.oauth_consumer_key + '",' +
            'oauth_nonce="' + parameters.oauth_nonce + '",' +
            'oauth_signature="' + signature + '"' +
            'oauth_signature_method="' + parameters.oauth_signature_method + '",' +
            'oauth_timestamp="' + parameters.oauth_timestamp + '",' +
            'oauth_token="' + parameters.oauth_token + '",' +
            'oauth_version="' + parameters.oauth_version + '",';


        console.log("authHeader: ", authHeader);

        var dataToSend = {
            oauth_verifier : this.oauth_verifier
        };

        var headers = {
            'Authorization' : authHeader,
            'Content-Type' : 'application/json',
            'Accept' : '*/*'
        };

        var api_call = new CallApi("POST", url, dataToSend, headers);

        api_call.makeRequest(function (success_data) {

            //success(success_data);

            //console.log("Success Data: ", success_data);

            var authToken = success_data.result;
            var tokenArray = authToken.split("&");
            var auth_data = {};
            tokenArray.forEach(function(element) {
                var arr = element.split("=");
                auth_data[arr[0]] = arr[1];
            }, this);

            instance.consumer_key = auth_data.oauth_token;
            instance.secret_key = auth_data.oauth_token_secret;
            instance.handle = auth_data.screen_name;

            //console.log("instance Data: ", instance);


            instance.createRecord(function(s_data){
                success(s_data);
            }, function(e_data){
                error(e_data);
            });


            //console.log("Success Data: ", success_data);

        }, function (error_data) {

            console.log(JSON.stringify(error_data));
            error(error_data);
        });

    }

}


module.exports = VenueSocialMediaMapping;