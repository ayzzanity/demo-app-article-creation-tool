const { LocalesController } = require('../app/controllers');

module.exports = (router, rw, auth) => {
  router.applyRoutes(LocalesController, {
    '/': {
      default: true
    },
    '/:id': {
      get: LocalesController.filter,
      middleware: auth
    }
  });

  return router;
};
