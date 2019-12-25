'use strict';

var config = require('../../config');
var fs = require('fs');
var Handlebars = require('handlebars');
var nodemailer = require('nodemailer');
var ses = require('nodemailer-ses-transport');


class  Send {

    constructor() {

        this.email_username = config.email_credentials.username;
        this.email_password = config.email_credentials.password;
        this.email_credentials_string = 'smtps://' +  this.email_username + ":" + this.email_password + "@smtp.gmail.com";
    }


//  Send emails
    sendMail(email,mail_template,subject,data) {

        var template_file = fs.readFileSync(mail_template).toString();

        var templateScript = Handlebars.compile(template_file);

        var html = templateScript(data);

        var transporter = nodemailer.createTransport(this.email_credentials_string);

        /*var transporter = nodemailer.createTransport(ses({
            accessKeyId: config.email_credentials.accessKeyId,
            secretAccessKey: config.email_credentials.secretAccessKey
        }));*/

        var mailOptions = {
            from: this.email_username,
            to: email,
            subject: subject,
            html: html
        };

        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
        });
    };

}




module.exports = Send;