'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comments.Article = Comments.belongsTo(models.Articles, {
        as: 'Article',
        foreignKey: 'comment_article_id'
      });
    }
  }
  Comments.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      comment_article_id: DataTypes.INTEGER,
      commentUser: DataTypes.STRING,
      commentBody: DataTypes.TEXT('LONG')
    },
    {
      sequelize,
      modelName: 'Comments'
    }
  );
  return Comments;
};
