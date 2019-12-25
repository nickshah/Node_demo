'use strict';

var Response = require('../Util/Response');


class Feedback {

    constructor( data ) {

        this.models = server._plugins['hapi-sequelize'].new_tagloy.models.feedback;


        this.id =  data.id != undefined ? data.id : null ;
        this.customer_id =  data.customer_id != undefined ? data.customer_id : null ;
        this.venue_id = data.venue_id != undefined ? data.venue_id : null;
        this.feedback = data.feedback != undefined ? data.feedback : null;
        this.reply = data.reply != undefined ? data.reply : null;
        this.is_perk_send = data.is_perk_send != undefined ? data.is_perk_send : null;
    }
}


exports.module = Feedback;