"use strict";

var Response = require('../Classes/Util/Response');

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('tagmedia', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        organization_id: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        slot: {
            type: DataTypes.STRING,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        duration: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        media_url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.ENUM('IMAGE','VIDEO'),
            allowNull: false
        },
        screen_type: {
            type: DataTypes.ENUM('TAGBIZ','TAGAPP','TAGTRADE','TAGMIN'),
            allowNull: false
        },
        start_datetime: {
            type: DataTypes.DATE,
            allowNull: false
        },
        end_datetime: {
            type: DataTypes.DATE,
            allowNull: false
        },

        extension: {
            type: DataTypes.STRING,
            allowNull: false
        },
        
        created_at: {
            type: DataTypes.DATE,
            allowNull: false
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false
        },
        active: {
            type: DataTypes.INTEGER(1),
            allowNull: true
        }
    }, {
        tableName: 'tagmedia',
        underscored : true,
        classMethods :{

            createEntry: function (data, success,error) {

                try {

                    sequelize.query('CALL TAGMAMAGE_CONTENT_CONFLICT (:slot, :title, :organization_id, :type, :screen_type, :duration, :start_datetime, :end_datetime, :media, :extension, :force_create)',
                    {replacements: { slot: data.slot, title: data.title, organization_id: data.organization_id, type: data.type, screen_type:data.screen_type, duration: data.duration, start_datetime: data.start_datetime, end_datetime: data.end_datetime, media: data.media_url, extension: data.extension, force_create: data.force_create }}).then(function(response){
                        //res.json(response);
                        console.log("TAGMEDIA ADD RESPONSE",response);
                        if(response!=undefined && response.length>0){
                            success(Response.sendResponse(true,response,"",status_codes.HTTP_CONFLICT));
                        }else{
                            success(Response.sendResponse(true,response,"",status_codes.OK));
                        }
                    }).error(function(err){
                        //res.json(err);
                        console.log("TAGMEDIA ADD ERROR",err);
                        error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
                    });

                    
                    /*this.build(data);

                    this.create(data)
                        .then(function (created_data) {

                                success(Response.sendResponse(true,created_data.dataValues,custom_message.ENTRY_ADDED,status_codes.OK));
                            }, function (err) {

                                error(Response.sendResponse(false,null,err.message,status_codes.BAD_REQUEST));
                            }
                        ); */
                } catch (err) {

                    error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
                }
            },

            getEntriesForVenue : function( data , success , error   ){

                try {
                    
                    var condition = {
                        'organization_id' : data.organization_id,
                        'screen_type' : data.screen_type,
                        'slot' : data.slot
                    };

                    this.findAll({
                        where : condition
                    }).then(function(success_data){

                        success(Response.sendResponse(true,success_data,"",status_codes.OK));
                    },function(error_data){

                        error(Response.sendResponse(false,null,error_data.message,status_codes.BAD_REQUEST));
                    })

                }catch (err) {

                    error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
                }
            },

            getLiveEntriesForVenue : function( data , success , error   ){
                
                try {

                    var condition = {
                             'organization_id' : data.organization_id,
                             'screen_type' : data.screen_type,
                             'start_datetime' : {
                                $lte: data.datetime
                             }, 
                             'end_datetime': {
                                $gte: data.datetime
                             }
                    };
                
                    this.findAll({
                            where : condition
                    }).then(function(success_data){
                
                            success(Response.sendResponse(true,success_data,"",status_codes.OK));
                    },function(error_data){
                
                            error(Response.sendResponse(false,null,error_data.message,status_codes.BAD_REQUEST));
                    })
                
                    }catch (err) {
                
                            error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
                    }
            },

            getLiveAdEntriesForVenue : function( data , success , error   ){
                
                try {

                    var condition = {
                             'organization_id' : data.organization_id,
                             'screen_type' : data.screen_type,
                             'start_datetime' : {
                                $lte: data.datetime
                             }, 
                             'end_datetime': {
                                $gte: data.datetime
                             },
                             'active': 1
                    };
                
                    this.findAll({
                            where : condition
                    }).then(function(success_data){
                
                            success(Response.sendResponse(true,success_data,"",status_codes.OK));
                    },function(error_data){
                
                            error(Response.sendResponse(false,null,error_data.message,status_codes.BAD_REQUEST));
                    })
                
                    }catch (err) {
                
                            error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
                    }
            },
                

            deleteEntry : function(data , success ,  error) {

                try {

                    var instance = this;

                    var condition = {
                        id : data.id
                    };

                    this.destroy({
                            where: condition
                        }
                    ).then(function () {

                        instance.getEntriesForVenue(data,function(success_data){

                            success_data.message = custom_message.ENTRY_DELETED;
                            success(success_data);
                        },function(error_data){

                            error(error_data);
                        });
                    },function(err){

                        error(Response.sendResponse(false,null,err.message,status_codes.BAD_REQUEST));
                        return 0;
                    });
                }catch (err) {

                    error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
                    return 0;
                }
            },

            updateEntry : function(updated_data, success, error) {
                   try{

                    var instance = this;

                    var condition = {
                        id : updated_data.id
                    };

                    this.find({
                        where : condition
                    }).then(function(data) {

                        if (data) {

                            data.updateAttributes(updated_data)
                                .then(function () {

                                    return success(Response.sendResponse(true,null,custom_message.ENTRY_UPDATED,status_codes.OK));
                                },function(err) {

                                    return error(Response.sendResponse(false,null,err.message,status_codes.BAD_REQUEST));
                                })
                        } else {

                            return error(Response.sendResponse(false,null,custom_message.ENTRY_NOT_PRESENT,status_codes.BAD_REQUEST));
                        }
                    },function(err){

                        return error(Response.sendResponse(false,null,err.message,status_codes.BAD_REQUEST));
                    });


                   } catch (err){
                    return error(Response.sendResponse(false,null,err.message,status_codes.BAD_REQUEST));
                   }
            }

        }
    });
};
