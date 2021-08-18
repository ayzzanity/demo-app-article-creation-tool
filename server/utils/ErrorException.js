const Error = {
  Server: {
    code: 500,
    message: 'Server Error'
  },
  AlreadyExists: {
    code: 409,
    message: 'Already Exists Error'
  },
  NotFound: {
    code: 404,
    message: 'Not Found Error'
  },
  Unauthorized: {
    code: 401,
    message: 'Unauthorized Error'
  },
  Validation: {
    code: 400,
    message: 'Validation Error'
  }
};

class ErrorException {
  constructor(code, message, type, details = {}) {
    this.code = code;
    this.message = message;
    this.type = type;
    this.details = details;
  }
}

exports.Error = ErrorException;

exports.ServerError = class ServerError extends ErrorException {
  constructor(message = Error.Server.message, details) {
    super(Error.Server.code, message, toSnakeCase(Error.Server.message), details);
  }
};

exports.AlreadyExistsError = class AlreadyExistsError extends ErrorException {
  constructor(message = Error.AlreadyExists.message, details) {
    super(Error.AlreadyExists.code, message, toSnakeCase(Error.AlreadyExists.message), details);
  }
};

exports.NotFoundError = class NotFoundError extends ErrorException {
  constructor(message = Error.NotFound.message, details) {
    super(Error.NotFound.code, message, toSnakeCase(Error.NotFound.message), details);
  }
};

exports.UnauthorizedError = class UnauthorizedError extends ErrorException {
  constructor(message = Error.Unauthorized.message, details) {
    super(Error.Unauthorized.code, message, toSnakeCase(Error.Unauthorized.message), details);
  }
};

exports.ValidationError = class ValidationError extends ErrorException {
  constructor(message = Error.Validation.message, details) {
    super(Error.Validation.code, message, toSnakeCase(Error.Validation.message), details);
  }
};

function toSnakeCase(str) {
  return str.toLowerCase().replace(/ /g, '_');
}
