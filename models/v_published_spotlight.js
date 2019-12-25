"use strict";
var Response = require('../Classes/Util/Response');

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('v_published_spotlight', {
        spotlight_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
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
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        event_end_date: {
            type: DataTypes.INTEGER(11),
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
            allowNull: false
        },
        is_recurring: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            defaultValue: '0'
        },
        venue_user_creator_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        venue_user_moderator_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
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
        image: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        tableName: 'v_published_spotlight',
        underscored : true,
        classMethods : {

            getPublishedSpotlights : function(  data , success , error  ) {

                try {

                    var condition = {
                        'venue_id' : data.venue_id
                    };

                    var offset = config.util.limit * data.page;

                    this.findAll({
                        where: condition,
                        limit : config.util.limit,
                        offset : offset,
                        attributes: config.return_fields.pending_spotlights
                    }).then(function(success_data){

                        success(Response.sendResponse(true,success_data,"",status_codes.OK));
                    },function(error_data){

                        error(Response.sendResponse(false,null,error_data.message,status_codes.BAD_REQUEST));
                    })

                }catch (err) {

                    error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
                }
            },



            getPublishedSpotlightsForCreator : function(  data , success , error  ) {

                try {

                    var condition = {
                        'venue_id' : data.venue_id,
                        'venue_user_creator_id' : data.creator_id
                    };

                    var offset = config.util.limit * data.page;

                    this.findAll({
                        where: condition,
                        limit : config.util.limit,
                        offset : offset,
                        attributes: config.return_fields.pending_spotlights
                    }).then(function(success_data){

                        success(Response.sendResponse(true,success_data,"",status_codes.OK));
                    },function(error_data){

                        error(Response.sendResponse(false,null,error_data.message,status_codes.BAD_REQUEST));
                    })

                }catch (err) {

                    error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
                }
            }


        }
    });
};
