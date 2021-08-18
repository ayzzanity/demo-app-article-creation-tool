const path = require('path');
const cors = require('cors');
const Looper = require('node-loopie');
const helmet = require('helmet');
const cookieSession = require('cookie-session');
const auth = require('../middleware/auth');
const { SESSION_NAME, SESSION_SECRET_KEY, DOMAIN, NODE_ENV } = require('../config/environment');
const { ErrorHandler, Router, RouteGuard: rw } = require('../utils');

module.exports = class Routes {
  constructor(express, HOST) {
    this.app = express();
    this.express = express;
    this.HOST = HOST;

    this.initializeMiddleware();
    this.initializeRoutes();
  }

  initializeMiddleware() {
    // Cors
    this.app.use(helmet());
    this.app.use(cors({ origin: this.HOST }));
    this.app.use(
      cookieSession({
        name: SESSION_NAME,
        domain: DOMAIN,
        secure: ['production', 'development'].includes(NODE_ENV) ? true : false,
        secret: SESSION_SECRET_KEY
      })
    );

    // BodyparserMiddleware
    this.app.use(this.express.json({ limit: '100mb' }));
    this.app.use(this.express.urlencoded({ limit: '100mb', extended: true }));

    this.app.use('/public/translation', this.express.static(path.resolve('app', 'translations')));
    this.app.use('/public/data', this.express.static(path.resolve('app', 'data')));
  }

  initializeRoutes() {
    // Use looper (custom script) to loop the files on a folder to initialize the routes for this server
    Looper(__dirname, (file, fileName) => {
      this.app.use(`/api/${fileName}`, require(path.join(__dirname, file))(Router(), rw, auth));
    });

    // Error Handler Catches on "next()"
    this.app.use(ErrorHandler);
  }
};
