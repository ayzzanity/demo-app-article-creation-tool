const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const randomize = require('randomatic');
const JWTController = require('./JWTController');
const { ErrorException, Mailer } = require(path.resolve('utils'));

module.exports = class ValidationController extends JWTController {
  REQUIRED_FIELDS = {
    change_password_2: ['new_password', 'password'],
    change_password: ['password', 'fingerprint'],
    reset_password: ['email', 'fingerprint'],
    user: ['email', 'password', 'fingerprint'],
    OTP: ['email', 'password', 'fingerprint', 'pin']
  };

  constructor(db) {
    super();
    this.db = db;
  }

  /**
   * @FUNCTIONS
   * @Validation
   * @desc
   * Check for:
   * 1. empty fields
   * 2. user exists
   * 3. password validation
   */

  payload(user, rememberMe, fingerprint) {
    const s = { ...user.dataValues };
    delete s.password;
    return {
      user: {
        ...s,
        rememberMe,
        fingerprint
      }
    };
  }

  createToken(payload, { rememberMe, subject, audience }, session, isAuth = true) {
    const token = jwt.sign(payload, this.keys.private, this.signOptions(subject, rememberMe, audience));

    if (isAuth) session.xdt = token;

    return token;
  }

  checkRequiredFields(body, fields) {
    const missing_fields = [];

    fields.forEach((field) => {
      if (!body[field]) missing_fields.push(field);
    });

    // Throw exception if at least 1 is missing
    if (missing_fields.length > 0) {
      throw new ErrorException.Error(409, { ERROR: 'Missing required fields:', FIELDS: missing_fields });
    }
  }

  async validateUser(body, isOnlyEmail = false, isResetPassword) {
    // Check for empty fields
    Object.keys(body).filter((property) => property != 'rememberMe');
    // .forEach((property) => {
    //   if (body[property] === '' || body[property] === null)
    //     throw new ErrorException.Error(400, `The field '${property}' is undefined`, { code: 0 });
    // });

    // Check missing required fields
    if (!isOnlyEmail) {
      this.checkRequiredFields(body, this.REQUIRED_FIELDS.user);
    }

    if (isResetPassword) {
      this.checkRequiredFields(body, this.REQUIRED_FIELDS.reset_password);
    }

    return await this.db.Users.findOne({
      include: [{ association: this.db.Users.Type }],
      where: { email: body.email }
    }).then(async (user) => {
      // Check if user doesn't exists
      if (!user) throw new ErrorException.Error(400, 'User / Password is incorrect!');

      // Check if user is suspended
      if (!user.active) {
        throw new ErrorException.Error(401, 'User account suspended', { code: 3 });
      }

      if (!isOnlyEmail) {
        // Check if inputted password is correct
        const isMatch = await bcrypt.compare(body.password, user.password);

        if (!isMatch) {
          throw new ErrorException.Error(400, 'User / Password is incorrect');
        }
      }

      return user;
    });
  }

  async validateDevice(body, user, session, isSendEmail) {
    const payload = this.payload(user, body.rememberMe || false, body.fingerprint);

    if (
      !user.isEmailAuthenticate ||
      (await this.db.UserFingerprints.findOne({
        where: { user_id: user.id, fingerprint: body.fingerprint }
      }))
    ) {
      this.createToken(payload, { rememberMe: body.rememberMe || false, subject: this.subjects.SESSION_AUTH }, session);

      return { ...payload };
    } else {
      //This is a new device login so request for pin code.
      var verification_token = randomize('0', 6);
      user.verification_token = verification_token;

      console.log('New device detected! \nVerification Token: ' + verification_token);
      const res = await user.save();

      if (res) {
        if (isSendEmail) {
          // Send Email (Verification Token)
          const data = { user, verification_token };
          Mailer.DeviceRegistration(user.email, data);
        }

        return { ...payload, new: true };
      } else {
        throw new ErrorException.Error(500, 'Could not generate pin');
      }
    }
  }

  async verifyPin(body, user, session) {
    const payload = this.payload(user, body.rememberMe, body.fingerprint);

    if (user.verification_token === body.pin) {
      this.createToken(payload, { rememberMe: body.rememberMe || false, subject: this.subjects.SESSION_AUTH }, session);

      // Save device fingerprint on database and reset verification token of user
      await this.db.UserFingerprints.create({ user_id: user.id, fingerprint: body.fingerprint });
      user.verification_token = '';
      await user.save();

      return { ...payload };
    } else {
      throw new ErrorException.Error(400, 'Invalid Verification Token!');
    }
  }

  async verifyToken(token, { subject, audience }) {
    let result;

    if (!token) throw new ErrorException.Error(401, 'Unauthorized Request');

    // Verify token
    if (subject === this.subjects.SESSION_AUTH) {
      for (const bool of [true, false]) {
        result = jwt.verify(token, this.keys.public, this.signOptions(subject, bool, audience));
      }
    } else {
      result = jwt.verify(token, this.keys.public, this.signOptions(subject, undefined, audience));
    }

    if (typeof result === 'undefined') throw new ErrorException.Error(400, 'Token is not valid!');

    return result;
  }

  async verifyUserResetPasswordToken(user, token) {
    // Check if token is still valid
    // If reset password token of user is empty, throw an error
    if (['', null].some((e) => e === user.reset_password_token))
      throw new ErrorException.Error(400, 'Token has already expired!');

    // If reset password token of use is not equal to the received token, throw an error
    if (user.reset_password_token !== token.split('.')[1]) throw new ErrorException.Error(400, 'Token is not valid!');
  }

  async sendResetPassword(body, user, session) {
    // Create a token that lasts only for 2 days
    const token = this.createToken(
      body,
      { rememberMe: '2d', subject: this.subjects.RESET_PASSWORD, audience: user.id },
      session,
      false
    );

    // Save token for user
    user.reset_password_token = token.split('.')[1];
    await user.save();

    // Send Email
    Mailer.ForgotPassword(body.email, {
      user_id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      token
    });
    return { success: true, msg: 'Request for reset password sent.' };
  }
};
