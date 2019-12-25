"use strict";

var Response = require('../Classes/Util/Response');


module.exports = function(sequelize, DataTypes) {
    return sequelize.define('v_customer_checkin_details', {
        customer_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        venue_id: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        hash_tag: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: '0'
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: '0'
        },
        latitude: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: '0'
        },
        longitude: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: '0'
        },
        logo: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: '0'
        },
        perk_name: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: '0'
        },
        perk_type: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        requiredCheckins: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        check_in_count: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        }
    }, {
        tableName: 'v_customer_checkin_details',
        underscored : true,
        classMethods : {

            getCheckInVenuesForCustomer: function( data , success , error ) {

                console.log("getCheckInVenuesForCustomer"+data.customer_id);


                var condition = {
                    customer_id : data.customer_id
                };

                this.findAll({
                    where : condition,
                    attributes: config.return_fields.customer_checkin_details
                }).then(function(success_data) {

                    if (success_data) {

                        return success(Response.sendResponse(true,success_data,null,status_codes.OK));
                    } else {

                        return error(Response.sendResponse(false,null,custom_message.ENTRY_NOT_PRESENT,status_codes.BAD_REQUEST));
                    }
                },function(err){

                    return error(Response.sendResponse(false,null,err.message,status_codes.BAD_REQUEST));
                });
            }

        }
    });
};
