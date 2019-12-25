"use strict";

var Response = require('../../Util/Response');


class Perks {

    constructor( data , model  ) {

        if( model != null )
            this.models = model.perks;
        else
            this.models = server._plugins['hapi-sequelize'].new_tagloy.models.perks;


        this.id =  data.id != undefined ? data.id : null ;
        this.name = data.name != undefined ? data.name : null ;
        this.type = data.type != undefined ? data.type : null ;
        this.offer_type =  data.offer_type != undefined ? data.offer_type : null ;
        this.description = data.description != undefined ? data.description : null ;
        this.amount = data.amount != undefined ? data.amount : null ;
        this.expiry = data.expiry != undefined ? data.expiry : null ;
        this.tag_count = data.tag_count != undefined ? data.tag_count : 0 ;
        this.check_in_count = data.check_in_count != undefined ? data.check_in_count : 0 ;
        this.valid_on = data.valid_on != undefined ? data.valid_on : 0;
        this.f_start_time = data.f_start_time != undefined ? data.f_start_time : 0;
        this.f_end_time = data.f_end_time != undefined ? data.f_end_time : 0;
        this.s_start_time = data.s_start_time != undefined ? data.s_start_time : 0;
        this.s_end_time = data.s_end_time != undefined ? data.s_end_time : 0;
        this.message = data.message != undefined ? data.message : 0;
        this.sponsorer = data.sponsorer != undefined ? data.sponsorer : 0;
        this.terms = data.terms != undefined ? data.terms : 0;
        this.is_enabled = data.is_enabled != undefined ? data.is_enabled : 0;
    }


    getAllPerks(success,error) {

        try {

            this.models.getAllEntries(this, function (response_data) {

                success(response_data);
            }, function (error_data) {

                error(error_data);
            });
        }catch (err) {

            error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
        }
    };


}


module.exports = Perks;