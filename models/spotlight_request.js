"use strict";

var Response = require('../Classes/Util/Response');


module.exports = function(sequelize, DataTypes) {
    return sequelize.define('spotlight_request', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        venue_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        requester_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        creator_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('OPEN','RESOLVED'),
            allowNull: true
        },
        timestamp: {
            type: DataTypes.BIGINT,
            allowNull: true
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        tableName: 'spotlight_request',
        underscored : true,
        classMethods : {


            createEntry : function( data , success, error) {

                try {

                    this.build(data);

                    this.create(data)
                        .then(function (created_data) {


                                success(Response.sendResponse(true,created_data,custom_message.SPOTLIGHT_REQUESTED,status_codes.CREATED));
                                return 0;
                            },function(err) {

                                error(Response.sendResponse(false,null,err.message,status_codes.BAD_REQUEST));
                                return 0;
                            }
                        );
                }catch (err) {

                    error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
                    return 0;
                }
            },


            getEntries : function( data , success, error) {

                try {

                    var condition = {

                        'venue_id' : data.venue_id,
                        'creator_id' : data.creator_id
                    };

                    this.findAll({
                        where : condition
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
            }

        }
    });
};
