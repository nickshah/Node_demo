"use strict";

var Response = require('../Classes/Util/Response');


module.exports = function(sequelize, DataTypes) {
    return sequelize.define('venue_social_media_mapping', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        venue_id: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        social_media_id: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        auth_token: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        app_id: {
            type: DataTypes.STRING,
            allowNull: true
        },
        consumer_key: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        secret_key: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        handle: {
            type: DataTypes.STRING,
            allowNull: true
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
        tableName: 'venue_social_media_mapping',
        underscored : true,
        classMethods : {


            //associate: function ( models ) {
            //
            //    var social_media = server._plugins['hapi-sequelize'].new_tagloy.models.social_media;
            //    this.belongsTo(social_media, {foreignKey: 'social_media_id'})
            //},

            createEntry: function (data, success,error) {

                try {

                    console.log(data);

                    var condition = {
                        venue_id : data.venue_id,
                        social_media_id : data.social_media_id
                    };

                    console.log("Condition",condition);

                    this.build(data);

                    this.findOrCreate({
                            where : condition,
                            defaults:data
                        })
                        .then(function (created_data) {

                                success(Response.sendResponse(true,null,custom_message.ENTRY_ADDED,status_codes.OK));
                            }, function (err) {

                                console.log(err.message);

                                error(Response.sendResponse(false,null,err.message,status_codes.BAD_REQUEST));
                            }
                        );
                } catch (err) {

                    error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
                }
            },

            /**
             * Update the venue social media mapping entry
             * @param updated_data
             * @param success
             * @param error
             * @returns {number}
             */
            updateEntry( updated_data , success , error ) {

                try {

                    var condition = {
                        venue_id : updated_data.venue_id,
                        social_media_id : updated_data.social_media_id
                    };

                    console.log(condition);

                    var instance = this;

                    this.find({
                        where : condition
                    }).then(function(data) {

                        if (data) {

                            data.updateAttributes(updated_data)
                                .then(function (success_data) {

                                    success(Response.sendResponse(false,success_data,custom_message.ENTRY_UPDATED,status_codes.OK));
                                    return 0;
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

                    console.log("ERror");

                    error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
                    return 0;
                }
            },

            deleteEntry ( data , success , error ) {
                
                try {
                
                    var condition = {
                        venue_id : data.venue_id,
                        social_media_id : data.social_media_id
                    };
                
                    this.destroy({
                            where : condition
                    }).then(function(success_data){
                
                            success(Response.sendResponse(true,null,'Account is removed successfully.',status_codes.OK));
                    },function(err){
                
                            error(Response.sendResponse(false,null,err.message,status_codes.BAD_REQUEST));
                    })
                }catch (err) {
                
                          error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
                }
            },


            //Todo remove the inner object of social media details from the response
            getAllSocialMediaDetails( data , success , error  ) {

                try {

                    var social_media = server._plugins['hapi-sequelize'].new_tagloy.models.social_media;
                    this.belongsTo(social_media, {foreignKey: 'social_media_id'});

                    var condition = {
                        venue_id : data.venue_id
                    };

                    this.findAll({
                        attributes: ['venue_id', 'consumer_key','secret_key'],
                        where : condition,
                        include: [{
                            model: social_media
                        }]
                    }).then(function(success_data){

                        if( success_data  )
                            success(Response.sendResponse(true,success_data,"",status_codes.OK));
                        else {

                            error(Response.sendResponse(false,null,custom_message.FEED_NOT_PRESENT,status_codes.BAD_REQUEST));
                        }

                    },function(err){

                        error(Response.sendResponse(false,null,err.message,status_codes.BAD_REQUEST));
                    })
                }catch (err) {

                    error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
                    return 0;
                }
            },

            /**
             * Get social media details for uploading spotlights
             * @param data
             * @param success
             * @param error
             * @returns {number}
             */
            getSocialMediaDetailsForVenue( data, success, error ) {

                try {

                    var condition = {
                        venue_id: data.venue_id,
                        social_media_id: data.social_media_id
                    };

                    this.find({
                        where: condition
                    }).then(function (success_data) {

                        console.log(success_data);

                        success(Response.sendResponse(true, success_data, "", status_codes.OK));
                    }, function (error_data) {

                        error(Response.sendResponse(false, null, error_data.message, status_codes.BAD_REQUEST));
                    })
                } catch (err) {

                    error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
                    return 0;
                }
            }
        }
    });
};
