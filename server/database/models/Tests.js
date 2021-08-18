'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tests extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.`
     */
    static associate() {}
  }
  Tests.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT.UNSIGNED
      },
      name: DataTypes.STRING,
      descr: DataTypes.STRING,
      isActive: DataTypes.BOOLEAN
    },
    {
      sequelize,
      modelName: 'Tests'
    }
  );
  return Tests;
};
