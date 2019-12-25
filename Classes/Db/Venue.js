'use strict';

var Response = require('../Util/Response');
var EmailEvents = require('../Util/EmailEvents');
var CallApi = require('../Util/CallApi');
var PendingEmails = require('./PendingEmails');
var UploadFile = require('../Util/UploadFile');
var VenuePerks = require('./Perks/VenuePerks');
var Perks = require('./Perks/Perks');
var QB = require('quickblox');
var social_media_details = require('../../config/social_media_details');

var async = require('async');

class Venue {

    constructor(data) {

        console.log("inside constructor  --- ");
        this.models = server._plugins['hapi-sequelize'].new_tagloy.models.venue;

        this.create_organization = config.util.user_management_url + "organization";
        this.create_roles_for_organization =  config.util.user_management_url +  "organization/assign/role";
        this.create_user =  config.util.user_management_url + "organization_user";
        this.remove_user_mapping =  config.util.user_management_url + "remove/organization_user_mapping";
        this.assing_role_to_user =   config.util.user_management_url + "organization/assign/user";
        this.get_roles =   config.util.user_management_url + "role";
        this.get_group_organization = config.util.user_management_url + "group-organizations";

        console.log("inside constructor 2 --- ");
        this.id =  data.id != undefined ? data.id : null ;
        this.venue_id =  data.venue_id != undefined ? data.venue_id : null ;
        this.last_checkin_time =  data.last_checkin_time != undefined ? data.last_checkin_time : null ;
        this.name =  data.name != undefined ? data.name : null ;
        this.organization_category_id =  data.organization_category_id != undefined ? data.organization_category_id : null ;
        this.hash_tag =  data.hash_tag != undefined ? data.hash_tag : null ;
        this.start_time =  data.start_time != undefined ? data.start_time : null ;
        this.end_time =  data.end_time != undefined ? data.end_time : null ;
        this.start_time_2 =  data.start_time_2 != undefined ? data.start_time_2 : null ;
        this.end_time_2 =  data.end_time_2 != undefined ? data.end_time_2 : null ;
        this.open_on =  data.open_on != undefined ? data.open_on : '1111111' ;
        this.address =  data.address != undefined ? data.address : null ;
        this.latitude =  data.latitude != undefined ? data.latitude : null ;
        this.longitude =  data.longitude != undefined ? data.longitude : null ;
        this.phone_number =  data.phone_number != undefined ? data.phone_number : null ;
        this.is_black_board =  data.is_black_board != undefined ? data.is_black_board : 0;
        this.black_board_json =  data.black_board_json != undefined ? data.black_board_json : null ;
        this.auto_approval = data.auto_approval != undefined ? data.auto_approval : 0;
        this.auto_approval_spotlights = data.auto_approval_spotlights != undefined ? data.auto_approval_spotlights : 0;
        this.beacon_ids = data.beacon_ids != undefined ? data.beacon_ids : null;
        this.tags = data.tags != undefined ? data.tags : 0;
        this.banners = data.banners != undefined ? data.banners : null;
        this.is_table_booking_allowed = data.is_table_booking_allowed != undefined ? data.is_table_booking_allowed : 0;
        this.table_booking_allowed_on = data.table_booking_allowed_on != undefined ? data.table_booking_allowed_on : 0;
        this.first_table_booking_start_time = data.first_table_booking_start_time != undefined ? data.first_table_booking_start_time : 0;
        this.first_table_booking_end_time = data.first_table_booking_end_time != undefined ? data.first_table_booking_end_time : 0;
        this.second_table_booking_start_time = data.second_table_booking_start_time != undefined ? data.second_table_booking_start_time : 0;
        this.second_table_booking_end_time = data.second_table_booking_end_time != undefined ? data.second_table_booking_end_time : 0;
        this.table_booking_tnc = data.table_booking_tnc != undefined ? data.table_booking_tnc : null;
        this.is_proximity_on = data.is_proximity_on != undefined ? data.is_proximity_on : 0;
        this.welcome_message = data.welcome_message != undefined ? data.welcome_message : null;
        this.feedback_message = data.feedback_message != undefined ? data.feedback_message : null;
        this.birthday_message = data.birthday_message != undefined ? data.birthday_message : null;
        this.social_media_message = data.social_media_message != undefined ? data.social_media_message : null;        
        this.is_grouping_feature = data.is_grouping_feature != undefined ? data.is_grouping_feature : 0;
        this.plan = data.plan != undefined ? data.plan : 'PRO';

        this.logo_file =  data.logo_file != undefined ? data.logo_file : null;
        this.logo = null;

        this.banner_file = data.banner_file != undefined ? data.banner_file : null;
        this.city = data.city != undefined ? data.city : null;

        //User and organization management fields
        this.type = data.type != undefined ? data.type : null;
        this.email = data.email != undefined ? data.email : null;
        this.first_name = data.first_name != undefined ? data.first_name : null;
        this.phone_number = data.phone_number != undefined ? data.phone_number : null;
        this.role_id = data.role_id != undefined ? data.role_id : null;
        this.pincode = data.pincode != undefined ? data.pincode : null;
        this.user_id = data.user_id != undefined ? data.user_id : null;
        this.parent_id = data.parent_id != undefined ? data.parent_id : null;


        //Venue Social Media Mapping fields
        this.twt_handle = data.twt_handle != undefined ? data.twt_handle : null;
        this.fb_handle = data.fb_handle != undefined ? data.fb_handle : null;
        this.insta_handle = data.insta_handle != undefined ? data.insta_handle : null;

        this.page = data.page != undefined ? data.page : 0;
        this.search_term = data.search_term != undefined ? data.search_term : null;

        this.radius = data.radius != undefined ? data.radius : 5;

        this.is_preview = data.is_preview != undefined ? data.is_preview : 1;
        this.beacon = data.beacon != undefined ? data.beacon : 1;
        

        this.subscription_expiry_date =  data.subscription_expiry_date != undefined ? data.subscription_expiry_date : null ;
        
        console.log("inside constructor 3 --- ");
        this.CREDENTIALS = {
            appId: social_media_details.quickblox.appId,
            authKey: social_media_details.quickblox.authKey,
            authSecret: social_media_details.quickblox.authSecret
        };
    }


    venueOnBoard( success,error){

        try {

            var instance = this;

            if(this.address[0] == "{") {
                var address = JSON.parse(this.address);
                console.log("Address: ", address);
                this.city = (address.city != "" && address.city != null && address.city != undefined) ? address.city : null;
            }else{
                this.city = null;
            }

            async.waterfall([

                //Check hashtag for venue
                function(callback) {

                    instance.checkHashTag(function(success_data){

                        callback(null,success_data);
                    },function(error_data){

                        callback(error_data);
                    });
                },

                // Add entry into the authorization server
                function(arg1, callback) {  


                    instance.insertIntoAuthorizationServer(function(success_data){

                        callback(null,success_data);
                    },function(error_data){

                        callback(error_data);
                    });
                },

                //Add all roles to organization
                function(arg1, callback) {

                    console.log("Before addRolesToOrganization: ", arg1.result);

                    instance.addRolesToOrganization(arg1.result.id, instance.plan,function(success_data, adminId){


                        callback(null,arg1, adminId);
                    },function(error_data){


                        callback(error_data);
                    })
                },

                //Assign user to organization
                function(arg1, adminId, callback) {

                    instance.createUser(function(success_data){

                        var mapping_data ={
                            'organization_id' : arg1.result.id,
                            'role_id' : adminId,
                            'organization_user_id' : success_data.result.data.id
                        };

                        instance.assignRoleToUser( mapping_data,function(success_data){

                            callback(null,arg1);
                        },function(error_data){

                            callback(error_data);
                        } );
                    },function(error_data){

                        callback(error_data);
                    })
                },

                //Upload logo from here
                function( arg1, callback ) {

                    console.log("In image",arg1);

                    if( instance.logo_file != undefined  ) {

                        var image_upload = new UploadFile(instance.logo_file);

                        image_upload.uploadImage(function (success_data) {

                            console.log(success_data.result.filename);

                            instance.logo = success_data.result.filename;
                            callback(null,arg1);
                        },function(error){

                            console.log(error);
                            callback(null,arg1);
                        });
                    } else {

                        callback(null,arg1);
                    }
                },


                //Upload banner image from here
                function( arg1, callback ) {

                    console.log("In banner image",arg1);

                    if( instance.banner_file != undefined  ) {

                        var image_upload = new UploadFile(instance.banner_file);

                        image_upload.uploadImage(function (success_data) {

                            console.log(success_data.result.filename);

                            instance.banners = config.util.image_protocol + success_data.result.filename;
                            callback(null,arg1);
                        },function(error){

                            console.log(error);
                            callback(null,arg1);
                        });
                    } else {

                        callback(null,arg1);
                    }
                },

                //Add entry into tagloy datababase
                function(arg1, callback) {

                    instance.addEntry(arg1.result.id,function(success_data){

                        instance.createQuickBloxUser(success_data.result);

                        callback(null,success_data);
                    },function(error_data){

                        console.log(error_data);

                        callback(error_data);
                    })
                }
            ], function (err, result) {
                // result now equals 'done'

                if( err ) {

                    console.log(err);

                    error(Response.sendResponse(false,null,err.message,status_codes.BAD_REQUEST));
                    return 0;
                    //success(Response.sendResponse(true,err,null,status_codes.BAD_REQUEST));
                    //return true;
                }


                instance.addEntriesInVenuePerkMapping( result.result.venue_id );

                success(Response.sendResponse(true,result.result,null,status_codes.CREATED));
                return true;
            });
        } catch(err) {

            error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
        }
    }


    /**
     * function for checking the hash tag already present or not for venue
     * @param success
     * @param error
     */
    checkHashTag(success,error) {

        try {

            this.models.checkHashTag(this.venue_id, this.hash_tag,function(success_data){

                success(success_data);
            },function(error_data){

                error(error_data);
            });
        }catch (err) {

            error(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Inserting the venue details in authorization servevr
     * @param success
     * @param error
     */
    insertIntoAuthorizationServer( success , error ) {

        try {

            var organization_data = {
                name : this.name,
                type : this.type,
                organization_category_id : this.organization_category_id,
                city_id : 1,
                parent_id : this.parent_id
            };

            var api_call = new CallApi( "POST" , this.create_organization , organization_data  );
            api_call.makeRequest(function( success_data ){

                success(success_data);
            },function(error_data){

                error(error_data);
            });
        }catch (err) {

            console.log(err.message);

            error(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR);
        }
    }


    addRolesToOrganization( organization_id, plan ,success , error ) {

        try {

            console.log("I am Here in add roles to organization", plan);

            var venue_object = this;

            var searchPlan = '_BASIC';
            var adminRole = 'ADMIN_BASIC';
            var adminId = 0;

            if(plan == 'PRO')
            {
                searchPlan = '_PRO';
                adminRole = 'ADMIN_PRO';
            }

            var api_call_get_roles = new CallApi( "GET" , venue_object.get_roles  );

            api_call_get_roles.makeRequest(function(success_response){

                //var roles = config.roles;
                var system_roles = success_response.result;
                console.log(system_roles);

                var inserted_data = [];

                for( let i = 0; i < system_roles.length; i++ ) {

                    if(system_roles[i].name == adminRole)
                        adminId = system_roles[i].id;

                    if(system_roles[i].name.includes(searchPlan))
                    {
                        var my_object = {};
                        my_object.role_id = system_roles[i].id;
                        my_object.organization_id = organization_id;
                        inserted_data.push(my_object);
                    }
                }

                var organization_roles =  {
                    data : JSON.stringify(inserted_data)
                };

                console.log(organization_roles);

                var api_call = new CallApi( "POST" , venue_object.create_roles_for_organization , organization_roles  );

                api_call.makeRequest(function( success_data ){

                    success(success_data, adminId);
                },function(error_data){

                    error(error_data);
                });

            }, function(error_response){
                error(error_response);
            });


        }catch (err) {

            error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
        }
    }



    addRolesToBrand( organization_id, plan ,success , error ) {
        
                try {
        
                    console.log("I am Here in add roles to brand", plan);
        
                    var venue_object = this;
                    
                    var inserted_data = [];
                    var my_object = {};
                    my_object.role_id = 31; //BRAND MANAGER FOR VENUE ROLE ID
                    my_object.organization_id = organization_id;
                    inserted_data.push(my_object);

                    var organization_roles =  {
                        data : JSON.stringify(inserted_data)
                    };
    
                    console.log(organization_roles);
    
                    var api_call = new CallApi( "POST" , venue_object.create_roles_for_organization , organization_roles  );
    
                    api_call.makeRequest(function( success_data ){
    
                        success(success_data, 31);
                    },function(error_data){
    
                        error(error_data);
                    });
        
                }catch (err) {
        
                    error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
                }
            }

    createUser( success , error ) {

        try {

            var phone_number = this.phone_number;
            if(phone_number.startsWith("{")){
                phone_number = JSON.parse(this.phone_number).primary;
            }
            
            var venue_user_data = {
                first_name : this.first_name,
                email : this.email,
                phone_number : phone_number
            };


            var api_call = new CallApi( "POST" , this.create_user , venue_user_data  );

            api_call.makeRequest(function( success_data ){

                if( success_data.result.created ) {

                    var url = config.util.url + "/" + success_data.result.data.verify_email_data.verification_token + "/" + success_data.result.data.verify_email_data.encrypted_user_id;
                    console.log('url: ', url);
                    var send_email_data = {
                        url: url
                    };

                    var event_data = {
                        email : success_data.result.data.email,
                        email_template  : EmailEvents.verify_email.template,
                        email_event  : EmailEvents.verify_email.subject,
                        data : send_email_data
                    };

                    console.log(event_data);

                    emitter.emit('send_mail', JSON.stringify(event_data));
                } else {


                    console.log("not sending email");
                }

                success(success_data);
            },function(error_data){

                error(error_data);
            });

        }catch (err) {

            error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
        }
    }


    removeUserRole( success , error ) {

        try {

            var venue_user_data = {
                organization_user_id : this.user_id,
                role_id : this.role_id,
                organization_id : this.venue_id
            };


            var api_call = new CallApi( "POST" , this.remove_user_mapping , venue_user_data  );

            api_call.makeRequest(function( success_data ){

                if( success_data.result.created ) {

                    var url = config.util.url + "/" + success_data.result.data.verify_email_data.verification_token + "/" + success_data.result.data.verify_email_data.encrypted_user_id;
                    console.log('url: ', url);
                    var send_email_data = {
                        url: url
                    };

                    var event_data = {
                        email : success_data.result.data.email,
                        email_template  : EmailEvents.verify_email.template,
                        email_event  : EmailEvents.verify_email.subject,
                        data : send_email_data
                    };

                    console.log(event_data);

                    emitter.emit('send_mail', JSON.stringify(event_data));
                } else {


                    console.log("not sending email");
                }

                success(success_data);
            },function(error_data){

                error(error_data);
            });

        }catch (err) {

            error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
        }
    }


    assignRoleToUser( data , success ,error ) {

        try {

            var assign_role_to_user = data;

            var api_call = new CallApi( "POST" , this.assing_role_to_user , assign_role_to_user  );

            api_call.makeRequest(function( success_data ){

                console.log(success_data);

                if( success_data.result.is_email_verified == 0 ) {

                    var pending_email = new PendingEmails(success_data.result);

                    pending_email.createRecord(function(){

                        console.log("Entry created");
                    },function(error_data){

                        console.log(error_data);
                    });

                } else {

                    console.log(data.result);

                    var send_email_data = {
                        url : "http://www.tagloy.com",
                        organization_name : success_data.result.organization_name,
                        role : success_data.result.role_name
                    };

                    var event_data = {
                        email : success_data.result.email,
                        email_template  : EmailEvents.role_assigned.template,
                        email_event  : EmailEvents.role_assigned.subject,
                        data : send_email_data
                    };

                    emitter.emit('send_mail', JSON.stringify(event_data));
                }

                success(success_data);
            },function(error_data){

                console.log("eror",error_data);

                error(error_data);
            });

        }catch (err) {

            error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
        }
    }

    addEntry( organization_id , success , error ) {

        try {

            this.venue_id = organization_id;

            console.log("this.getData(): ", this.getData());

            this.models.createEntry(this.getData(),function(success_data){

                success(success_data);
            },function(error_data){

                error(error_data);
            });
        }catch (err) {

            error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
        }
    }


    getData(){

        var key_array = [
            "id" , "venue_id" , "name" , "hash_tag" ,"start_time" , "end_time","start_time_2" , "end_time_2", "open_on", "address" ,
            "latitude" , "longitude", "phone_number", "is_black_board" , "black_board_json" , "auto_approval", "auto_approval_spotlights" ,
            "tags", "logo", "beacon_ids","banners", "is_table_booking_allowed", "table_booking_allowed_on", "first_table_booking_start_time",
            "first_table_booking_end_time", "second_table_booking_start_time", "second_table_booking_end_time", "table_booking_tnc",
            "is_proximity_on", "welcome_message", "feedback_message", "social_media_message", "birthday_message", "is_grouping_feature", "plan",
            "tv_status", "first_name", "email", "city", "subscription_expiry_date"
        ];

        var data = {};

        for(  let i =0 ; i < key_array.length ; i++   ) {

            if(  this[key_array[i]] == null  ) {
                if(key_array[i] == 'start_time_2' || key_array[i] == 'end_time_2'){
                    data[key_array[i]] = null;
                }else{
                 delete key_array[i];
                }
            } else {

                data[key_array[i]] = this[key_array[i]];
            }
        }
        return data;

    }

//    Actual operations

    assignUserToVenue( success , error ){

        try {

            var instance = this;

            this.createUser(function(success_data){

                var mapping_data ={
                    'organization_id' : instance.venue_id,
                    'role_id' : instance.role_id,
                    'organization_user_id' : success_data.result.data.id
                };

                console.log(mapping_data);

                instance.assignRoleToUser( mapping_data,function(success_data){

                    console.log(success_data);

                    success( Response.sendResponse(true,null,custom_message.VENUE_USER_ASSIGNED,status_codes.OK)  )
                },function(error_data){

                    error(error_data);
                } );

            },function(error_data){

                error(error_data);
            })

        }catch (err) {

            error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
        }

    }


    removeUserFromVenue( success , error ){

        try {
            this.removeUserRole(function(success_data){

                console.log(success_data);
                success( Response.sendResponse(true,null,custom_message.VENUE_USER_ACCESS_REVOKED,status_codes.OK)  )
            },function(error_data){

                error(error_data);
            })

        }catch (err) {

            error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
        }

    }



    updateBlackBoard( success , error ) {

        try {

            this.models.updateBlackBoard(this, function (success_data) {

                success(success_data);
            }, function (error_data) {

                error(error_data);
            });
        }catch ( err ) {

            error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
        }
    }

    getVenueByBeacon( success , error ) {
        
                try {
        
                    this.models.getByBeacon(this, function (success_data) {
        
                        success(success_data);
                    }, function (error_data) {
        
                        error(error_data);
                    });
                }catch ( err ) {
        
                    error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
                }
            }

    getBlackBoard( success , error ) {

        try {

            this.models.getBlackBoard(this, function (success_data) {

                success(success_data);
            }, function (error_data) {

                error(error_data);
            });
        }catch ( err ) {

            error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
        }
    }

    getVenueDetails( success , error ) {

        try {

            this.models.getVenueDetails(this, function (success_data) {

                success(success_data);
            }, function (error_data) {

                error(error_data);
            });
        }catch ( err ) {

            error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
        }
    }


    addEntriesInVenuePerkMapping( venue_id , success , error   ) {

        try {


            var perks = new Perks({});

            perks.getAllPerks(function(s) {

                var inserted_data = [];

                for (let i = 0; i < s.result.length; i++) {

                    var my_object = s.result[i].dataValues;
                    delete my_object.id;
                    my_object.venue_id = venue_id;
                    inserted_data.push(my_object);
                }

                var data = {};
                data.array = inserted_data;

                var venue_perks = new VenuePerks(data);

                venue_perks.createMultipleRecords(function (success_data) {

                    //success(s);
                }, function (error_data) {

                    //error(error_data);
                });
            });
        }catch (err) {

            console.log(err.message);

            //error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
        }
    }


    getAllVenues( success , error  ) {

        try  {


            console.log("jere------");

            this.models.getAllVenues(  function(success_data) {

                success( success_data );
            },function( error_data ) {

                error( error_data );
            })
        }catch (err) {
            console.log("inside getallvenues error --- ");
            error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
        }

    }


    updateVenue( success , error ) {

        try {

            var instance = this;

            async.waterfall([
                
                //Check hashtag for venue
                function(callback) {
                
                    instance.checkHashTag(function(success_data){
                
                        callback(null,success_data);
                    },function(error_data){
                
                        callback(error_data);
                                    });
                },
                
                // Add entry into the authorization server
                function(arg1, callback) {

                    console.log("In Update Venue Class: ", instance.getData());
                    
                                if( instance.logo_file != null  ) {
                    
                                    console.log("uploading logo file++++++++++++++");

                                    //Create arrow functions
                                    var image_upload = new UploadFile(instance.logo_file);
                                    console.log("uploading logo image_upload++++++++++++++");
                                    
                                    //image_upload.uploadImage( () => {
                    
                                    image_upload.uploadImage( (success_data) => {

                                        console.log("uploading logo successs++++++++++++++",success_data);
                    
                                        instance.logo = success_data.result.filename;
                    
                                        console.log("this.banner_file: ", instance.banner_file);

                                        if(instance.banner_file != null)
                                        {
                                            var banner_upload = new UploadFile(instance.banner_file);
                    
                                            banner_upload.uploadImage((banner_success) => {
                    
                                                instance.banners = config.util.image_protocol +  banner_success.result.filename;
                    
                                                thinstanceis.models.updateEntry(instance.getData(), (success_data) => {
                    
                                                    console.log(success_data);
                    
                                                    //success(success_data);
                                                    callback(null,success_data);
                                                }, (error_data) => {
                    
                                                    console.log(error_data);
                    
                                                    //error(callback(null,success_data););
                                                    callback(error_data);
                                                });
                                            },(err) => {
                    
                                                //error(err);
                                                callback(err);
                                            });
                                        }
                                        else
                                        {
                                            instance.models.updateEntry(instance.getData(), (success_data) => {
                    
                                                console.log(success_data);
                    
                                               // success(success_data);
                                                callback(null,success_data);
                                            }, (error_data) => {
                    
                                                console.log(error_data);
                    
                                                //error(error_data);
                                                callback(error_data);
                                            });
                                        }
                    
                                    },(err) => {
                                        console.log("LOGO IMAGE UPLOAD ERROR",err);    
                                        //error(err);
                                        callback(err);
                                    });
                                } else {
                    
                                    if(instance.banner_file != null)
                                    {console.log("this.banner_file: ", instance.banner_file);
                                        var banner_upload = new UploadFile(instance.banner_file);
                    
                                        banner_upload.uploadImage((banner_success) => {
                    
                                            instance.banners = config.util.image_protocol +  banner_success.result.filename;
                    
                                            instance.models.updateEntry(instance.getData(), (success_data) => {
                    
                                                console.log(success_data);
                    
                                                //success(success_data);
                                                callback(null,success_data);
                                            }, (error_data) => {
                    
                                                console.log(error_data);
                    
                                                //error(error_data);
                                                callback(error_data);
                                            });
                                        },(err) => {
                    
                                            //error(err);
                                            callback(err);
                                        });
                                    }
                                    else{
                                        instance.models.updateEntry(instance.getData(), (success_data)  => {
                    
                                            //success(success_data);
                                            callback(null,success_data);   
                                        }, (error_data) => {
                    
                                            //error(error_data);
                                            callback(error_data);
                                        });
                                    }
                                }


                }
            ],function (err, result) {
                // result now equals 'done'

                if( err ) {

                    console.log(err);

                    error(Response.sendResponse(false,null,err.message,status_codes.BAD_REQUEST));
                    return 0;
                    //success(Response.sendResponse(true,err,null,status_codes.BAD_REQUEST));
                    //return true;
                }


                //instance.addEntriesInVenuePerkMapping( result.result.venue_id );

                success(Response.sendResponse(true,result.result,null,status_codes.CREATED));
                return true;
            });

            
        }catch (err) {
            console.log("IMAGE UPLOAD ERROR ++++++++++++++++++++++++++");
            error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
        }
    }




    searchVenue( success , error ) {

        try {

            this.models.searchVenue( this,function(success_data) {

                success( success_data );
            },function( error_data ) {

                error( error_data );
            })

        }catch (err) {

            error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
        }

    }

    getNearByVenues( success , error ) {

        try {

            this.models.getNearByVenues( this,function(success_data) {

                success( success_data );
            },function( error_data ) {

                error( error_data );
            })

        }catch (err) {

            error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
        }

    }

    createQuickBloxUser(venue_data){

        QB.init(this.CREDENTIALS.appId, this.CREDENTIALS.authKey, this.CREDENTIALS.authSecret, social_media_details.qb_config);
        //QB.init(this.CREDENTIALS.appId, this.CREDENTIALS.authKey, this.CREDENTIALS.authSecret);

        
        QB.createSession(function(err, result) {
            // callback function

            console.log("Result of Quickblox: ", result);
            console.log("Error of Quickblox: ", err);

            var custom = {
                'image' : venue_data.logo
            }
            var params = { 
                'login': 'Tag_App_Venue_' + venue_data.venue_id, 
                'password': 'Tag_App_Venue_' + venue_data.venue_id,
                'full_name': venue_data.name,
                'custom_data' : custom,
                'tag' : venue_data.hash_tag
            };

            QB.users.create(params, function(err, user_created){
                if (user_created) {
                    // success
                    console.log("Success of User Create: ", user_created);

                    QB.login(params, function(err, user){
                        if (user) {
                            // success
                            var create_dialog_params = {
                                type: 1,
                                name: 'Tag_App_Venue_' + venue_data.venue_id,
                                photo : venue_data.logo,
                                data : {
                                    venue_id : venue_data.venue_id,
                                    venue_name : venue_data.name
                                }
                            };

                            QB.chat.dialog.create(create_dialog_params, function(err, createdDialog) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    console.log(createdDialog);
                                }
                            });
                        } else  {
                            // error
                        }
                    });
                } else  {
                    // error
                    console.log("Error of User Create: ", err);
                }
            });
        });



    }


    getGroupOrganizationList( success , error ) {

        try {

            var api_call = new CallApi( "GET" , this.get_group_organization );
            api_call.makeRequest(function( success_data ){

                success(success_data);
            },function(error_data){

                error(error_data);
            });
        }catch (err) {

            console.log(err.message);

            error(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR);
        }

    }


    groupOnBoard( success,error){
        
                try {
        
                    var instance = this;
        
                    async.waterfall([
        
        
                        // Add entry into the authorization server
                        function(callback) {  
        
        
                            instance.insertIntoAuthorizationServer(function(success_data){
        
                                callback(null,success_data);
                            },function(error_data){
        
                                callback(error_data);
                            });
                        },
        
                        //Add all roles to organization
                        function(arg1, callback) {
        
                            console.log("Before addRolesToOrganization: ", arg1.result);
        
                            instance.addRolesToBrand(arg1.result.id, instance.plan,function(success_data, adminId){
        
        
                                callback(null,arg1, adminId);
                            },function(error_data){
        
        
                                callback(error_data);
                            })
                        },
        
                        //Assign user to organization
                        function(arg1, adminId, callback) {
        
                            instance.createUser(function(success_data){
        
                                var mapping_data ={
                                    'organization_id' : arg1.result.id,
                                    'role_id' : adminId,
                                    'organization_user_id' : success_data.result.data.id
                                };
        
                                instance.assignRoleToUser( mapping_data,function(success_data){
        
                                    callback(null,arg1);
                                },function(error_data){
        
                                    callback(error_data);
                                } );
                            },function(error_data){
        
                                callback(error_data);
                            })
                        }

                    ], function (err, result) {
                        // result now equals 'done'
        
                        if( err ) {
        
                            console.log(err);
        
                            error(Response.sendResponse(false,null,err.message,status_codes.BAD_REQUEST));
                            return 0;
                            //success(Response.sendResponse(true,err,null,status_codes.BAD_REQUEST));
                            //return true;
                        }
        
                        success(Response.sendResponse(true,result.result,null,status_codes.CREATED));
                        return true;
                    });
                } catch(err) {
        
                    error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
                }
            }
}

module.exports = Venue;
