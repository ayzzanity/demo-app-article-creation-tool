const { ArticleController } = require('../app/controllers');

module.exports = (router, rw, auth) => {
  router.applyRoutes(ArticleController, {
    '/': {
      default: true
      //middleware: auth
    },
    '/:id': {
      get: ArticleController.show,
      middleware: auth
    }
  });

  return router;
};
