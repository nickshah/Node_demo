"use strict";

var Response = require('../Classes/Util/Response');

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('v_venue_stars', {
        customer_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        star_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        },
        is_superstar: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        venue_published_feed_count: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        venue_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        }
        /*,
        handle: {
            type: DataTypes.STRING,
            allowNull: true
        }*/
    }, {
        tableName: 'v_venue_stars',
        underscored : true,
        classMethods  : {


            getVenueStars : function(  data , success , error  ) {

                try {

                    var condition = {
                        'venue_id' : data.venue_id,
                        'is_active' : 1
                    };

                    var offset = config.util.limit * data.page;

                    this.findAll({
                        where: condition,
                        attributes: config.return_fields.venue_star_details,
                        limit: 3,
                        order: [['star_id', 'DESC']]
                    }).then(function(success_data){

                        success(Response.sendResponse(true,success_data,"",status_codes.OK));
                    },function(error_data){

                        error(Response.sendResponse(false,null,error_data.message,status_codes.BAD_REQUEST));
                    })

                }catch (err) {

                    error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
                }
            },


            getVenueStarsForCustomer : function(  data , success , error  ) {
                
                                try {
                
                                    var condition = {
                                        'customer_id' : data.customer_id
                                    };
                
                                    //var offset = config.util.limit * data.page;
                
                                    this.findAll({
                                        where: condition,
                                        attributes: config.return_fields.venue_star_details
                                    }).then(function(success_data){
                
                                        success(Response.sendResponse(true,success_data,"",status_codes.OK));
                                    },function(error_data){
                
                                        error(Response.sendResponse(false,null,error_data.message,status_codes.BAD_REQUEST));
                                    })
                
                                }catch (err) {
                
                                    error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
                                }
            }

        }
    });
};
