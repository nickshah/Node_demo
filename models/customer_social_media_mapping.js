var Response = require('../Classes/Util/Response');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('customer_social_media_mapping', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
        primaryKey: true,
      autoIncrement: true
    },
    customer_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    social_media_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    auth_token: {
      type: DataTypes.STRING,
      allowNull: true
    },
    app_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
    secret_key: {
      type: DataTypes.STRING,
      allowNull: true
    },
    handle: {
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
    tableName: 'customer_social_media_mapping',
    underscored : true,
    classMethods : {


      checkHandlePresent : function(condition,success,error) {

        try {

          this.find({
            where: condition
          }).then(function(success_data){

            if( success_data )
              success(Response.sendResponse(true,success_data.dataValues,"",status_codes.OK));
            else
              error(Response.sendResponse(false,null,custom_message.CUSTOMER_SOCIAL_MEDIA_MAPPING_NOT_PRESENT,status_codes.BAD_REQUEST));

          },function(error_data){

            error(Response.sendResponse(false,null,error_data.message,status_codes.BAD_REQUEST));
          })

        }catch (err) {

          error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
        }
      },

      updateCustomerIds: function (data, success, error) {
        try{

            sequelize.query('CALL UPDATE_CUSTOMER_IDS (:cus_id, :old_cus_id)',
                {replacements: { cus_id: data.cus_id, old_cus_id: data.old_cus_id }}).then(function(response){
                //res.json(response);
                success(Response.sendResponse(true,response,"",status_codes.OK));
            }).error(function(err){
                //res.json(err);
                error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
            });

        } catch (err){
            error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
        }
      },

      createEntry: function (data, success,error) {

        try {

          console.log(data);

          var condition = {
            customer_id : data.customer_id,
            handle : data.handle,
            social_media_id : data.social_media_id
          };

          console.log("CSMM condition: ", condition);

          this.build(data);

          this.findOrCreate({
                where : condition,
                defaults:data
              })
              .then(function (created_data) {

                    success(Response.sendResponse(true,created_data[0].dataValues,custom_message.ENTRY_ADDED,status_codes.OK));
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
