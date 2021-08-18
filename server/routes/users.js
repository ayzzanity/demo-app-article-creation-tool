const { UserController } = require('../app/controllers');

module.exports = (router, rw, auth) => {
  router.put('/change_password', rw(UserController.changePassword2));

  router.applyRoutes(UserController, {
    '/': {
      default: ['get', 'post', 'put'],
      middleware: auth
    },
    '/change_password': {
      //	put: UserController.changePassword2,
      '/:id': {
        put: UserController.changePassword
      }
    },
    '/types': {
      get: UserController.showTypes,
      middleware: auth
    },
    '/:id': {
      get: UserController.show,
      middleware: auth
    },
    '/send_email': {
      post: UserController.sendEmail,
      middleware: auth
    }
  });

  return router;
};
