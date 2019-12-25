"use strict";

var Response = require('../Classes/Util/Response');

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('features', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        type: {
            type: DataTypes.STRING,
            allowNull: true
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
        tableName: 'features',
        underscored : true,
        classMethods : {

            getFeatureId : function(condition,success,error){

                try {

                    console.log("data="+JSON.stringify(condition));

                    this.find({
                        where : condition
                    }).then(function (data) {



                        if( data )
                            success(data.dataValues);
                        else
                            error(false);

                        //callback(Response.sendResponse(true,StatusCodes.OK,data,null));
                    },function(err){
                        console.log("err="+JSON.stringify(err));
                        error(false);
                        //callback(Response.sendResponse(false,StatusCodes.BAD_REQUEST,null,err.message));
                    });

                }catch (err) {

                    error(false);
                    //callback(Response.sendResponse(false,StatusCodes.INTERNAL_SERVER_ERROR,null,err.message));
                }
            },


            getAllEntries : function( success , error  ) {

                try {

                    this.findAll().then(function(success_data){

                        success(Response.sendResponse(true,success_data,null));
                    },function(err){

                        error(Response.sendResponse(false,null,err.message));
                    })
                }catch (err) {

                    error(Response.sendResponse(false,null,err.message));
                }
            },

            //  Create entry into database
            createEntry : function (data, success,error) {

                try {

                    var condition = {
                        name : data.name
                    };

                    var instance = this;

                    console.log("Data to update: ", data);

                    this.build(data);

                    this.findOrCreate(
                        {
                            where: condition,
                            defaults : data
                        })
                        .then(function (created_data) {

                            console.log("Created Data: ", created_data);

                                instance.getAllEntries(function( success_data  ) {


                                    //console.log(success_data.message);
                                    //success_data.message = custom_message.FEATURE_CREATED;
                                    success(success_data);
                                }, function(error_data) {

                                    error(error_data);
                                });

                                //console.log(created_data[0].dataValues);
                                //Response.sendReplyWithResponse(true, StatusCodes.CREATED, created_data, "",callback);
                                //success(Response.sendResponse(true,created_data[0].dataValues,""));
                            }, function (err) {

                                error(Response.sendResponse(false,null,err.message));
                                //Response.sendResponse(false, StatusCodes.BAD_REQUEST, null, err.message,callback);
                            }
                        );
                } catch (err) {

                    error(Response.sendResponse(false,null,err.message));
                }
            }
        }
    });
};
