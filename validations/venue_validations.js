'use strict';

var Joi = require('joi');

module.exports = function() {
    return  {

        add_entry : {
            payload:{
                name : Joi.string().required(),
                hash_tag : Joi.string().required(),
                organization_category_id : Joi.number().required(),
                start_time : Joi.string(),
                end_time : Joi.string(),
                start_time_2 : Joi.string(),
                end_time_2 : Joi.string(),
                address : Joi.string(),
                latitude : Joi.string(),
                longitude : Joi.string(),
                phone_number : Joi.string().required(),
                is_black_board : Joi.number().required(),
                type : Joi.string().required(),
                black_board_json : Joi.string(),
                auto_approval : Joi.string(),
                auto_approval_spotlights : Joi.string(),
                email : Joi.string().required(),
                first_name : Joi.string().required(),
                tags: Joi.string(),
                logo_file : Joi.any(),
                beacon_ids : Joi.string(),
                banner_file : Joi.any(),
                is_grouping_feature : Joi.string(),
                parent_id : Joi.number(),
                plan : Joi.string().required().valid('BASIC', 'PRO'),
                subscription_expiry_date : Joi.string()
            }
        },

        add_group : {
            payload:{
                name : Joi.string().required(),
                organization_category_id : Joi.number().required(),
                type : Joi.string().required().valid('GROUP'),
                email : Joi.string().required(),
                first_name : Joi.string().required(),
                phone_number : Joi.string().required()
            }
        },


        update_entry : {
            payload:{
                venue_id : Joi.number().required(),
                name : Joi.string(),
                hash_tag : Joi.string(),
                start_time: Joi.string(),
                end_time: Joi.string(),
                start_time_2: Joi.string(),
                end_time_2: Joi.string(),
                open_on: Joi.string(),
                address : Joi.string(),
                latitude : Joi.string(),
                longitude : Joi.string(),
                phone_number : Joi.string(),
                city_name : Joi.string(),
                is_black_board : Joi.number(),
                type : Joi.string(),
                black_board_json : Joi.string(),
                auto_approval : Joi.string(),
                auto_approval_spotlights : Joi.string(),
                email : Joi.string(),
                first_name : Joi.string(),
                tags: Joi.string(),
                logo_file : Joi.any(),
                beacon_ids : Joi.string().allow(''),
                banners : Joi.string(),
                is_table_booking_allowed:Joi.number(),
                table_booking_allowed_on:Joi.string(),
                first_table_booking_start_time:Joi.string(),
                first_table_booking_end_time:Joi.string(),
                second_table_booking_start_time:Joi.string(),
                second_table_booking_end_time:Joi.string(),
                table_booking_tnc:Joi.string(),
                is_proximity_on: Joi.number(),
                welcome_message:Joi.string().allow(''),
                feedback_message:Joi.string().allow(''),
                birthday_message:Joi.string().allow(''),
                social_media_message:Joi.string().allow(''),                
                is_grouping_feature:Joi.number(),
                pincode:Joi.string(),
                twt_handle : Joi.string(),
                fb_handle : Joi.string(),
                insta_handle : Joi.string(),
                banner_file : Joi.any(),
                subscription_expiry_date : Joi.string()
            }
        },


        get_entry : {
            payload:{
                'venue_id' : Joi.number().required()
            }
        },

        get_by_beacon : {
            payload:{
                'beacon' : Joi.string().required()
            }
        },

        get_roles : {
            payload:{
                'venue_id' : Joi.number().required()
            }
        },



        assign_user : {
            payload: {
                venue_id : Joi.number().required(),
                email : Joi.string().required(),
                role_id : Joi.number().required(),
                first_name : Joi.string().required(),
                phone_number : Joi.string().required()
            }
        },


        remove_user : {
            payload: {
                venue_id : Joi.number().required(),
                user_id : Joi.number().required(),
                role_id : Joi.number().required()
            }
        },

        ban_user :{
            payload: {
                venue_id : Joi.number().required(),
                customer_id : Joi.number().required(),
                is_blocked : Joi.number().required()
            }
        },

        add_venue_note :{
            payload: {
                venue_id : Joi.number().required(),
                customer_id : Joi.number().required(),
                venue_note : Joi.string().required()
            }
        },

        favourite_user :{
            payload: {
                venue_id : Joi.number().required(),
                customer_id : Joi.number().required(),
                is_favourite : Joi.number().required()
            }
        },


        social_media_mapping : {
            payload : {
                'venue_id': Joi.number().required(),
                'social_media_id': Joi.number().required(),
                'consumer_key': Joi.string(),
                'secret_key': Joi.string(),
                'auth_token': Joi.string(),
                'handle': Joi.string(),
                'code': Joi.string()
            }
        },


        get_twitter_request_token : {
            payload : {
                'venue_id': Joi.number().required(),
                'social_media_id': Joi.number().required()
            }
        },


        get_twitter_access_token : {
            payload : {
                'venue_id': Joi.number().required(),
                'social_media_id': Joi.number().required(),
                'oauth_token': Joi.string().required(),
                'oauth_verifier': Joi.string().required()
            }
        },


        get_social_media_mapping : {
            payload : {
                'venue_id': Joi.number().required()
            }
        },


        update_black_board : {
            payload : {
                'venue_id': Joi.number().required(),
                'is_black_board': Joi.number().required(),
                'black_board_json': Joi.string().required(),
                'is_preview' : Joi.number().required().valid(0,1)
            }
        },

        get_black_board : {
            payload : {
                'venue_id': Joi.number().required()
            }
        },

        get_tv_status : {
            payload : {
                'venue_id': Joi.number().required()
            }
        },

        perk_report : {
            payload : {
                'venue_id': Joi.number().required()
            }
        },

        send_perk : {
            payload : {
                'user_ids': Joi.any().required(),
                'venue_id': Joi.number().required(),
                'venue_perk_id' : Joi.number().required()
            }
        }


    };
}();


