const BaseController = require('./base/BaseController');

const includes = (db) => ({
  include: [{ association: db.Articles.User }]
});
class ArticleController extends BaseController {
  constructor(db) {
    super(db.Articles, includes(db));
  }
}

module.exports = (db) => new ArticleController(db);
