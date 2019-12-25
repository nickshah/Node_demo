'use strict';

var jwt = require('jsonwebtoken');


class JwtTokenGenerator {

    static createToken(id,organization_group,role) {


        console.log(id,organization_group,role);

        var secreteKey= config.util.secret_key;
        return jwt.sign({
                id : id,
                organization_group : organization_group,
                role_id : role
            },secreteKey,{
                expiresIn:'24h'
            }
        );
    }
}

module.exports = JwtTokenGenerator;
