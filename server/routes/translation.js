const { TranslationController } = require('../app/controllers');

module.exports = (router, rw, auth) => {
  router.applyRoutes(TranslationController, {
    '/': {
      post: TranslationController.insertData,
      get: TranslationController.getData,
      middleware: auth
    },
    '/generate_json': {
      get: TranslationController.generateJSON,
      middleware: auth
    },
    '/begin_download': {
      get: TranslationController.beginDownload,
      middleware: auth
    },
    '/generate_array': {
      get: TranslationController.generateArray
      //middleware: auth
    }
  });

  return router;
};
