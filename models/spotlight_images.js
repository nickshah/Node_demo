"use strict";

var Response = require('../Classes/Util/Response');

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('spotlight_images', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        spotlight_id: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true
        },
        type: {
            type: DataTypes.ENUM('IMAGE','VIDEO'),
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
        tableName: 'spotlight_images',
        underscored : true,
        classMethods : {

            //  Create entry into database
            createEntry : function( data , success, error) {

                try {
                    this.build(data);

                    this.create(data)
                        .then(function (created_data) {

                                success(Response.sendResponse(true,created_data,null,status_codes.OK));
                                return 0;
                            },function(err) {

                                error(Response.sendResponse(false,null,err.message,status_codes.BAD_REQUEST));
                                return 0;
                            }
                        );
                }catch (err) {

                    error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
                    return 0;
                }
            },


            getImagesForSpotlight : function( data , success , error ) {

                try {

                    var condition = {

                        spotlight_id : data.spotlight_id
                    };

                    this.findAll({
                        where: condition
                    }).then(function (success_data) {

                        success(Response.sendResponse(true, success_data, "", status_codes.OK));
                    }, function (error_data) {

                        error(Response.sendResponse(false, null, error_data.message, status_codes.BAD_REQUEST));
                    })


                }catch (err) {

                    error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
                    return 0;
                }

            }




        }
    });
};
