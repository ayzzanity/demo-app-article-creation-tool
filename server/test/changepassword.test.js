const { describe, it } = require('mocha');
const expect = require('chai').expect;
const db = require('../database/models');
const bcrypt = require('bcryptjs');
const { UserController } = require('../app/controllers');
const ValidationController = require('../app/controllers/auth/ValidationController');
const validation = new ValidationController(db);

const getData = async () => {
  const user = await db.Users.findOne({ where: { email: 'axl.cuyugan@exact-construct.ch' } });
  const req = {
    session: {
      xdt: validation.createToken(validation.payload(user), { rememberMe: false, subject: 'Session:Authenticaion' }, {})
    }
  };
  return { req, user };
};

const payload = {
  password: 'abcdefg12345',
  incorrect_password: 'lasangan',
  new_password: 'testing123'
};

describe('User Controller', () => {
  it('should allow change password', async () => {
    const { user, req } = await getData();
    const result = await UserController.changePassword2(payload, [req]);

    let t_user = await db.Users.findOne({ where: { email: 'axl.cuyugan@exact-construct.ch' } });
    const isMatch = await bcrypt.compare(payload.new_password, t_user.get().password);

    // Reset Password
    t_user.password = payload.password;
    await t_user.save();

    expect(isMatch).to.be.true;
    expect(result.success).to.be.true;
  });

  it('should not allow to change password (token invalid)', async () => {
    try {
      await UserController.changePassword2(payload, [{ session: { xdt: '' } }]);
    } catch (error) {
      expect(error.code).to.equals(401); // Unauthorized Request
    }
  });

  it('should return incorrect password', async () => {
    try {
      const { req } = await getData();
      const new_p = {
        password: payload.incorrect_password,
        new_password: payload.new_password
      };

      await UserController.changePassword2(new_p, [req]);
    } catch (error) {
      expect(error.code).to.equals(400); // Passowrd is incorrect
    }
  });
});
