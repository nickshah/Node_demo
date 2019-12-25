'use strict';

module.exports = function() {
    return {

        //Email verification
        verify_email : {
            subject : "Tagloy: Please verify your email address",
            template : "email_templates/verify_email.html"
        },

        forgot_password : {
            subject : "Forgot Password",
            template : "email_templates/forgot_password.html"
        },


        role_assigned : {
            subject : "Tagloy: Congratulations! Your Tagloy Account has been set up.",
            template : "email_templates/user_assigned_to_organization.html"
        },


        access_revoked : {
            subject : "Access Revoked",
            template : "email_templates/user_access_revoked_from_organization.html"
        }

    };
}();
