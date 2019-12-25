"use strict"

var Response = require('../Classes/Util/Response');

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('pending_spotlight', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        type: {
            type: DataTypes.ENUM('FLASH OFFER','CREATIVE','EVENT','SPECIAL','TAGTV CREATIVE','TAGVIDEO CREATIVE'),
            allowNull: true
        },
        venue_id: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        published_start_date_time: {
            type: DataTypes.BIGINT,
            allowNull: true
        },
        published_end_date_time: {
            type: DataTypes.BIGINT,
            allowNull: true
        },
        event_start_date: {
            type: DataTypes.BIGINT,
            allowNull: true
        },
        event_end_date: {
            type: DataTypes.BIGINT,
            allowNull: true
        },
        event_start_time: {
            type: DataTypes.DATE,
            allowNull: true
        },
        event_end_time: {
            type: DataTypes.DATE,
            allowNull: true
        },
        active_day_string: {
            type: DataTypes.STRING,
            allowNull: true
        },
        is_recurring: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            defaultValue: '0'
        },
        venue_user_creator_id: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        venue_user_moderator_id: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        fb: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        twt: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        ig: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
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
        tableName: 'pending_spotlight',
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


                                console.log(err);
                                error(Response.sendResponse(false,null,err.message,status_codes.BAD_REQUEST));
                            }
                        );
                } catch (err) {

                    error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
                }
            },


            getSpotlightById : function( data , success , error ) {

                try {

                    var condition = {
                        id : data.id
                    };

                    this.find({
                        where : condition
                    }).then(function(success_data){

                        if( success_data  )
                            success(Response.sendResponse(true,success_data.dataValues,"",status_codes.OK));
                        else {

                            error(Response.sendResponse(false,null,custom_message.SPOTLIGHT_NOT_PRESENT,status_codes.BAD_REQUEST));
                        }

                    },function(err){

                        error(Response.sendResponse(false,null,err.message,status_codes.BAD_REQUEST));
                    })
                }catch (err) {

                    error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
                }
            },

            deleteSpotlightById : function( data , success , error ) {

                try {

                    var condition = {
                        id : data.id
                    };

                    this.destroy({
                        where : condition
                    }).then(function(success_data){

                        success(Response.sendResponse(true,null,custom_message.PENDING_SPOTLIGHT_DELETED,status_codes.OK));
                    },function(err){

                        error(Response.sendResponse(false,null,err.message,status_codes.BAD_REQUEST));
                    })
                }catch (err) {

                    error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
                }
            }


        }
    });
};
