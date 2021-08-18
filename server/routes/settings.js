const { SettingsController } = require('../app/controllers');

module.exports = (router, rw, auth) => {
	router.applyRoutes(SettingsController, {
		'/': {
			default: true,
			middleware: auth,
		},
		'/:id': {
			get: SettingsController.filter,
			middleware: auth,
		},
		'/types': {
			get: SettingsController.showTypes,
			middleware: auth,
		},
	});

	return router;
};
