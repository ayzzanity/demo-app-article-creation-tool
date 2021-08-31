const BaseController = require('./base/BaseController');

const includes = (db) => ({
  include: [{ association: db.Comments.Article }]
});
class CommentsController extends BaseController {
  constructor(db) {
    super(db.Comments, includes(db));
  }
}

module.exports = (db) => new CommentsController(db);
