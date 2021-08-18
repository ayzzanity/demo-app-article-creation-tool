'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SettingsTypes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  SettingsTypes.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT.UNSIGNED
      },
      name: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'SettingsTypes'
    }
  );
  return SettingsTypes;
};
