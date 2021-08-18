const fs = require('fs');
const path = require('path');
const hbs = require('handlebars');
const Looper = require('node-loopie');
const { APP_NAME, COMPANY_ADDRESS } = require(path.resolve('config', 'environment'));
const directory = path.resolve('app', 'mail', 'views', 'partials');
const moment = require('moment');

// renders the html template with the given data and returns the html string
function renderTemplate(title, data, file) {
	// Pass enums on data to compile
	data.enum = {
		title,
		app_name: APP_NAME,
		company_address: COMPANY_ADDRESS,
	};

	// FOR DATE FORMAT

	hbs.registerHelper('formatDate', function (datetime) {
		if (moment) {
			// can use other formats like 'lll' too
			return moment(datetime).format('DD.MM.YYYY');
		} else {
			return datetime;
		}
	});

	// Register path of img
	hbs.registerHelper('assets', (context) => 'http://localhost:8943/assets');

	// Customized if condition helper
	hbs.registerHelper('ifCond', function (v1, operator, v2, options) {
		switch (operator) {
			case '!==':
				return v1 !== v2 ? options.fn(this) : options.inverse(this);
			case '==':
				return v1 == v2 ? options.fn(this) : options.inverse(this);
			case '===':
				return v1 === v2 ? options.fn(this) : options.inverse(this);
			case '!=':
				return v1 != v2 ? options.fn(this) : options.inverse(this);
			case '!==':
				return v1 !== v2 ? options.fn(this) : options.inverse(this);
			case '<':
				return v1 < v2 ? options.fn(this) : options.inverse(this);
			case '<=':
				return v1 <= v2 ? options.fn(this) : options.inverse(this);
			case '>':
				return v1 > v2 ? options.fn(this) : options.inverse(this);
			case '>=':
				return v1 >= v2 ? options.fn(this) : options.inverse(this);
			case '&&':
				return v1 && v2 ? options.fn(this) : options.inverse(this);
			case '||':
				return v1 || v2 ? options.fn(this) : options.inverse(this);
			default:
				return options.inverse(this);
		}
	});

	// Register partials
	Looper(
		directory,
		(file, fileName, r_file) => {
			hbs.registerPartial(fileName, r_file);
		},
		null,
		'.hbs'
	);

	// Register template
	hbs.registerPartial('body', file);

	// Render main layout
	const html = fs.readFileSync(path.join(__dirname, 'views/index.hbs'), 'utf-8');

	// console.log(data.data);

	// creates the Handlebars template object
	const rendered = hbs.compile(html)(data);

	return rendered;
}

module.exports = renderTemplate;
