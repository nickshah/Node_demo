/* jshint indent: 2 */
var Response = require('../Classes/Util/Response');
var return_fields = require('../config/return_fields');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('v_venue_details', {
    venue_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    venue_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    hash_tag: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    first_session_start: {
      type: DataTypes.TIME,
      allowNull: true
    },
    first_session_end: {
      type: DataTypes.TIME,
      allowNull: true
    },
    second_session_start: {
      type: DataTypes.TIME,
      allowNull: false
    },
    second_session_end: {
      type: DataTypes.TIME,
      allowNull: false
    },
    open_on: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    latitude: {
      type: "DOUBLE",
      allowNull: true
    },
    longitude: {
      type: "DOUBLE",
      allowNull: true
    },
    phone_number: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    city_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    is_black_board: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    black_baoard_json: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    auto_approval: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    auto_approval_spotlights: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    tags: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    logo: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    beacon_ids: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    banners: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    is_table_booking_allowed: {
      type: DataTypes.INTEGER(2),
      allowNull: false
    },
    table_booking_allowed_on: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    first_table_booking_start_time: {
      type: DataTypes.TIME,
      allowNull: false
    },
    first_table_booking_end_time: {
      type: DataTypes.TIME,
      allowNull: false
    },
    second_table_booking_start_time: {
      type: DataTypes.TIME,
      allowNull: false
    },
    second_table_booking_end_time: {
      type: DataTypes.TIME,
      allowNull: false
    },
    table_booking_tnc: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    is_proximity_on: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    welcome_message: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    feedback_message: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    birthday_message: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    organization_category: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    pincode: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    organization_type: {
      type: DataTypes.ENUM('GROUP','SUB-GROUP','ORGANIZATION'),
      allowNull: false
    },
    organization_group: {
      type: DataTypes.ENUM('OWNER','CUSTOMER'),
      allowNull: false
    },
    created_at: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    updated_at: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    twt_handle: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    fb_handle: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    insta_handle: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    tv_status: {
      type: DataTypes.INTEGER(2),
      allowNull: true
    }
  }, {
    tableName: 'v_venue_details',
    underscored : true,
    classMethods : {

      getVenueDetails : function(  data , success , error  ) {


        try {


          var condition = {
            'venue_id' : data.venue_id
          };

          this.find({
            where : condition,
            attributes: config.return_fields.venue_details
          }).then(function(success_data) {

            if (success_data) {

              var response = success_data.dataValues;

              if(data.last_checkin_time != null)
              {
                response.last_checkin_time = data.last_checkin_time;
              }

              return success(Response.sendResponse(true, response , null, status_codes.OK));
            } else {

              return error(Response.sendResponse(false,null,custom_message.ENTRY_NOT_PRESENT,status_codes.BAD_REQUEST));
            }

          },function(err){

            return error(Response.sendResponse(false,null,err.message,status_codes.BAD_REQUEST));
          });

        }catch(err) {

          error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
        }


      },


      getVenueTVStatus : function(  data , success , error  ) {


        try {


          var condition = {
            'venue_id' : data.venue_id
          };

          this.find({
            where : condition,
            attributes: ['tv_status']
          }).then(function(success_data) {

            if (success_data) {

              return success(Response.sendResponse(true,success_data.dataValues,null,status_codes.OK));
            } else {

              return error(Response.sendResponse(false,null,custom_message.ENTRY_NOT_PRESENT,status_codes.BAD_REQUEST));
            }

          },function(err){

            return error(Response.sendResponse(false,null,err.message,status_codes.BAD_REQUEST));
          });

        }catch(err) {

          error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
        }


      },

      getVenueDetailsForCustomer : function(  data , success , error  ) {


        try {


          var condition = {
            'venue_id' : data.venue_id
          };

          this.find({
            where : condition,
            attributes: config.return_fields.venue_customer_details
          }).then(function(success_data) {

            if (success_data) {

              return success(Response.sendResponse(true,success_data.dataValues,null,status_codes.OK));
            } else {

              return error(Response.sendResponse(false,null,custom_message.ENTRY_NOT_PRESENT,status_codes.BAD_REQUEST));
            }

          },function(err){

            return error(Response.sendResponse(false,null,err.message,status_codes.BAD_REQUEST));
          });

        }catch(err) {

          error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
        }


      },

      getAllVenues : function( success , error ) {

        this.findAll({
          //where : condition
          attributes : return_fields.venue_details
        }).then(function(success_data) {

          if (success_data) {

            return success(Response.sendResponse(true,success_data,null,status_codes.OK));
          } else {

            return error(Response.sendResponse(false,null,custom_message.ENTRY_NOT_PRESENT,status_codes.BAD_REQUEST));
          }
        },function(err){

          return error(Response.sendResponse(false,null,err.message,status_codes.BAD_REQUEST));
        });
      },


    }
  });
};
