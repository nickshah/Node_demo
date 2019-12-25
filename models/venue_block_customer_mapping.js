var Response = require('../Classes/Util/Response');

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('venue_block_customer_mapping', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        venue_id: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        venue_hashtag: {
            type: DataTypes.STRING,
            allowNull: true
        },
        customer_id: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        user_fb_handle: {
            type: DataTypes.STRING,
            allowNull: true
        },
        user_twt_handle: {
            type: DataTypes.STRING,
            allowNull: true
        },
        user_ig_handle: {
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
        tableName: 'venue_block_customer_mapping',
        underscored : true,
        classMethods : {

            checkEntryPresent : function(condition,success,error) {

                try {

                    this.find({
                        where: condition
                    }).then(function(success_data){

                        if( success_data )
                            error(Response.sendResponse(false,null,custom_message.CUSTOMER_BANNED_FOR_VENUE,status_codes.BAD_REQUEST));
                        else
                            success(Response.sendResponse(true,success_data,"",status_codes.OK));

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


                                success(Response.sendResponse(true,null,custom_message.USER_IS_BANNED_FOR_USER,status_codes.OK));
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
