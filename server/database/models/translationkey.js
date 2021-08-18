'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TranslationKey extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // define association here
      TranslationKey.Translation = TranslationKey.hasMany(models.Translation, {
        as: 'Translations',
        foreignKey: 'translation_key_id'
      });
    }
  }
  TranslationKey.init(
    {
      translation_key: DataTypes.TEXT('LONG')
    },
    {
      sequelize,
      modelName: 'TranslationKey'
    }
  );
  return TranslationKey;
};
