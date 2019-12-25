/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('spotlight_social_media_mapping', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    spotlight_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    social_media_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'spotlight_social_media_mapping'
  });
};
