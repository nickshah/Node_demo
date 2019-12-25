"use strict";

var Response = require('../Classes/Util/Response');

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('organization_role_feature_mapping', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        organization_group: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        role_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        feature_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        parent_id: {
            type: DataTypes.INTEGER(11),
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
        tableName: 'organization_role_feature_mapping',
        underscored : true,
        classMethods : {

            getEntries : function(condition,callback){

                try {

                    this.find({
                        where : condition
                    }).then(function (data) {

                        if( data )
                            callback(true);
                        else
                            callback(false);

                        //callback(Response.sendResponse(true,StatusCodes.OK,data,null));
                    },function(err){

                        callback(false);
                        //callback(Response.sendResponse(false,StatusCodes.BAD_REQUEST,null,err.message));
                    });

                }catch (err) {

                    callback(false);
                    //callback(Response.sendResponse(false,StatusCodes.INTERNAL_SERVER_ERROR,null,err.message));
                }
            },

            //getAllEntries : function( success , error  ) {
            //
            //    try {
            //
            //        this.findAll().then(function(success_data){
            //
            //            success(Response.sendResponse(true,success_data,null));
            //        },function(err){
            //
            //            error(Response.sendResponse(false,null,err.message));
            //        })
            //    }catch (err) {
            //
            //        error(Response.sendResponse(false,null,err.message));
            //    }
            //},


            //  Create entry into database
            createEntry: function (data, success,error) {

                try {

                    var instance = this;

                    var condition = {
                        organization_group : data.organization_group,
                        role_id : data.role_id,
                        feature_id : data.feature_id
                    };

                    this.build(data);

                    this.findOrCreate(
                        {
                            where: condition,
                            defaults : data
                        })
                        .then(function (created_data) {

                                success(Response.sendResponse(true,null,created_data));
                            }, function (err) {

                                error(Response.sendResponse(false,null,err.message));
                            }
                        );
                } catch (err) {

                    error(Response.sendResponse(false,null,err.message));
                }
            },

            getFeatureForRole : function(features, data, success, error){
                try {

                    //var features = server._plugins['hapi-sequelize'].new_tagloy.rbac.models.features;

                    this.belongsTo(features);

                    var condition = {
                        role_id : data.role_id
                    };

                    var instance = this;

                    this.findAll({

                        include: [
                            {
                                model: features,
                                required: true,
                                attributes  : [
                                    ['name', 'name'],
                                    ['id', 'feature_id'],
                                    ['type', 'type']
                                ]
                            }
                        ],
                        where: condition,
                        attributes  : ['role_id']

                    }).then(function (data) {

                        var tempList = [];
                        for(var i = 0; i < data.length; i++)
                        {
                            var temp = data[i].feature.dataValues;
                            temp.role_id = data[i].dataValues.role_id;
                            tempList.push(temp);
                        }
                        console.log(tempList);
                        success(tempList);

                    },function(err){

                        console.log(err.message);
                        error(err.message);

                        //callback(Response.sendResponse(false,StatusCodes.BAD_REQUEST,null,err.message));
                    });

                } catch(err){
                    error(Response.sendResponse(false,null,err.message));
                }
            }
        }
    });
};
