const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();

function two_digit(num) {
	return ('100' + num).slice(-2);
}

module.exports = class CurrentDate {
	static init() {
		return `${two_digit(day)}.${two_digit(month)}.${year}`;
	}

	static get day() {
		return day;
	}

	static get month() {
		return month;
	}

	static get year() {
		return year;
	}
};
