var Response = require('../Classes/Util/Response');

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('roles', {
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
        is_active: {
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
        tableName: 'roles',
        underscored : true,
        classMethods : {

            getAllEntries : function( success , error  ) {

                try {

                    this.findAll().then(function(success_data){

                        success(Response.sendResponse(true,success_data,null));
                    },function(err){

                        error(Response.sendResponse(false,null,err.message));
                    })
                }catch (err) {

                    error(Response.sendResponse(false,null,err.message));
                }
            }
        }
    });
};
