"use strict";

var Response = require('../Classes/Util/Response');
var RedisClient = require('../Classes/Util/RedisClient');
var gd = require('node-gd');
var ImageUpload = require('../Classes/Util/UploadFile');
var fs = require('fs');
var pixelWidth = require('../util/string-pixel-width-custom');
var ServerDetails = require('../config/server_details');


module.exports = function(sequelize, DataTypes) {
    return sequelize.define('venue', {
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
            allowNull: true
        },
        hash_tag: {
            type: DataTypes.STRING,
            allowNull: true
        },
        start_time: {
            type: DataTypes.STRING,
            allowNull: true
        },
        end_time: {
            type: DataTypes.STRING,
            allowNull: true
        },
        start_time_2: {
            type: DataTypes.STRING,
            allowNull: true
        },
        end_time_2: {
            type: DataTypes.STRING,
            allowNull: true
        },
        open_on: {
            type: DataTypes.STRING,
            allowNull: true
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        latitude: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        longitude: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        phone_number: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        is_black_board: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            defaultValue: '0'
        },
        black_board_json: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        auto_approval: {
            type: DataTypes.STRING,
            allowNull: false
        },
        auto_approval_spotlights: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '0'
        },
        tags: {
            type: DataTypes.STRING,
            allowNull: true
        },
        logo: {
            type: DataTypes.STRING,
            allowNull: true
        },
        beacon_ids: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        banners: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        is_table_booking_allowed: {
            type: DataTypes.STRING,
            allowNull: true
        },
        table_booking_allowed_on: {
            type: DataTypes.STRING,
            allowNull: true
        },
        first_table_booking_start_time: {
            type: DataTypes.STRING,
            allowNull: true
        },
        first_table_booking_end_time: {
            type: DataTypes.STRING,
            allowNull: true
        },
        second_table_booking_start_time: {
            type: DataTypes.STRING,
            allowNull: true
        },
        second_table_booking_end_time: {
            type: DataTypes.STRING,
            allowNull: true
        },
        table_booking_tnc: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        is_proximity_on: {
            type: DataTypes.STRING,
            allowNull: true
        },
        welcome_message: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        feedback_message: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        birthday_message: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        social_media_message: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        is_grouping_feature: {
            type: DataTypes.STRING,
            allowNull: true
        },
        plan: {
            type: DataTypes.STRING,
            allowNull: true
        },
        city: {
            type: DataTypes.STRING,
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
        subscription_expiry_date: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        tableName: 'venue',
        underscored : true,
        classMethods : {

            //  Create entry into database
            createEntry: function (data, success,error) {

                try {

                    this.build(data);

                    this.create(data)
                        .then(function (created_data) {

                                var redis_data = {
                                    id : created_data.dataValues.venue_id,
                                    auto_approval:  created_data.dataValues.auto_approval
                                };

                                var redis_key = ServerDetails.redis_prefix+created_data.dataValues.hash_tag;
                                RedisClient.setData(redis_key.toLowerCase(),JSON.stringify(redis_data));

                                return success(Response.sendResponse(true,created_data,custom_message.VENUE_ON_BOARDED,status_codes.OK));
                            }, function (err) {

                                return error(Response.sendResponse(false,null,err.message,status_codes.BAD_REQUEST));
                                //Response.sendResponse(false, StatusCodes.BAD_REQUEST, null, err.message,callback);
                            }
                        );
                } catch (err) {

                    return error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
                }
            },


            checkHashTag : function(venue_id, hash_tag,success,error) {

                try {

                    
                    var condition = {
                        'hash_tag' : hash_tag
                    };

                    var con = {
                        "$ne" : venue_id
                    };

                    if(venue_id!=null){
                            condition.venue_id = con;
                    }

                    this.find({
                        where: condition
                    }).then(function(success_data){

                        if( success_data )
                            error(Response.sendResponse(false,null,custom_message.HASH_TAG_ALREADY_PRESENT,status_codes.BAD_REQUEST));
                        else
                            return success(Response.sendResponse(true,null,null,status_codes.OK));

                    },function(error_data){

                        return error(Response.sendResponse(false,null,error_data.message,status_codes.BAD_REQUEST));
                    })


                }catch (err) {

                    return error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
                }
            },


            updateBlackBoard( data , success , error ) {

                try {

                    var condition = {
                        venue_id : data.venue_id,
                    };


                    var updated_data = {
                        venue_id : data.venue_id,
                        is_black_board : data.is_black_board,
                        black_board_json : data.black_board_json
                    };
                    var parent_data = data;

                    var instance = this;

                    this.find({
                        where : condition
                    }).then(function(data) {

                        if (data) {
                            var blackboard_data = JSON.parse(updated_data.black_board_json);

                            if(blackboard_data.heading!=''){
                            var black_board_image = instance.generateImage(data, blackboard_data, function(image_data){

                                blackboard_data.image = image_data.result.filename;

                                updated_data.black_board_json = JSON.stringify(blackboard_data);

                                if(parent_data.is_preview==0){
                                data.updateAttributes(updated_data)
                                    .then(function (success_data) {

                                        var response_data = {
                                            venue_id : success_data.venue_id,
                                            is_black_board : success_data.is_black_board,
                                            black_board_json : success_data.black_board_json
                                        };

                                        return success(Response.sendResponse(true,response_data,custom_message.ENTRY_UPDATED,status_codes.OK));
                                    },function(err) {

                                        return error(Response.sendResponse(false,null,err.message,status_codes.BAD_REQUEST));
                                    })
                                }else{
                                    var response_data = {
                                        venue_id : parent_data.venue_id,
                                        is_black_board : parent_data.is_black_board,
                                        black_board_json : updated_data.black_board_json
                                    };
                                    return success(Response.sendResponse(true,response_data,custom_message.ENTRY_UPDATED,status_codes.OK));
                                    
                                }

                            });
                            }else{
                                updated_data.black_board_json = JSON.stringify(blackboard_data);
                                data.updateAttributes(updated_data)
                                    .then(function (success_data) {

                                        var response_data = {
                                            venue_id : success_data.venue_id,
                                            is_black_board : success_data.is_black_board,
                                            black_board_json : success_data.black_board_json
                                        };

                                        return success(Response.sendResponse(true,response_data,custom_message.ENTRY_UPDATED,status_codes.OK));
                                    },function(err) {

                                        return error(Response.sendResponse(false,null,err.message,status_codes.BAD_REQUEST));
                                    })
                            }
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



            updateEntry( updated_data , success , error ) {

                try {

                    var condition = {
                        venue_id : updated_data.venue_id
                    };

                    var v_venue_details = server._plugins['hapi-sequelize'].new_tagloy.models.v_venue_details;

                    console.log("Before Upload: ", updated_data);

                    this.find({
                        where : condition
                    }).then(function(data) {

                        if (data) {

                            console.log("Updated Data", data);;

                            data.updateAttributes(updated_data)
                                .then(function (success_data) {

                                    //console.log("Success Data: ", success_data);

                                    var redis_data = {
                                        id :updated_data.venue_id,
                                        auto_approval:  updated_data.auto_approval
                                    };

                                    var redis_key = ServerDetails.redis_prefix+updated_data.hash_tag;
                                    RedisClient.setData(redis_key,JSON.stringify(redis_data));

                                    v_venue_details.getVenueDetails(condition, function(venue_details_success){
                                        return success(Response.sendResponse(true,venue_details_success.result,custom_message.ENTRY_UPDATED,status_codes.OK));
                                    }, function(venue_details_error){
                                        return success(Response.sendResponse(true,success_data,custom_message.ENTRY_UPDATED,status_codes.OK));
                                    });
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


            getBlackBoard : function( data , success , error ) {

                var condition = {
                    venue_id : data.venue_id
                };

                console.log("Get Blackboard: ", this);

                this.find({
                    where : condition,
                    attributes : ['venue_id', 'is_black_board', 'black_board_json']
                }).then(function(success_data) {

                    if (success_data) {

                        return success(Response.sendResponse(true,success_data.dataValues,null,status_codes.OK));
                    } else {

                        return error(Response.sendResponse(false,null,custom_message.ENTRY_NOT_PRESENT,status_codes.BAD_REQUEST));
                    }
                },function(err){

                    return error(Response.sendResponse(false,null,err.message,status_codes.BAD_REQUEST));
                });
            },


            getVenueDetails : function( data , success , error ) {

                var condition = {
                    venue_id : data.venue_id
                };

                this.find({
                    where : condition
                }).then(function(success_data) {

                    if (success_data) {

                        var response = success_data.dataValues;

                        if(data.last_checkin_time != null)
                        {
                            response.last_checkin_time = data.last_checkin_time;
                        }

                        return success(Response.sendResponse(true,response,null,status_codes.OK));
                    } else {

                        return error(Response.sendResponse(false,null,custom_message.ENTRY_NOT_PRESENT,status_codes.BAD_REQUEST));
                    }
                },function(err){

                    return error(Response.sendResponse(false,null,err.message,status_codes.BAD_REQUEST));
                });
            },

            getAllVenues : function( success , error ) {

                this.findAll({
                    //where : condition
                }).then(function(success_data) {

                    if (success_data) {

                        return success(Response.sendResponse(true,success_data,null,status_codes.OK));
                    } else {

                        return error(Response.sendResponse(false,null,custom_message.ENTRY_NOT_PRESENT,status_codes.BAD_REQUEST));
                    }
                },function(err){

                    return error(Response.sendResponse(false,null,err.message,status_codes.BAD_REQUEST));
                });
            },

            getAllVenuesForCustomer: function( data , success , error ) {

                var offset = config.util.limit * data.page;

                this.findAll({
                    limit : config.util.limit,
                    offset : offset
                }).then(function(success_data) {

                    if (success_data) {

                        return success(Response.sendResponse(true,success_data,null,status_codes.OK));
                    } else {

                        return error(Response.sendResponse(false,null,custom_message.ENTRY_NOT_PRESENT,status_codes.BAD_REQUEST));
                    }
                },function(err){

                    return error(Response.sendResponse(false,null,err.message,status_codes.BAD_REQUEST));
                });
            },


            searchVenue : function( data , success , error ) {

                var condition = {
                    'name' : { like: '%' + data. search_term + '%' }
                };

                var offset = config.util.limit * data.page;

                this.findAll({
                    where :condition,
                    limit : config.util.limit,
                    offset : offset
                }).then(function(success_data) {

                    if (success_data) {

                        return success(Response.sendResponse(true,success_data,null,status_codes.OK));
                    } else {

                        return error(Response.sendResponse(false,null,custom_message.ENTRY_NOT_PRESENT,status_codes.BAD_REQUEST));
                    }
                },function(err){

                    return error(Response.sendResponse(false,null,err.message,status_codes.BAD_REQUEST));
                });
            },

            getNearByVenues : function( data , success , error ) {


                console.log(data.latitude);
                console.log(data.longitude);
                console.log(data.radius);

                var query = "SELECT *, ROUND(6371 * 2 * ASIN(SQRT( POWER(SIN(("+data.latitude+" - abs( latitude)) * pi()/180 / 2),2) " +
                    "+ COS("+data.latitude+" * pi()/180 ) * COS( abs (latitude) * pi()/180) * " +
                    "POWER(SIN(("+data.longitude+" - longitude) * pi()/180 / 2), 2) )), 2) as distance " +
                    "FROM venue having distance < "+data.radius+" ORDER BY distance limit 10";
                if(data.city == null){
                    query = "SELECT *, ROUND(6371 * 2 * ASIN(SQRT( POWER(SIN(("+data.latitude+" - abs( latitude)) * pi()/180 / 2),2) " +
                        "+ COS("+data.latitude+" * pi()/180 ) * COS( abs (latitude) * pi()/180) * " +
                        "POWER(SIN(("+data.longitude+" - longitude) * pi()/180 / 2), 2) )), 2) as distance " +
                        "FROM venue having distance < "+data.radius+" ORDER BY distance ASC limit 10";
                    
                }else{

                    query = "SELECT *, ROUND(6371 * 2 * ASIN(SQRT( POWER(SIN(("+data.latitude+" - abs( latitude)) * pi()/180 / 2),2) " +
                        "+ COS("+data.latitude+" * pi()/180 ) * COS( abs (latitude) * pi()/180) * " +
                        "POWER(SIN(("+data.longitude+" - longitude) * pi()/180 / 2), 2) )), 2) as distance " +
                        "FROM venue WHERE `city` LIKE '%" + data.city + "%' ORDER BY distance ASC limit 10";
                }

                sequelize.query(query, { type: sequelize.QueryTypes.SELECT })
                    .then(function(result) {

                        console.log(result);

                        if (result) {
                            //console.log(result);
                            return success(Response.sendResponse(true,result,null,status_codes.OK));
                        } else {

                            return error(Response.sendResponse(false,null,custom_message.ENTRY_NOT_PRESENT,status_codes.BAD_REQUEST));
                        }

                    });

                /* var offset = config.util.limit * data.page;

                 this.findAll({
                 where :condition,
                 limit : config.util.limit,
                 offset : offset
                 }).then(function(success_data) {

                 if (success_data) {

                 return success(Response.sendResponse(true,success_data,null,status_codes.OK));
                 } else {

                 return error(Response.sendResponse(false,null,custom_message.ENTRY_NOT_PRESENT,status_codes.BAD_REQUEST));
                 }
                 },function(err){

                 return error(Response.sendResponse(false,null,err.message,status_codes.BAD_REQUEST));
                 }); */
            },

            getByBeacon : function(data, success , error ) {
                
                var condition = {
                    beacon_ids : { like: '%' + data.beacon + '%' }
                }
                                this.findAll({
                                    where : condition
                                }).then(function(success_data) {
                
                                    if (success_data) {
                
                                        return success(Response.sendResponse(true,success_data,null,status_codes.OK));
                                    } else {
                
                                        return error(Response.sendResponse(false,null,custom_message.ENTRY_NOT_PRESENT,status_codes.BAD_REQUEST));
                                    }
                                },function(err){
                
                                    return error(Response.sendResponse(false,null,err.message,status_codes.BAD_REQUEST));
                                });
            },


            generateImage : function(venue_data, blackboard_data, callback){
                if(blackboard_data.board_color != undefined)
                {
                    var board_filename = venue_data.name + "_board.png";
                    var gd = require('node-gd');

                    var img = gd.createTrueColorSync(1920, 1080);

                    console.log("blackboard_data.board_color: ", blackboard_data.board_color);
                    var bgColor;
                    var baseImagePath;

                    if("" + blackboard_data.board_color === "red")
                    {
                        console.log("RED");
                        bgColor = img.colorAllocate(183, 0, 0);
                        baseImagePath = __dirname + '/../util/black_board_images/red.jpg';
                    }
                    else if("" + blackboard_data.board_color === "green")
                    {
                        console.log("GREEN");
                        bgColor = img.colorAllocate(0, 202, 99);
                        baseImagePath = __dirname + '/../util/black_board_images/green.jpg';
                    }
                    else if("" + blackboard_data.board_color === "black")
                    {
                        console.log("BLACK");
                        bgColor = img.colorAllocate(19, 19, 17);
                        baseImagePath = __dirname + '/../util/black_board_images/black.jpg';
                    }

                    //img.filledRectangle(0, 0, 1920, 1200, bgColor);

                    var txtColor = img.colorAllocate(255, 255, 255);

                    console.log("__dirname: ", __dirname);

                    var cabinSketchBold = __dirname + '/../util/fonts/CabinSketch-Bold.ttf';
                    var LoveYaLikeASister = __dirname + '/../util/fonts/LoveYaLikeASister.ttf';
                    var CabinSketchRegular = __dirname + '/../util/fonts/CabinSketch-Regular.ttf';

                    var nameWidth = pixelWidth(venue_data.name, { size: 120, font : 'cabin_sketch_bold' });
                    var headingWidth = pixelWidth(blackboard_data.heading, { size: 60, font : 'love_you_like_a_sister' });
                    var content1Width = pixelWidth(blackboard_data.content.content1, { size: 55, font : 'love_you_like_a_sister' });
                    var content2Width = pixelWidth(blackboard_data.content.content2, { size: 55, font : 'love_you_like_a_sister' });
                    var content3Width = pixelWidth(blackboard_data.content.content3, { size: 55, font : 'love_you_like_a_sister' });
                    var content4Width = pixelWidth(blackboard_data.content.content4, { size: 55, font : 'love_you_like_a_sister' });
                    var content5Width = pixelWidth(blackboard_data.content.content5, { size: 55, font : 'love_you_like_a_sister' });
                    var footerWidth = pixelWidth(blackboard_data.footer, { size: 80, font : 'cabin_sketch_regular' });

                    var nameOffset = parseInt((1920 - nameWidth) / 2);
                    var headingOffset = parseInt((1920 - headingWidth) / 2);
                    var content1Offset = parseInt((1920 - content1Width) / 2);
                    var content2Offset = parseInt((1920 - content2Width) / 2);
                    var content3Offset = parseInt((1920 - content3Width) / 2);
                    var content4Offset = parseInt((1920 - content4Width) / 2);
                    var content5Offset = parseInt((1920 - content5Width) / 2);
                    var footerOffset = parseInt((1920 - footerWidth) / 2);
                    console.log('This text is ' + headingWidth + 'px long in the size of 10px.');

                    var baseImage = gd.createFromJpeg(baseImagePath);
                    baseImage.copy(img, 0, 0, 0, 0, 1920, 1200);


                    console.log("258: ", blackboard_data.heading);
                    img.stringFT(txtColor, cabinSketchBold, 80, 0, nameOffset, 170, "" + venue_data.name);
                    img.stringFT(txtColor, LoveYaLikeASister, 44, 0, headingOffset, 287, "" + blackboard_data.heading);
                    img.stringFT(txtColor, LoveYaLikeASister, 34, 0, content1Offset, 470, "" + blackboard_data.content.content1);
                    img.stringFT(txtColor, LoveYaLikeASister, 34, 0, content2Offset, 550, "" + blackboard_data.content.content2);
                    img.stringFT(txtColor, LoveYaLikeASister, 34, 0, content3Offset, 630, "" + blackboard_data.content.content3);
                    img.stringFT(txtColor, LoveYaLikeASister, 34, 0, content4Offset, 710, "" +blackboard_data.content.content4);
                    img.stringFT(txtColor, LoveYaLikeASister, 34, 0, content5Offset, 790, "" + blackboard_data.content.content5);
                    img.stringFT(txtColor, CabinSketchRegular, 52, 0, footerOffset, 980, "" + blackboard_data.footer);

                    console.log("IMG: ", img);
                    img.savePng(board_filename, 1, function(err) {

                        console.log("ERR: ", err);

                        if(err) {
                            return false;
                        }

                        fs.readFile(__dirname + '/../' + board_filename, function(error, data){
                            console.log("FS ERROR: ", error);
                            console.log("FS DATA: ", data);

                            var file = {
                                data : data,
                                filename : board_filename
                            }



                            var image_upload = new ImageUpload(file, data);

                            image_upload.uploadGeneratedImage(function (success_data) {
                                console.log("Uploaded Image", success_data);
                                callback(success_data);
                                fs.unlink(__dirname + '/../' + board_filename, (err) =>{
                                    if(err)throw err;
                                    console.log('successfully deleted ', __dirname + '/../' + board_filename);
                                });
                                return success_data;
                            }, function (error_data) {
                                console.log(error_data);
                                callback(error_data);
                            });

                        });
                    });

                    img.destroy();
                }
            }

        }
    });
};
