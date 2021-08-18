const path = require('path');
const Looper = require('node-loopie');
const createMail = require('./Mailer/create-mail.js');
const directory = path.resolve('app', 'mail', 'views', 'templates');
const mail = {};

// Loop all files in view/templates folder and store it on an object
Looper(directory, (file, fileName) => {
	mail[fileName] = (...args) => createMail(...args, file);
});

module.exports = mail;
