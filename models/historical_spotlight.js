"use strict";

var Response = require('../Classes/Util/Response');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('historical_spotlight', {
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
    spotlight_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('PENDING','APPROVED','REJECTED'),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    venue_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    type: {
      type: DataTypes.ENUM('FLASH OFFER','CREATIVE','EVENT','SPECIAL','TAGTV CREATIVE','TAGVIDEO CREATIVE'),
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
    },
    rejected_reason: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    parent_spotlight_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'historical_spotlight',
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
      }
    }
  });
};
