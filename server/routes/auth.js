const { AuthenticateController } = require('../app/controllers');

module.exports = (router, rw, auth) => {
	router.post('/', rw(AuthenticateController.authenticateUser));

	router.post('/login_device', rw(AuthenticateController.loginDevice));

	router.get('/token', rw(AuthenticateController.authenticateSessionToken));

	router.post('/reset_password', rw(AuthenticateController.resetPassword));

	router.get('/reset_password/:token/:user_id', rw(AuthenticateController.authenticateResetPasswordToken));

	router.post('/logout', auth, rw(AuthenticateController.logout));

	return router;
};
