'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Locale extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Locale.Translation = Locale.hasMany(models.Translation, {
        as: 'Translations',
        foreignKey: 'locale_id'
      });
    }
  }
  Locale.init(
    {
      locale: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Locale'
    }
  );
  return Locale;
};
