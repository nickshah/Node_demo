"use strict";

var Response = require('../Classes/Util/Response');

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('tagtv', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        venue_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        media_url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.ENUM('IMAGE','VIDEO','GIF','BANNER'),
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
        tableName: 'tagtv',
        underscored : true,
        classMethods : {

            createEntry: function (data, success,error) {

                try {

                    this.build(data);

                    this.create(data)
                        .then(function (created_data) {

                                success(Response.sendResponse(true,created_data.dataValues,custom_message.ENTRY_ADDED,status_codes.OK));
                            }, function (err) {

                                error(Response.sendResponse(false,null,err.message,status_codes.BAD_REQUEST));
                            }
                        );
                } catch (err) {

                    error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
                }
            },

            getEntriesForVenue : function( data , success , error   ){

                try {

                    var condition = {
                        'venue_id' : data.venue_id,
                    };

                    this.findAll({
                        where : condition
                    }).then(function(success_data){

                        success(Response.sendResponse(true,success_data,"",status_codes.OK));
                    },function(error_data){

                        error(Response.sendResponse(false,null,error_data.message,status_codes.BAD_REQUEST));
                    })

                }catch (err) {

                    error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
                }
            },


            deleteEntry : function(data , success ,  error) {

                try {

                    var instance = this;

                    var condition = {
                        id : data.id
                    };

                    this.destroy({
                            where: condition
                        }
                    ).then(function () {

                        instance.getEntriesForVenue(data,function(success_data){

                            success_data.message = custom_message.ENTRY_DELETED;
                            success(success_data);
                        },function(error_data){

                            error(error_data);
                        });
                    },function(err){

                        error(Response.sendResponse(false,null,err.message,status_codes.BAD_REQUEST));
                        return 0;
                    });
                }catch (err) {

                    error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
                    return 0;
                }
            }







        }
    });
};
