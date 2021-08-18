const BaseController = require('./base/BaseController');

class TestController extends BaseController {
	constructor(db) {
		super(db.Tests);
	}

	list = async (_, [req]) => {
		return req.session;
	};
}

module.exports = (db) => new TestController(db);
