const bcrypt = require('bcryptjs');

module.exports = class PasswordGenerator {
  static generate() {
    return Array(10)
      .fill('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz')
      .map(function (x) {
        return x[Math.floor(Math.random() * x.length)];
      })
      .join('');
  }

  static async hash(password) {
    try {
      const hash = await bcrypt.hash(password, 10);
      return [password, hash];
    } catch (err) {
      return [err];
    }
  }
};
