"use strict";

var Response = require('../Classes/Util/Response');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('v_published_feeds', {
    feed_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    source: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    feed_msg: {
      type: DataTypes.TEXT,
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
    venue_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    handle: {
      type: DataTypes.STRING,
      allowNull: true
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'v_published_feeds',
    underscored : true,
    classMethods : {

      getPublishedFeeds : function(  data , success , error  ) {

        try {

         /* var condition = {
            'venue_id' : data.venue_id
          }; */

          var condition = {};
          
          if(data.venue_id!=2)
          {
                condition.venue_id = data.venue_id
          }

          var orderBy = 'feed_recieved_at';

          var offset = 40 * data.page;

          this.findAll({
            where: condition,
            order : [[orderBy, 'DESC']],
            limit : 40,
            offset : offset,
            attributes: config.return_fields.published_feeds
          }).then(function(success_data){

            success(Response.sendResponse(true,success_data,"",status_codes.OK));
          },function(error_data){

            error(Response.sendResponse(false,null,error_data.message,status_codes.BAD_REQUEST));
          })

        }catch (err) {

          error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
        }
      },



      getCelebrationFeeds : function(  data , success , error  ) {

        try {

          var condition = {
            'venue_id' : data.venue_id,
            'is_celebration' : 1
          };

          var orderBy = 'feed_recieved_at';

          var offset = config.util.limit * data.page;

          this.findAll({
            where: condition,
            order : [[orderBy, 'DESC']],
            limit : config.util.limit,
            offset : offset,
            attributes: config.return_fields.published_feeds
          }).then(function(success_data){

            success(Response.sendResponse(true,success_data,"",status_codes.OK));
          },function(error_data){

            error(Response.sendResponse(false,null,error_data.message,status_codes.BAD_REQUEST));
          })

        }catch (err) {

          error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
        }
      },



      getFameFeeds : function(  data , success , error  ) {

        try {

          var condition = {
            'venue_id' : data.venue_id,
            'feed_from_fame_user' : 1
          };

          var orderBy = 'feed_recieved_at';

          var offset = config.util.limit * data.page;

          this.findAll({
            where: condition,
            order : [[orderBy, 'DESC']],
            limit : config.util.limit,
            offset : offset,
            attributes: config.return_fields.published_feeds
          }).then(function(success_data){

            success(Response.sendResponse(true,success_data,"",status_codes.OK));
          },function(error_data){

            error(Response.sendResponse(false,null,error_data.message,status_codes.BAD_REQUEST));
          })

        }catch (err) {

          error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
        }
      },

      getFavouriteFeeds : function(  data , success , error  ) {

        try {

          var condition = {
            'venue_id' : data.venue_id,
            'feed_from_favourite_user' : 1
          };

          var orderBy = 'feed_recieved_at';

          var offset = config.util.limit * data.page;

          this.findAll({
            where: condition,
            order : [[orderBy, 'DESC']],
            limit : config.util.limit,
            offset : offset,
            attributes: config.return_fields.published_feeds
          }).then(function(success_data){

            success(Response.sendResponse(true,success_data,"",status_codes.OK));
          },function(error_data){

            error(Response.sendResponse(false,null,error_data.message,status_codes.BAD_REQUEST));
          })

        }catch (err) {

          error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
        }
      },



      getBookmarkedFeeds : function(  data , success , error  ) {

        try {

          var condition = {
            'venue_id' : data.venue_id,
            'bookmark_feed' : 1
          };

          var orderBy = 'feed_recieved_at';

          var offset = config.util.limit * data.page;

          this.findAll({
            where: condition,
            order : [[orderBy, 'DESC']],
            limit : config.util.limit,
            offset : offset,
            attributes: config.return_fields.published_feeds
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
            attributes: config.return_fields.published_feeds
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
