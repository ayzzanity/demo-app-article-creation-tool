const Loopie = require('node-loopie');
const path = require('path');
const db = require('../../database/models');
const controller = {};

Loopie(__dirname, (file, fileName) => {
	controller[fileName] = new require(path.join(__dirname, file))(db);
});

module.exports = controller;
