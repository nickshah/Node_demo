"use strict";

var Response = require('../Classes/Util/Response');

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('published_feeds', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        feed_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        feed_msg: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        customer_id: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        venue_id: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        social_media_id: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        feed_recieved_at: {
            type: DataTypes.BIGINT,
            allowNull: true
        },
        is_celebration: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            defaultValue: '0'
        },
        is_favourite: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        bookmark_feed: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        feed_from_fame_user: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        feed_from_favourite_user: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            defaultValue: '0'
        },
        action_taken_by_venue_user: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: true
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        tableName: 'published_feeds',
        underscored : true,
        classMethods : {

            createEntry: function (data, success,error) {

                try {

                    console.log(data);

                    this.build(data);

                    this.create(data)
                        .then(function (created_data) {

                                success(Response.sendResponse(true,created_data.dataValues,"",status_codes.OK));
                            }, function (err) {

                                console.log(err.message);

                                error(Response.sendResponse(false,null,err.message,status_codes.BAD_REQUEST));
                            }
                        );
                } catch (err) {

                    error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
                }
            },

            getFeedById : function( data , success , error ) {

                try {

                    var condition = {
                        feed_id : data.id
                    };

                    this.find({
                        where : condition
                    }).then(function(success_data){

                        if( success_data  )
                            success(Response.sendResponse(true,success_data.dataValues,"",status_codes.OK));
                        else {

                            error(Response.sendResponse(false,null,custom_message.FEED_NOT_PRESENT,status_codes.BAD_REQUEST));
                        }

                    },function(err){

                        error(Response.sendResponse(false,null,err.message,status_codes.BAD_REQUEST));
                    })
                }catch (err) {

                    error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
                }
            },

            deleteFeedById : function( data , success , error ) {

                try {

                    var condition = {
                        feed_id : data.id
                    };

                    this.destroy({
                        where : condition
                    }).then(function(success_data){

                        success(Response.sendResponse(true,null,custom_message.PENDING_FEED_DELETED,status_codes.OK));
                    },function(err){

                        error(Response.sendResponse(false,null,err.message,status_codes.BAD_REQUEST));
                    })
                }catch (err) {

                    error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
                }
            },

            updateFeedData : function( updated_data , success , error ) {

                try {

                    var condition = {
                        feed_id : updated_data.id
                    };

                    var instance = this;

                    this.find({
                        where : condition
                    }).then(function(data) {

                        if (data) {

                            data.updateAttributes(updated_data)
                                .then(function () {

                                    success(Response.sendResponse(true,null,custom_message.ENTRY_UPDATED,status_codes.OK));
                                },function(err) {

                                    error(Response.sendResponse(false,null,err.message,status_codes.BAD_REQUEST));
                                    return 0;
                                })
                        } else {

                            error(Response.sendResponse(false,null,custom_message.ENTRY_NOT_PRESENT,status_codes.BAD_REQUEST));
                            return 0;
                        }
                    },function(err){

                        error(Response.sendResponse(false,null,err.message,status_codes.BAD_REQUEST));
                        return 0;
                    });
                }catch (err) {

                    error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
                    return 0;
                }
            },



            getFeedsToMoveIntoHistorical : function( success , error ) {

                try {


                    this.findAll({
                        //where : condition
                    }).then(function(success_data){

                        success(Response.sendResponse(true,success_data,"",status_codes.OK));
                    },function(err){

                        error(Response.sendResponse(false,null,err.message,status_codes.BAD_REQUEST));
                    })
                }catch (err) {

                    error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
                }
            },
        }
    });
};
