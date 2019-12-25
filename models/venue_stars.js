"use strict";

var Response = require('../Classes/Util/Response');

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('venue_stars', {
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
        tag_count: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        is_superstar: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        is_active: {
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
        tableName: 'venue_stars',
        underscored: true,
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

            updateVenueStars: function(sucess, error){

                try{
                    
                    var instance = this;
                    var updated_data = {
                        is_active : 0
                    }
                                       
                    this.update(updated_data,{
                        where : {}
                    }).then(function(data) {
                    
                            sucess(data);
                    },function(err){
                                    console.log("ERROR:", err); 
                                    error(err);
                                    //return error(Response.sendResponse(false,null,err.message,status_codes.BAD_REQUEST));
                    });
                    
                    } catch (err){
                                console.log("ERROR:", err); 
                                //return error(Response.sendResponse(false,null,err.message,status_codes.BAD_REQUEST));
                    }


            }

        }
    });
};
