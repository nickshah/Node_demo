var Response = require('../Classes/Util/Response');

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('v_pending_feeds', {
        feed_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
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
        customer_id: {
            type: DataTypes.INTEGER(11),
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
        cust_feeds_count: {
            type: DataTypes.BIGINT,
            allowNull: false,
            defaultValue: '0'
        },
        feed_recieved_at: {
            type: DataTypes.BIGINT,
            allowNull: true
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
        tableName: 'v_pending_feeds',
        underscored : true,
        classMethods : {

            getPendingFeeds : function(  data , success , error  ) {

                try {

                    var condition = {};

                    if(data.venue_id!=2){
                        condition.venue_id = data.venue_id
                    }
                    

                    var orderBy = 'feed_recieved_at';

                    var offset = config.util.limit * data.page;

                    this.findAll({
                        where: condition,
                        order : [[orderBy, 'DESC']],
                        limit : config.util.limit,
                        offset : offset,
                        attributes: config.return_fields.pending_feeds
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
                        attributes: config.return_fields.pending_feeds
                    }).then(function(success_data){

                        success(Response.sendResponse(true,success_data,"",status_codes.OK));
                    },function(error_data){

                        error(Response.sendResponse(false,null,error_data.message,status_codes.BAD_REQUEST));
                    })

                }catch (err) {

                    error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
                }
            },


            getPendingFeedCount : function(  data , success , error  ) {

                try {

                    var condition = {
                        'venue_id' : data.venue_id,
                        'feed_recieved_at' : {
                            $gt : data.timestamp
                        }
                    };

                    this.count({
                        where: condition
                    }).then(function(success_data){

                        success(Response.sendResponse(true,success_data,"",status_codes.OK));
                    },function(error_data){

                        error(Response.sendResponse(false,null,error_data.message,status_codes.BAD_REQUEST));
                    })

                }catch (err) {

                    error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
                }
            },

        }


    });
};
