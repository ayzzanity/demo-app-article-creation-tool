const BaseController = require('./base/BaseController');

class LocalesController extends BaseController {
  constructor(db) {
    super(db.Locale);
    this.db = db;
  }
}

module.exports = (db) => new LocalesController(db);
