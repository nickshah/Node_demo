/* jshint indent: 2 */
"use strict";

var Response = require('../Classes/Util/Response');
var async = require('async');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('customer_notification', {
    id: {
      type: DataTypes.INTEGER(255),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    customer_id: {
      type: DataTypes.INTEGER(255),
      allowNull: false
    },
    notification_data_json: {
      type: DataTypes.TEXT,
      allowNull: false
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
    tableName: 'customer_notification',
    underscored : true,
    classMethods : {

      getCustomerNotification : function (customer_id, success, error) {
        try{
          var condition = {
            'customer_id' : customer_id
          };

          this.findAll({
            where: condition
          }).then(function(success_data){

            console.log("success_data: ", success_data);

            success(Response.sendResponse(true,success_data,"",status_codes.OK));
          },function(error_data){

            error(Response.sendResponse(false,null,error_data.message,status_codes.BAD_REQUEST));
          });


        }  catch (err){
          error(Response.sendResponse(false,null,error_data.message,status_codes.BAD_REQUEST));
        }
      },


      addCustomerNotification : function (customer_notification_array, success, error) {
        try{

          var instance = this;
          async.each(customer_notification_array, function(item, done, callback){

            console.log("item: ", item);

            instance.create(item)
                .then(function (success_insert_data) {

                  console.log("success_insert_data: ", success_insert_data);

                  success(true);

                }, function(error_inert_data){

                  console.log("error_inert_data: ", error_inert_data);

                  error(false);
                });

          }, function (err) {

            console.log("err: ", err);
            if (err) {

              callback(err);
            }
          });


        }  catch (error_data){
          console.log("error_data: ", error_data);

          error(Response.sendResponse(false,null,error_data.message,status_codes.BAD_REQUEST));
        }
      }
    }
  });
};
