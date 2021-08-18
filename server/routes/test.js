const { TestController } = require('../app/controllers');

module.exports = (router, rw, auth) => {
	router.applyRoutes(TestController, {
		'/': {
			default: true,
			middleware: auth(['Administrator']),
		},
		'/something': {
			post: TestController.list,
		},
	});

	return router;
};
