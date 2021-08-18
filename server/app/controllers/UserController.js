const path = require('path');
const bcrypt = require('bcryptjs');
const { Upsert, Mailer, ExistingHandler, ErrorException } = require(path.resolve('utils'));
const BaseController = require('./base/BaseController');
const AuthenticateController = require('./AuthenticateController');

const includes = (db) => ({
  attributes: { exclude: ['password', 'isEmailAuthenticate', 'reset_password_token', 'verification_token'] },
  include: [{ association: db.Users.Type }]
});

class UserController extends BaseController {
  constructor(db) {
    super(db.Users, includes(db));
    this.db = db;
    this.auth = AuthenticateController(db);
  }

  showTypes = async () => {
    return await this.db.UserTypes.findAll();
  };

  getUserBusinessUnits = async (user_id) => {
    return await this.db.UserBusinessUnits.findAll({
      attributes: ['business_unit_id'],
      where: { user_id },
      raw: true
    }).then((res) => res.map((e) => e.business_unit_id));
  };

  // BusinessUnits property should be present if user type is Standard User
  create = async (payload, [req]) => {
    // Check if email exists
    const [err] = await ExistingHandler.init(this.model, { email: payload.email });
    if (err) throw err;

    // If user type is a standard user, UserProperties is required
    // const opt = payload.user_type_id == 2 ? { include: [{ association: db.Users.UserProperties }] } : {};

    // Create User
    const data = await Upsert.init(this.model, payload, { includes: this.includes });

    // Send Invitation email if checked
    if (payload.sendInviteEmail) await this.sendEmail(data, [req], true);

    return data;
  };

  update = async ({ id }, payload, [req]) => {
    const user_tmp = await this.model.findOne({ where: { id } });
    if (!user_tmp) throw new ErrorException.Error(404, "User ID doesn't exist!");

    // Check if email exists (changed email)
    const [err] = await ExistingHandler.init(this.model, { email: payload.email }, { id });
    if (err) throw err;

    // Delete password property if it's empty
    if ('password' in payload) if (payload.password.trim() === '') delete payload.password;

    // if (!payload.isSelf && !payload.hasOwnProperty('active')) {
    // 	// Create bulk for user property
    // 	await db.UserProperty.destroy({ where: { user_id: id } }).then(async (data) => {
    // 		return await db.UserProperty.bulkCreate(payload.UserProperties);
    // 	});
    // }

    return await this.updateUser(payload, id, req);
  };

  changePassword = async ({ id }, payload, [req]) => {
    const user_tmp = await this.model.findOne({ where: { id } });
    if (!user_tmp) throw new ErrorException.Error(404, "User ID doesn't exist!");

    // Check required fields before validating device
    this.auth.checkRequiredFields(payload, this.auth.REQUIRED_FIELDS.change_password);
    await this.auth.verifyUserResetPasswordToken(user_tmp, payload.token);
    await this.auth.authenticateResetPasswordToken({ token: payload.token, user_id: id });

    // Remove token from user
    payload.reset_password_token = null;

    const user = await Upsert.init(this.model, Object.assign(payload, { id }), { includes: this.includes });

    const data = await this.auth.validateDevice(payload, user, req.session);

    return data;
  };

  changePassword2 = async (payload, [req]) => {
    const decode = await this.auth.verifyToken(req.session.xdt, { subject: this.auth.subjects.SESSION_AUTH });

    const user = await this.model.findOne({ where: { id: decode.user.id } });
    if (!user) throw new ErrorException.Error(404, "User doesn't exist!");

    this.auth.checkRequiredFields(payload, this.auth.REQUIRED_FIELDS.change_password_2);

    const isMatch = await bcrypt.compare(payload.password, user.password);
    if (!isMatch) throw new ErrorException.Error(400, 'Password is incorrect');

    user.password = payload.new_password;
    await user.save();

    return this.response('Password successfully changed!', 'change_password_success');
  };

  updateUser = async (payload, id, req) => {
    // Update user
    const user = await Upsert.init(this.model, Object.assign(payload, { id }), { includes: this.includes });

    // If user update is self then resend token
    if (payload.isSelf || payload.isResetPassword) {
      const rememberMe = typeof payload.rememberMe !== 'undefined' ? payload.rememberMe : false;

      const payload_token = this.auth.payload(user, payload.rememberMe, payload.fingerprint);

      await this.auth.createToken(payload_token, { rememberMe, subject: this.auth.subjects.SESSION_AUTH }, req.session);

      return {
        user: payload_token.user,
        passwordchanged: !!payload.password
      };
    }

    // Send Invitation email if checked, this is only for normal user update from admin
    if (payload.sendInviteEmail && !payload.isResetPassword && !payload.isSelf)
      Mailer.SendAccount(payload.email, payload);

    return user;
  };

  sendEmail = async (payload, [req], isFromCreate) => {
    let user;
    if (!isFromCreate) user = await this.model.findOne({ where: { id: payload.id } });
    else user = payload;

    // Create a token that lasts only for 2 days
    const token = this.auth.createToken(
      isFromCreate ? { ...payload.dataValues } : payload,
      { rememberMe: '2d', subject: this.auth.subjects.RESET_PASSWORD, audience: user.id },
      req.session,
      false
    );

    // Save token for user
    user.reset_password_token = token.split('.')[1];

    await user.save();
    payload = { ...user.dataValues, user_id: payload.id, token };

    // Send email to newly created user
    Mailer.SendAccount(user.email, payload);

    return this.response('Email successully sent!', 'email_successfully_sent');
  };
}

module.exports = (db) => new UserController(db);
