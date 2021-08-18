'use strict';

const { NODE_ENV } = require('../../config/environment');
const Looper = require('node-loopie');
const path = require('path');
const Sequelize = require('sequelize');
const env = NODE_ENV || 'localhost';
const config = require('../../config/database')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
	sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
	sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Test the database connection
testConnection();

// Get all the filename inside the models folder
Looper(__dirname, (file) => {
	const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
	db[model.name] = model;
});

Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

async function testConnection() {
	await sequelize
		.authenticate()
		.then(() => {
			console.log('Test Connection: Connection has been established successfully.');
		})
		.catch((error) => {
			console.error('Unable to connect to the database:\n------------\n', error);
		});
}
