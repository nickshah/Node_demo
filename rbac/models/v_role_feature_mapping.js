"use strict";

var Response = require('../Classes/Util/Response');


module.exports = function(sequelize, DataTypes) {
    return sequelize.define('v_role_feature_mapping', {
        role_feature_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        role_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        feature_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        organization_group: {
            type: DataTypes.STRING,
            allowNull: false
        },
        feature_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role_name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'v_role_feature_mapping',
        underscored : true,
        classMethods : {

            getAllEntries : function( success , error  ) {

                try {

                    this.findAll({

                        attributes: [
                            'role_feature_id',
                            'role_id',
                            'feature_id',
                            'feature_name',
                            'role_name',
                            'organization_group'
                        ]

                    }).then(function(success_data){

                        success(Response.sendResponse(true,success_data,null));
                    },function(err){

                        error(Response.sendResponse(false,null,err.message));
                    })
                }catch (err) {

                    error(Response.sendResponse(false,null,err.message));
                }
            }
        }
    });
};
