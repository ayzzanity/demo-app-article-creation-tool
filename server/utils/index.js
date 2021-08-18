const Looper = require('node-loopie');
const path = require('path');
const utils = {};

Looper(__dirname, (file, fileName) => {
	utils[fileName] = new require(path.join(__dirname, file));
});

module.exports = utils;
