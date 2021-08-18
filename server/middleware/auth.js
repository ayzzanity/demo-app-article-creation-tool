const path = require('path');
const { ErrorException } = require(path.resolve('utils'));
const { AuthenticateController: auth } = require('../app/controllers');

module.exports = (...args) => {
  let allowedUserTypes;

  // Function is from route.middleware
  if (args.length === 3) {
    middleware(...args);
  } else {
    // If function is initialized before route.middleware is called
    allowedUserTypes = args[0];
    return middleware;
  }

  async function middleware(req, res, next) {
    try {
      const { user } = await auth.verifyToken(req.session.xdt, { subject: auth.subjects.SESSION_AUTH });

      if (
        (Array.isArray(allowedUserTypes) && allowedUserTypes?.find((e) => e === user.type)) ||
        typeof allowedUserTypes === 'undefined'
      ) {
        next();
      } else {
        throw new ErrorException.Error(401, 'Unauthorized Request!');
      }
    } catch (err) {
      next(err);
    }
  }
};
