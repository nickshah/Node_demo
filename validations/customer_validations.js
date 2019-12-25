'use strict';

var Joi = require('joi');

module.exports = function() {
    return  {

        create : {
            payload : {
                'first_name' : Joi.string().required(),
                'is_present_on_app' : Joi.number().required(),
                'facebook_id' : Joi.string().required(),
                "dob": Joi.string().required(),
                "gender": Joi.string().required().valid('MALE', 'FEMALE', 'OTHER'),
                "image_url": Joi.string(),
                "facebook_follower": Joi.number(),
                "notification_flag": Joi.number(),
                "tags": Joi.string(),
                "fb_preferences": Joi.string(),
                "about_me": Joi.string(),
                "profession": Joi.string()
            }
        },

        login : {
            payload : {
                'facebook_id' : Joi.string().required(),
            }
        },

        customer_info : {
            payload : {
                'customer_id' : Joi.number().required(),
            }
        },

        get_customers_for_venue : {
            payload : {
                'page' : Joi.number().required(),
                'venue_id' : Joi.number().required(),
                'instagram_flag' : Joi.number(),
                'twitter_flag' : Joi.number(),
                'facebook_flag' : Joi.number(),
                'is_present_on_app' : Joi.number(),
                'is_month_inactive' : Joi.number(),
                'is_three_month_inactive' : Joi.number(),
                'is_favourite' : Joi.number(),
                'is_high_influencer' : Joi.number(),
                'is_celebrity_influencer' : Joi.number(),
                'is_superstar' : Joi.number(),
                'is_star' : Joi.number(),
                'is_blocked' : Joi.number(),
                'gender' : Joi.string(),
                'is_history' : Joi.number()
            }
        },

        in_venue_customers : {
            payload : {
                'page' : Joi.number().required(),
                'venue_id' : Joi.number().required(),
            }
        },


        checked_in : {
            payload : {
                'venue_id' : Joi.number().required(),
                'customer_id' : Joi.number().required()
            }
        },

        customer_stats : {
            payload : {
                'customer_id' : Joi.number().required()
            }
        },

        get_perks_for_customers : {
            payload : {
                'customer_id' : Joi.number().required(),
                'page' : Joi.number().required()
            }
        },

        get_single_perks_for_customers : {
            payload : {
                'customer_id' : Joi.number().required(),
                'perk_id' : Joi.number().required(),
                'venue_id' : Joi.number().required()
            }
        },


        get_venues_for_customers : {
            payload : {
                'page' : Joi.number().required()
            }
        },

        search_perks : {
            payload : {
                'search_term' : Joi.string().required(),
                'customer_id' : Joi.number().required()
            }
        },

        search_venue : {
            payload : {
                'search_term' : Joi.string().required()
            }
        },

        get_nearby_venues : {
            payload : {
                'latitude' : Joi.string().required(),
                'longitude' : Joi.string().required(),
                'radius' : Joi.number().required(),
                'city' : Joi.string()
            }
        },


        get_venue_details : {
            payload : {
                'venue_id' : Joi.number().required(),
                'customer_id' : Joi.number().required()
            }
        },

        social_media_mapping : {
            payload : {
                'customer_id': Joi.number().required(),
                'social_media_id': Joi.number().required(),
                'handle': Joi.string().required()
            }
        },

        qrcode : {
            payload : {
                'customer_id' : Joi.number().required(),
                'organization_id' : Joi.number(),
                'perk_id' : Joi.number()
            }
        },

        redeem : {
            payload : {
                'customer_id' : Joi.number().required(),
                'organization_id' : Joi.number().required(),
                'venue_perk_id' : Joi.number().required(),
                'current_timestamp' : Joi.string().required(),
                'redeem_time' : Joi.string().required()
            }
        },

        update_token : {
            payload : {
                'customer_id' : Joi.number().required(),
                'device_token' : Joi.string().required(),
                'device_type' : Joi.string().required().valid('ANDROID', 'IOS')
            }
        },

        current_checkins : {
            payload : {
                'customer_id' : Joi.number().required()
            }
        },

        get_profile : {
            payload : {
                'customer_id' : Joi.number().required()
            }
        },

        get_profile_for_scanner : {
            payload : {
                'customer_id' : Joi.number().required(),
                'venue_id' : Joi.number().required()
            }
        },

        update_profile : {
            payload : {
                'first_name' : Joi.string(),
                'dob': Joi.string(),
                'gender': Joi.string().valid('MALE', 'FEMALE', 'OTHER'),
                'profile_image': Joi.any(),
                "image_url": Joi.string(),
                'facebook_follower': Joi.number(),
                'ig_follower': Joi.number(),                
                'notification_flag': Joi.number(),
                'tags': Joi.string(),
                'device_type': Joi.string(),
                'customer_id' : Joi.number().required(),
                "fb_preferences": Joi.string(),
                "about_me": Joi.string(),
                "profession": Joi.string()
            }
        },

        get_notification : {
            payload : {
                'customer_id' : Joi.number().required()
            }
        }

    };
}();


