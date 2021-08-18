const fs = require('fs');
const path = require('path');

// Mail logs
function log(data) {
	fs.open(path.resolve(__dirname + '/mail.logs'), 'a+', (err, fd) => {
		if (err) console.log(err);

		// fs.ftruncate(fd, 10, (err) => {
		if (err) console.log(err);

		const storeData = `[${new Date()}]\n${data}`;

		fs.writeFile(fd, storeData, (err) => {
			if (err) console.log(err);

			console.log('Mail Logged');

			fs.close(fd, (err) => err && console.log(err));
		});
		// });
	});
}

module.exports = log;
