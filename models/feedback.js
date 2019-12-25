"use strict";

var Response = require('../Classes/Util/Response');


module.exports = function(sequelize, DataTypes) {
    return sequelize.define('feedback', {
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
        customer_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        feedback: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        reply: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        is_perk_send: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            defaultValue: '0'
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
        tableName: 'feedback',
        underscored : true
    });
};
