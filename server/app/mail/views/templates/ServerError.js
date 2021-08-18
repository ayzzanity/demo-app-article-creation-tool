const { NODE_ENV, APP_NAME } = require('../../../../config/environment');

module.exports = (data) => {
	return {
		subject: `[${NODE_ENV}] Server Error | ${data.name}`,
		intro: ``,
		content: `
      <p><b>An error occurred on the ${APP_NAME} server!</b></p>
      <b>Error Name:</b> ${data.name} <br>
      <b>Message:</b> ${data.message} <br> 
      <b>Additional Information:</b> <br> ${data.stack}
    `,
	};
};
