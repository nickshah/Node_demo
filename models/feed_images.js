"use strict";

var Response = require('../Classes/Util/Response');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('feed_images', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    feed_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    instagram_media_id: {
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
    tableName: 'feed_images',
    underscored : true,
    classMethods : {

      //  Create entry into database
      createEntry : function( data , success, error) {

        try {
          this.build(data);

          this.create(data)
              .then(function (created_data) {

                    return success(Response.sendResponse(true,created_data,null,status_codes.OK));
                  },function(err) {

                    return error(Response.sendResponse(false,null,err.message,status_codes.BAD_REQUEST));
                  }
              );
        }catch (err) {

          return error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
        }
      },

      getFeedInstagramId: function(data, success, error){

        console.log("INSTGRAM MEDIA ID PASSED", data.instagram_media_id);
        var condition = {
          instagram_media_id : data.instagram_media_id
        }
        this.find({
            where : condition
        }).then(function(data) {

            console.log("getFeedInstagramId QRY RESULT", data);
            if (data) {
                error(data);
            }else{
                success(data);
            }
        }, function(){
            error(data);
        });
          
      }

    }
  });
};
