'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Articles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Articles.User = Articles.belongsTo(models.Users, {
        as: 'Users',
        foreignKey: 'user_article_id'
      });
    }
  }
  Articles.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      user_article_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      title: DataTypes.STRING,
      content: DataTypes.TEXT('LONG'),
      imageHeader: DataTypes.STRING,
      publishDate: DataTypes.STRING,
      status: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Articles'
    }
  );
  return Articles;
};
