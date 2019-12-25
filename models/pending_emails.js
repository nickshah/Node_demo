"use strict";

var Response = require('../Classes/Util/Response');
var EmailEvents = require('../Classes/Util/EmailEvents');


module.exports = function(sequelize, DataTypes) {
    return sequelize.define('pending_emails', {
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
        organization_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
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
        tableName: 'pending_emails',
        underscored : true,
        classMethods : {

            //  Create entry into database
            createEntry : function( data , success, error) {

                try {
                    this.build(data);

                    this.create(data)
                        .then(function (created_data) {

                                return success(Response.sendResponse(true,created_data,null,status_codes.OK));
                            },function(err) {

                                return error(Response.sendResponse(false,null,err.message,status_codes.BAD_REQUEST));
                            }
                        );
                }catch (err) {

                    return error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
                }
            },

            sendPendingEmails : function( data , success , error  ) {

                try {

                    var condition = {
                        email : data.email
                    };

                    this.findAll({
                        where : condition
                    }).then(function(success_data){

                        console.log(success_data);


                        for( let i = 0 ; i < success_data.length ; i++  ) {


                            var send_email_data = {
                                url : "http://www.tagloy.com",
                                organization_name : success_data[i].dataValues.organization_name,
                                role : success_data[i].dataValues.role_name
                            };

                            var event_data = {
                                email : success_data[i].dataValues.email,
                                email_template  : EmailEvents.role_assigned.template,
                                email_event  : EmailEvents.role_assigned.subject,
                                data : send_email_data
                            };


                            console.log("sendint emai");
                            emitter.emit('send_mail', JSON.stringify(event_data));
                        }


                        success();
                    },function(error_data){


                        console.log(error_data);
                        error();
                    });

                } catch (err) {


                    console.log(err.message);
                    return error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
                }
            }

        }
    });
};
