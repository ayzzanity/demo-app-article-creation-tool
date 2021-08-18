const fs = require('fs');
const path = require('path');
const { APP_NAME, HOST } = require('../../../config/environment');

module.exports = class JWTController {
  subjects = {
    SESSION_AUTH: 'Session:Authenticaion',
    RESET_PASSWORD: 'Reset:Password',
    SET_PASSWORD: 'Set:Password'
  };

  keys = {
    private: fs.readFileSync(path.resolve(__dirname, '../../../keys/private.key'), 'utf8'),
    public: fs.readFileSync(path.resolve(__dirname, '../../../keys/public.key'), 'utf8')
  };

  options = {
    issuer: `${HOST}:${APP_NAME}`,
    algorithm: 'RS256'
  };

  /*  Modify jwt expiration depending on remember me value
   *  If remember me is true: 2 weeks expiration
   *  otherwise 1 hour
   **/
  signOptions(subject, expireToken, audience) {
    let expiresIn;

    // If type is boolean, it refers to 'Remember Me'
    if (typeof expireToken === 'boolean') {
      expiresIn = expireToken ? '14d' : '1h';
    } else {
      // assign expiration
      expiresIn = this.subjects.RESET_PASSWORD === subject ? '2d' : expireToken;
    }

    return {
      ...this.options,
      subject,
      audience: audience || '',
      expiresIn
    };
  }
};
