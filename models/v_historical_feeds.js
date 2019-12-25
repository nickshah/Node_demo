"use strict";

var Response = require('../Classes/Util/Response');

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('v_historical_feeds', {
        feed_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        feed_msg: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        source: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        feed_image: {
            type: DataTypes.STRING,
            allowNull: true
        },
        cust_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        feed_count: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            defaultValue: '0'
        },
        published_feed_count: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            defaultValue: '0'
        },
        twt_follower: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            defaultValue: '0'
        },
        facebook_follower: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            defaultValue: '0'
        },
        ig_follower: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            defaultValue: '0'
        },
        is_celebration: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
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
        feed_recieved_at: {
            type: DataTypes.BIGINT,
            allowNull: true
        },
        feed_status: {
            type: DataTypes.ENUM('PENDING','APPROVED','REJECTED'),
            allowNull: false
        },
        rejected_reason: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        venue_id: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        handle: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        tableName: 'v_historical_feeds',
        underscored : true,
        classMethods : {

            getHistoricalFeeds : function(  data , success , error  ) {

                try {

                    /*var condition = {
                        'venue_id' : data.venue_id,
                        'feed_status' : 'REJECTED'
                    };*/
                    var condition = {
                        feed_status : 'REJECTED'
                    };
                    
                    if(data.venue_id!=2)
                    {
                        condition.venue_id = data.venue_id                   
                    }

                    var orderBy = 'feed_recieved_at';

                    var offset = config.util.limit * data.page;

                    this.findAll({
                        where: condition,
                        order : [[orderBy, 'DESC']],
                        limit : config.util.limit,
                        offset : offset,
                        attributes: config.return_fields.historical_feeds
                    }).then(function(success_data){

                        success(Response.sendResponse(true,success_data,"",status_codes.OK));
                    },function(error_data){

                        error(Response.sendResponse(false,null,error_data.message,status_codes.BAD_REQUEST));
                    })

                }catch (err) {

                    error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
                }
            },

            searchForFeeds : function ( data , success , error ) {

                try {

                    var orderBy = 'feed_recieved_at';

                    this.findAll({
                        where : {
                            $or: {
                                cust_name: { like: '%' + data. search_term + '%' },
                                handle: { like: '%' + data. search_term + '%' }
                            }
                        },
                        order : [[orderBy, 'DESC']],
                        attributes: config.return_fields.historical_feeds
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
