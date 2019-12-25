"use strict";

var Response = require('../Classes/Util/Response');


module.exports = function(sequelize, DataTypes) {
    return sequelize.define('v_customer_details_for_venue', {
        customer_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        dob: {
            type: DataTypes.DATE,
            allowNull: true
        },
        total_feed_count: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            defaultValue: '0'
        },
        total_published_feed_count: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            defaultValue: '0'
        },
        twt_follower: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            defaultValue: '0'
        },
        ig_follower: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            defaultValue: '0'
        },
        facebook_follower: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            defaultValue: '0'
        },
        is_present_on_app: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            defaultValue: '0'
        },
        venue_feed_count: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        venue_published_feed_count: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        venue_id: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        is_blocked: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        is_favourite: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        is_fame: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        venue_note: {
            type: DataTypes.STRING,
            allowNull: true
        },
        check_in_count: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            defaultValue: '0'
        },
        last_checkin_time: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        last_feed_time: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        is_checkedin: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        customer_handle: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        tableName: 'v_customer_details_for_venue',
        underscored : true,
        classMethods : {


            getCustomerForVenue : function(  condition ,page , success , error  ) {

                try {

                    var offset = config.util.limit * page;

                    console.log("condition: ", condition);

                    this.findAll({
                        where: condition,
                        limit : config.util.limit,
                        offset : offset,
                        attributes: config.return_fields.customer_details
                    }).then(function(success_data){

                        success(Response.sendResponse(true,success_data,"",status_codes.OK));
                    },function(error_data){
console.log("ERROR In user: ", error_data);
                        error(Response.sendResponse(false,null,error_data.message,status_codes.BAD_REQUEST));
                    })

                }catch (err) {

                    error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
                }
            },

             getSingleCustomerForVenue : function(  condition ,page , success , error  ) {

                try {

                    console.log("condition: ", condition);

                    this.findAll({
                        where: condition,
                        attributes: config.return_fields.customer_details_scanner
                    }).then(function(success_data){

                        success(Response.sendResponse(true,success_data,"",status_codes.OK));
                    },function(error_data){
console.log("ERROR In user: ", error_data);
                        error(Response.sendResponse(false,null,error_data.message,status_codes.BAD_REQUEST));
                    })

                }catch (err) {

                    error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
                }
            },


            getCheckInVenuesForCustomer: function( data , success , error ) {

                console.log("getCheckInVenuesForCustomer"+data.customer_id);


                var condition = {
                    customer_id : data.customer_id,
                    check_in_count: { $gte : 1}
                };

                this.findAll({
                    where : condition,
                    attributes: config.return_fields.customer_details
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
