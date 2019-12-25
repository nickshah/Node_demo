"use strict";

var Response = require('../Classes/Util/Response');


module.exports = function(sequelize, DataTypes) {
    return sequelize.define('venue_perks', {
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
            type: DataTypes.STRING,
            allowNull: false
        },
        f_end_time: {
            type: DataTypes.STRING,
            allowNull: false
        },
        s_start_time: {
            type: DataTypes.STRING,
            allowNull: true
        },
        s_end_time: {
            type: DataTypes.STRING,
            allowNull: true
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
        tableName: 'venue_perks',
        underscored : true,
        classMethods : {

            insertMultipleRecords : function ( array_data , success , error ) {

                try {

                    this.bulkCreate(array_data)
                        .then(function(response){

                            success(Response.sendResponse(true,response,custom_message.VENUE_PERKS_ADDED,status_codes.OK));
                        }).catch(function(err){


                        console.log(err.message);


                        error(Response.sendResponse(false,null,err.message,status_codes.PRECONDITION_FAILED));
                    });
                }catch (err){

                    error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
                }
            },


            getPerksForVenue : function( data , success , error   ){

                try {

                    var condition = {
                        'venue_id' : data.venue_id,
                        is_enabled : 1,
                        is_customer_perk : 0
                    };

                    sequelize.query("(SELECT * FROM `venue_perks` WHERE `is_customer_perk`=0 AND `venue_id` = " + data.venue_id + " AND `name` NOT LIKE '%Special%') UNION (SELECT * FROM `venue_perks` WHERE `is_customer_perk`=0 AND `venue_id` = " + data.venue_id + " AND `name` LIKE 'Special' ORDER BY `id` LIMIT 1);", { type: sequelize.QueryTypes.SELECT })
                        .then(function(success_data){
                            console.log("success_drop: ", success_data);
                            success(Response.sendResponse(true,success_data,"",status_codes.OK));
                        }, function(error_data){
                            console.log("error_drop: ", error_data);
                            error(Response.sendResponse(false,null,error_data.message,status_codes.BAD_REQUEST));
                        });

                }catch (err) {

                    error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
                }
            },


            getCustomPerksForVenue : function( data , success , error   ){

                try {

                    var condition = {
                        'venue_id' : data.venue_id,
                        is_customer_perk : 0,
                        name : config.util.custom_perk_name
                    };

                    this.find({
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


            updatePerksForVenue : function( updated_data , success , error ) {

                try {

                    var condition = {
                        id : updated_data.id
                    };

                    this.find({
                        where : condition
                    }).then(function(data) {

                        if (data) {

                            console.log("In updated",updated_data);

                            data.updateAttributes(updated_data)
                                .then(function () { 

                                    success(Response.sendResponse(true,null,custom_message.ENTRY_UPDATED,status_codes.OK));
                                },function(err) {

                                    error(Response.sendResponse(false,null,err.message,status_codes.BAD_REQUEST));
                                    return 0;
                                })
                        } else {

                            error(Response.sendResponse(false,null,custom_message.ENTRY_NOT_PRESENT,status_codes.BAD_REQUEST));
                            return 0;
                        }
                    },function(err){

                        error(Response.sendResponse(false,null,err.message,status_codes.BAD_REQUEST));
                        return 0;
                    });
                }catch (err) {

                    error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
                    return 0;
                }
            },


            checkPerkIsEnabledOrNotForVenue : function( data , success ,error ) {

                try {

                    var condition = {
                        'name' : data.name,
                        'venue_id' : data.venue_id

                    };

                    console.log(condition);

                    this.find({
                        where : condition
                    }).then(function(data) {

                        if (data) {

                            return success( Response.sendResponse(true,data.dataValues,null,status_codes.OK) );
                        } else {


                            console.log("status");

                            return error(Response.sendResponse(false,null,custom_message.ENTRY_NOT_PRESENT,status_codes.BAD_REQUEST));
                        }
                    },function(err){

                        return error(Response.sendResponse(false,null,err.message,status_codes  .BAD_REQUEST));
                    });


                }catch (err) {

                    return error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
                }

            },

           createPerkReplica : function ( data , success , error ) {

                try {

                    var inserted_perk_id = 0;
                    var table_name = "tbl_venue_perks_replica_temp_" + Date.now() + "_" + data.id;
                    sequelize.query("CREATE TABLE " + table_name + " SELECT * FROM `venue_perks` WHERE `id` = " + data.id + ";", { type: sequelize.QueryTypes.RAW })
                        .then(function(success_data){
                            console.log("success_data: ", success_data);
                            sequelize.query("UPDATE " + table_name + " SET `id` = NULL, `created_at` = NOW(), `updated_at` = NOW(), is_customer_perk=1;", { type: sequelize.QueryTypes.UPDATE })
                                .then(function(success_update){
                                    console.log("success_update: ", success_update);
                                    sequelize.query("INSERT INTO `venue_perks` SELECT * FROM " + table_name + ";", { type: sequelize.QueryTypes.INSERT })
                                        .then(function(success_insert){
                                        console.log("success_insert: ", success_insert);
                                        inserted_perk_id = success_insert;
                                        sequelize.query("DROP TABLE IF EXISTS " + table_name + ";", { type: sequelize.QueryTypes.RAW })
                                            .then(function(success_drop){
                                        console.log("success_drop: ", success_drop);
                                        success(inserted_perk_id);
                                        }, function(error_drop){
                                        console.log("error_drop: ", error_drop);
                                    });
                            }, function(error_insert){
                                console.log("error_insert: ", error_insert);
                            });
                    }, function(error_update){
                        console.log("error_update: ", error_update);
                    });

                     },function(error_data){
                    console.log("Error Data: ", error_data);
                });
                }catch (err){

                    console.log("err: ", err);

                    error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
                }
        },

        isStarPerkEnabled : function ( data , success , error ) {
            
                try {

                    sequelize.query("SELECT sum(is_enabled) as isStarEnabled FROM tagloy.venue_perks where venue_id="+data.venue_id+" AND ( name LIKE 'Superstar' OR name LIKE 'Star' )")
                    .then(function (success_data) {

                        success(success_data);

                    }, function (error_data) {

                        error(error_data);
                    })


                }catch(err){
                        console.log("ERROR while checking isStarPerkEnabled");
                }
        }
        }
    });
};



/*
 select
 vp.name,
 vp.type,
 vp.offer_type,
 vp.description as description,
 vp.amount as amount,
 vp.expiry as expiry,
 vp.tag_count as tag_count,
 vp.check_in_count as check_in_count,
 vp.valid_on as valid_on,
 vp.f_start_time as f_start_time,
 vp.f_end_time as f_end_time,
 vp.s_start_time as s_start_time,
 vp.s_end_time as s_end_time,
 vp.message as message,
 vp.sponsorer as sponsorer,
 vp.terms as terms,
 vpc.id IS NOT NULL as is_present
 from venue_perks as vp
 LEFT JOIN
 venue_perk_customer_mapping as vpc
 on
 vpc.venue_perk_id = vp.id and
 vpc.customer_id = 15
 where vp.is_enabled = 1  and venue_id = 36
 group by vp.id
 */


/*
 Get specials and events for venue
 */

/*
 Get feed count and published feed count for customer id and venue id
 */