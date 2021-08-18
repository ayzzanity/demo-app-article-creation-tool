'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class Settings extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.`
		 */
		static associate(models) {
			Settings.Type = Settings.belongsTo(models.SettingsTypes, {
				as: 'Type',
				foreignKey: 'settings_type_id',
			});
		}
	}
	Settings.init(
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.BIGINT.UNSIGNED,
			},
			settings_type_id: DataTypes.BIGINT.UNSIGNED,
			name: DataTypes.STRING,
			descr: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'Settings',
		}
	);
	return Settings;
};
