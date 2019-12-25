"use strict";

var Response = require('../Classes/Util/Response');
var VenueStarsView = require('../Classes/Db/VenueStarsView')

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('customer', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
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
        gender: {
            type: DataTypes.STRING,
            allowNull: true
        },
        image_url : {
            type: DataTypes.STRING,
            allowNull: true
        },
        is_active: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            defaultValue: '1'
        },
        feed_count: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            defaultValue: '0'
        },
        published_feed_count: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            defaultValue: '0'
        },
        twt_follower: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            defaultValue: '0'
        },
        facebook_follower: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            defaultValue: '0'
        },
        ig_follower: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            defaultValue: '0'
        },
        notification_flag: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            defaultValue: '1'
        },
        is_present_on_app: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            defaultValue: '0'
        },
        tags: {
            type: DataTypes.STRING,
            allowNull: true
        },
        device_type: {
            type: DataTypes.STRING,
            allowNull: true
        },
        device_token: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: true
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: true
        },
        fb_preferences : {
            type: DataTypes.STRING,
            allowNull: true
        },
        about_me : {
            type: DataTypes.STRING,
            allowNull: true
        },
        profession : {
            type: DataTypes.STRING,
            allowNull: true
        }

    }, {
        tableName: 'customer',
        underscored : true,
        classMethods : {



            //  Create entry into database
            createEntry: function (data, success,error) {

                try {

                    var condition = {
                        customer_id : data.customer_id
                    };

                    console.log(data);

                    this.build(data);

                    this.findOrCreate(
                        {
                            where: condition,
                            defaults : data
                        })
                        .then(function (created_data) {

                                console.log(created_data[0].dataValues);

                                //Response.sendReplyWithResponse(true, StatusCodes.CREATED, created_data, "",callback);
                                success(Response.sendResponse(true,created_data[0].dataValues,"",status_codes.OK));
                            }, function (err) {

                                error(Response.sendResponse(false,null,err.message,status_codes.BAD_REQUEST));
                                //Response.sendResponse(false, StatusCodes.BAD_REQUEST, null, err.message,callback);
                            }
                        );
                } catch (err) {

                    error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
                }
            },

            getUser : function (customer_id, success, error) {
                try{
                    var condition = {
                        'customer_id' : customer_id
                    };

                    console.log("condition: ", condition);

                    this.find({
                        where: condition
                    }).then(function(success_data){

                        console.log("success_data: ", success_data);

                        success(Response.sendResponse(true,success_data,"",status_codes.OK));
                    },function(error_data){

                        error(Response.sendResponse(false,null,error_data.message,status_codes.BAD_REQUEST));
                    })

                }  catch (err){
                    error(Response.sendResponse(false,null,error_data.message,status_codes.BAD_REQUEST));
                }
            },


            updateEntry : function(  condition , updated_data, success , error  ) {

                try {

                    this.find({
                        where : condition
                    }).then(function(data) {

                        if (data) {

                            data.updateAttributes(updated_data)
                                .then(function () {

                                    return success(Response.sendResponse(true,null,custom_message.ENTRY_UPDATED,status_codes.OK));
                                },function(err) {

                                    return error(Response.sendResponse(false,null,err.message,status_codes.BAD_REQUEST));
                                })
                        } else {

                            return error(Response.sendResponse(false,null,custom_message.ENTRY_NOT_PRESENT,status_codes.BAD_REQUEST));
                        }
                    },function(err){

                        return error(Response.sendResponse(false,null,err.message,status_codes.BAD_REQUEST));
                    });

                }catch (err) {

                    return error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
                }
            },

            getStats : function (data, success, error) {
                sequelize.query("SELECT t1.feed_count, t1.check_in_count, t2.perk_count FROM (SELECT customer_id, SUM(published_feed_count) as feed_count, SUM(check_in_count) as check_in_count FROM venue_customer_mapping where customer_id="+data.customer_id+" GROUP BY customer_id) as t1 JOIN (SELECT count(*) as perk_count FROM venue_perk_customer_mapping WHERE customer_id="+data.customer_id+") as t2", { type: sequelize.QueryTypes.SELECT })
                    .then(function(result) {

                        //console.log(result);

                        if (result && result.length > 0) {

                             var vs = new VenueStarsView(data);

                             vs.getVenueStarsForCustomer(function (success_data) {
                                 //console.log("stars"+JSON.stringify(success_data));
                                 result[0].star_at = success_data.result;
                                 return success(Response.sendResponse(true,result[0],null,status_codes.OK));
                             }, function (err) {
                                 return error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
                             });

                            //console.log(result);

                        } else {

                            return error(Response.sendResponse(false,null,custom_message.ENTRY_NOT_PRESENT,status_codes.BAD_REQUEST));
                        }

                    });
            }


        }
    });
};
