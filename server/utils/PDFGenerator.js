// const fs = require("fs");
const path = require('path');
const Looper = require('node-loopie');
const GenerateUniqueId = require('./GenerateUniqueId');
const createPdf = require('./PDFGenerator/create-pdf');
const renderTemplate = require('./PDFGenerator/render-template');
const directory = path.resolve('app', 'mail', 'views', 'templates');
const pdf_export = {};

// Loop all files in view/templates folder and store it on an object
Looper(
	directory,
	(file, fileName, r_file) => {
		pdf_export[fileName] = async function (data, title = fileName.match(/[!A-Z]+[a-z]*/g).join(' '), date, format = 'A4') {
			try {
				// File path to export pdf
				const file_name = `${fileName}-${GenerateUniqueId.init()}.pdf`;
				const baseDir = path.resolve('storage', 'pdf');
				const file_path = path.join(baseDir, file_name);

				// Create directory if it doesn't exist /storage/pdf
				if (!fs.existsSync(baseDir)) {
					fs.mkdirSync(baseDir);
				}

				// creates the html content
				const htmlContent = await renderTemplate(title, data, r_file);
				// creates the pdf from html and saves it to Twindle.pdf
				const file = await createPdf(htmlContent, { path: file_path, format });

				// example line for saving the html version
				// await fs.writeFileSync('test.html', htmlContent);

				return file_name;
			} catch (err) {
				throw err;
			}
		};
	},
	null,
	'.hbs'
);

module.exports = pdf_export;
