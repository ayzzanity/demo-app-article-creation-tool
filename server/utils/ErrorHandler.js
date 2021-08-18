const { NODE_ENV, DEV_EMAIL } = require('../config/environment');
const Mailer = require('./Mailer');

const verbose = NODE_ENV === 'localhost';

// eslint-disable-next-line no-unused-vars
module.exports = async (err, req, res, _next) => {
  if (verbose) console.log(`API Error: ${req.url}\n`, err);

  let data = {
    success: false,
    type: err.type,
    error: {
      code: 2,
      message: 'An internal error has occurred, please contact technical support.'
    }
  };

  // 4xx Error Response
  if (err.code < 500 && err.code >= 400) {
    // Clear cookie session, if token is expired or invalid
    // if ([400, 401].includes(err.code)) req.session = null;

    data.error = {
      message: err.message,
      ...err.details
    };

    res.status(err.code).json(data);
  } else {
    try {
      // 5xx Error Response
      internalServerError(NODE_ENV !== 'localhost');
    } catch (err) {
      internalServerError(false);
    }

    res.status(500).json(data);
  }

  function internalServerError(isNotProduction) {
    data.type = 'server_error';

    if (isNotProduction) {
      Mailer.ServerError(DEV_EMAIL, { ...err, url: req.url });

      data.error = { code: 1, message: 'An internal error has occurred, our developers have already been notified.' };
    } else if (verbose) {
      data.error = {
        code: 3,
        message: err.name,
        type: err.message,
        stack_trace: err.stack
      };
    }
  }
};
