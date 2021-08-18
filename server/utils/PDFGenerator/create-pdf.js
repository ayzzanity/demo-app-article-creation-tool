const puppeteer = require('puppeteer');

// Creates a pdf document from htmlContent and saves it to outputPath
async function createPdf(htmlContent, options = { path: 'Output.pdf', format: 'A4' }) {
	// launchs a puppeteer browser instance and opens a new page
	const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'], headless: true });
	const context = await browser.createIncognitoBrowserContext();
	const page = await context.newPage();

	// wait until everything is loaded before rendering the PDF
	await page.goto(`data: text/html, ${htmlContent}`, { waitUntil: 'networkidle0' });

	// sets the html of the page to htmlContent argument
	await page.setContent(htmlContent);

	// Prints the html page to pdf document and saves it to given outputPath
	await page.emulateMediaType('screen');
	const file = await page.pdf({ ...options, printBackground: true });

	// Closing the puppeteer browser instance
	await browser.close();

	return file;
}

module.exports = createPdf;
