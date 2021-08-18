'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Translation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // define association here
      Translation.TranslationKey = Translation.belongsTo(models.TranslationKey, {
        as: 'TranslationKeys',
        foreignKey: 'translation_key_id'
      });
      Translation.Locale = Translation.belongsTo(models.Locale, {
        as: 'locale',
        foreignKey: 'locale_id'
      });
    }
  }
  Translation.init(
    {
      translation_key_id: DataTypes.INTEGER,
      locale_id: DataTypes.INTEGER,
      value: DataTypes.TEXT('LONG')
    },
    {
      sequelize,
      modelName: 'Translation'
    }
  );
  return Translation;
};
