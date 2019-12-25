"use strict";

var Response = require('../Classes/Util/Response');


module.exports = function(sequelize, DataTypes) {
    return sequelize.define('perks', {
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
        type: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        offer_type: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        amount: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        expiry: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        tag_count: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        check_in_count: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        valid_on: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        f_start_time: {
            type: DataTypes.DATE,
            allowNull: false
        },
        f_end_time: {
            type: DataTypes.DATE,
            allowNull: false
        },
        s_start_time: {
            type: DataTypes.DATE,
            allowNull: false
        },
        s_end_time: {
            type: DataTypes.DATE,
            allowNull: false
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        sponsorer: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        terms: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        is_enabled: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '1'
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
        tableName: 'perks',
        underscored : true,
        classMethods : {

            getAllEntries : function( data , success , error   ){

                try {

                    var condition = {
                        //'venue_id' : data.venue_id
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



        }
    });
};
