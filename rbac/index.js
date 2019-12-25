'use strict';

var Sequelize = require('sequelize');

var error_message = require('./util/error_messages');
var Response = require('./Classes/Util/Response');


/**
 * TODO:LIST : Sunny : 30/05/2017
 * Create API to get always updated roles from user management database to RBAC database
 */



class Rbac {

    constructor( database , username , password , host ){

        try {
            this.is_connected = false;

            this.sequelize = new Sequelize(
                database,
                username,
                password, {
                    host: host
                }
            );

            this.role_based_access_control = this.sequelize.import('./models/organization_role_feature_mapping');
            this.features = this.sequelize.import('./models/features');
            this.roles = this.sequelize.import('./models/roles');
            this.v_role_feature_mapping = this.sequelize.import('./models/v_role_feature_mapping');
            this.organization_role_feature_mapping = this.sequelize.import('./models/organization_role_feature_mapping');
        }catch (err) {

        }
    }

    connectedToDatabase(success,error) {

        try {

            var instance = this;

            this.sequelize.authenticate()
                .then(function () {

                    instance.is_connected = true;
                    success(Response.sendResponse(true,null,null));
                })
                .catch(function (err) {

                    instance.is_connected = false;
                    error(Response.sendResponse(false,null,err.message));
                });
        }catch (err){

            error(Response.sendResponse(false,null,err.message));
        }
    }

    checkValidRole(data,success,error){

        try {

            console.log(data);
            console.log("Checking valid role", this.is_connected);

            var instance = this;

            if (this.is_connected) {

                var get_feature_id_condition = {
                    'name': data.feature_name
                };

                this.features.getFeatureId(get_feature_id_condition, function (feature_data) {

                    console.log("feature_data"+feature_data);

                    delete data.feature_name;
                    data.feature_id = feature_data.id;

                    instance.role_based_access_control.getEntries(data, function (data) {

                        if( data )
                            success(Response.sendResponse(true,null,null));
                        else
                            error(Response.sendResponse(false,null,null));
                    });
                }, function () {
                    console.log("feature_data"+get_feature_id_condition.name);

                    error(Response.sendResponse(false,null,error_message.FEATURE_NOT_PRESENT));
                });
            } else {

                error(Response.sendResponse(false,null,error_message.DATABASE_NOT_CONNECTED));
            }
        }catch (err) {

            error(Response.sendResponse(false,null,err.message));
        }
    }


    /**
     * Insert feature into database
     * @param data
     * @param success
     * @param error
     */
    createFeature(  data , success , error  ) {

        try {

            this.features.createEntry( data , function(success_data) {

                success(success_data);
            } ,function(error_data) {

                error(error_data);
            } )
        }catch (err) {

            error(Response.sendResponse(false,null,err.message));
        }
    }


    /**
     *
     * @param success
     * @param error
     */
    getFeatures ( success , error ) {

        try {

            this.features.getAllEntries(function(success_data) {

                success(success_data);
            } ,function(error_data) {

                error(error_data);
            } )
        }catch (err) {

            error(Response.sendResponse(false,null,err.message));
        }
    }


    /**
     *
     * @param success
     * @param error
     */
    getRoles ( success , error ) {

        try {

            this.roles.getAllEntries(function(success_data) {

                success(success_data);
            } ,function(error_data) {

                error(error_data);
            } )
        }catch (err) {

            error(Response.sendResponse(false,null,err.message));
        }
    }


    /**
     * Insert role feature mapping
     * @param data
     * @param success
     * @param error
     */
    createRoleFeatureMapping (  data , success , error ) {


        try {

            var instance = this;
            this.role_based_access_control.createEntry( data , function(success_data) {

                instance.getRoleFeatureMapping(function(success_data){

                    success(success_data);
                },function(error_data){

                    error(error_data);
                })
            } ,function(error_data) {

                error(error_data);
            } )
        }catch (err) {

            error(Response.sendResponse(false,null,err.message));
        }
    }

    /**
     * Get role feature mapping for showcasing
     * @param success
     * @param error
     */
    getRoleFeatureMapping ( success , error  ) {


        try {

            this.v_role_feature_mapping.getAllEntries(function(success_data) {

                success(success_data);
            } ,function(error_data) {

                error(error_data);
            } )
        }catch (err) {

            error(Response.sendResponse(false,null,err.message));
        }
    }


    /**
     * Get role feature mapping for showcasing
     * @param success
     * @param error
     */
    getFeaturesByRole ( data, success , error  ) {


        try {

            this.organization_role_feature_mapping.getFeatureForRole(this.features, data, function(success_data) {

                success(success_data);
            } ,function(error_data) {

                error(error_data);
            } )
        }catch (err) {

            error(Response.sendResponse(false,null,err.message));
        }
    }


}

//
//var rbac = new Rbac("rbac","root","root");
//rbac.connectedToDatabase(function(){
//
//    var data = {
//
//        'role_id' : 4,
//        'organization_id' : 15,
//        feature_name : "/venue/add"
//    };
//
//
//    rbac.checkValidRole(data,function(data){
//
//
//
//        console.log(data);
//    },function(data){
//
//        console.log(data);
//    })
//},function(err){
//
//});


module.exports = Rbac;
