const ValidationController = require('./auth/ValidationController');

class AuthenticateController extends ValidationController {
  constructor(db) {
    super(db);
  }

  authenticateUser = async (payload, [req]) => {
    const user = await this.validateUser(payload);
    const data = await this.validateDevice(payload, user, req.session, true);

    return data;
  };

  loginDevice = async (payload, [req]) => {
    const user = await this.validateUser(payload);
    const data = await this.verifyPin(payload, user, req.session);

    return data;
  };

  authenticateSessionToken = async (_, [req]) => {
    const decode = await this.verifyToken(req.session.xdt, { subject: this.subjects.SESSION_AUTH });
    const user = await this.validateUser(decode.user, true);
    const data = await this.validateDevice(decode.user, user, req.session, false);

    return data;
  };

  authenticateResetPasswordToken = async ({ token, user_id }) => {
    const decode = await this.verifyToken(token, { subject: this.subjects.RESET_PASSWORD, audience: user_id });
    const user = await this.validateUser(decode, true);
    await this.verifyUserResetPasswordToken(user, token);

    return { data: { success: true, result: 'Token is valid' } };
  };

  resetPassword = async (payload, [req]) => {
    const user = await this.validateUser(payload, true);
    // const res = await this.validateDevice(user, user, req.session, false);
    const data = await this.sendResetPassword(payload, user, req.session);

    return data;
  };

  logout = async (_, [req]) => {
    req.session = null;

    return { data: { success: true, result: 'User successfully logged out!' } };
  };
}

module.exports = (db) => new AuthenticateController(db);
