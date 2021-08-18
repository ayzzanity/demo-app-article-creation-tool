const path = require('path');
const log = require('./logs');
const nodemailer = require('nodemailer');
const templateRender = require(path.resolve('app', 'mail', 'views'));
const directory = path.resolve('app', 'mail', 'views', 'templates');
const { FROM_EMAIL, FROM_EMAIL_PASS, COMPANY_NAME } = require(path.resolve('config', 'environment'));

/**
 * @FUNCTION
 * @CreateEmail
 * @desc
 * Parameters needed:
 * 1. email -> Recipient's email
 * 2. data -> Data (object) that is to be passed on the template
 */

async function createMail(email, data, file, isLog = false) {
	try {
		let transporter = nodemailer.createTransport({
			host: 'mail.cyon.ch',
			port: 587,
			auth: {
				user: FROM_EMAIL,
				pass: FROM_EMAIL_PASS,
			},
			secure: false,
			tls: { rejectUnauthorized: false },
			debug: true,
		});

		// Fetch contents and paste it on the template email
		const { intro, content, subject } = require(path.join(directory, file))(data);

		const output = templateRender(intro, content);

		const info = await transporter.sendMail({
			from: `"${COMPANY_NAME}" <${FROM_EMAIL}>`,
			to: email,
			subject: subject,
			html: output,
			attachments: [
				{
					filename: 'logo.png',
					path: path.resolve('app', 'mail', 'assets', 'img', 'logo.png'),
					cid: 'logo',
				},
			],
		});

		if (isLog) log(`[Mail Sent] \n${JSON.stringify(info)}`);

		return info;
	} catch (error) {
		log(`[Mail Error] \nError Name: ${error.name}\nError Message: ${error.message}`);
		throw error;
	}
}

module.exports = createMail;
