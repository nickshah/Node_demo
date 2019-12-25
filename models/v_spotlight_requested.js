/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('v_spotlight_requested', {
    requestor_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    creator_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('OPEN','RESOLVED'),
      allowNull: false
    },
    timestamp: {
      type: DataTypes.BIGINT,
      allowNull: false
    }
  }, {
    tableName: 'v_spotlight_requested'
  });
};
