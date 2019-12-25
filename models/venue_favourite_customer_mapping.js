var Response = require('../Classes/Util/Response');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('venue_favourite_customer_mapping', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    customer_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    venue_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
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
    tableName: 'venue_favourite_customer_mapping',
    underscored : true,
    classMethods : {

      checkEntryPresent : function(condition,success,error) {

        try {

          this.find({
            where: condition
          }).then(function(success_data){

            if( success_data )
              success(Response.sendResponse(true,success_data,"",status_codes.OK));
            else
              error(Response.sendResponse(false,null,custom_message.ENTRY_NOT_PRESENT,status_codes.BAD_REQUEST));


          },function(error_data){

            error(Response.sendResponse(false,null,error_data.message,status_codes.BAD_REQUEST));
          })

        }catch (err) {

          error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
        }
      },

      createEntry: function (data, success,error) {

        try {

          console.log(data);

          this.build(data);

          this.create(data)
              .then(function (created_data) {

                    success(Response.sendResponse(true,created_data,"",status_codes.OK));
                  }, function (err) {

                    console.log(err.message);

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
