const { CommentsController } = require('../app/controllers');

module.exports = (router, rw, auth) => {
  router.applyRoutes(CommentsController, {
    '/': {
      default: true
      //middleware: auth
    },
    '/:id': {
      get: CommentsController.show,
      middleware: auth
    }
  });

  return router;
};
