const { NODE_ENV } = require('../config/environment');
const handler = require('../config/controller');
const rw = require('./RouteGuard');

const verbose = NODE_ENV === '1localhost';

const trimPath = (path) => '/' + path.replace(/^\/+|\/+$/g, '');

module.exports = function Router() {
	// Get instance of express router
	const router = require('express').Router(...arguments);

	/**
		Add new method to express router instance (apply routes) 
		@param api_path : String
		@param options: Object {
			@property methods : Array ['GET', 'POST', 'PUT', 'DELETE'],
			@property controller : <class Controller>
		}
	*/

	router.applyRoutes = (controller, _a) => {
		/**
		 * Route map
		 * Source: https://github.com/expressjs/express/blob/master/examples/route-map/index.js
		 */

		const applyMiddleware = (route, middleware, controller) => (method) => {
			if (typeof middleware === 'object') return [route, middleware[method], controller].filter((e) => e);
			else if (typeof middleware === 'function') return [route, middleware, controller];
			else return [route, controller];
		};

		const map = (obj, route) => {
			const { middleware, ...a } = obj;
			route = trimPath(route || '');
			for (const key in a) {
				const type = typeof a[key];

				// { '/path': { ... }}
				if (type === 'object' && !Array.isArray(a[key])) {
					map(a[key], route + key);
				} else if (type === 'function') {
					// get: function(){ ... }
					if (verbose) console.log('%s %s', key, route);

					// Apply routes based on passed methods

					const args = applyMiddleware(route, middleware, rw(a[key]))(key);
					router[key](...args);
				} else if ((type === 'object' && Array.isArray(a[key])) || type === 'boolean') {
					// default : ['get', 'post', 'put', 'delete'] || default : true
					const default_methods = Object.keys(handler);
					const methods = type === 'boolean' ? default_methods : a[key];

					// Get all defined methods to override default methods
					const method_override = methods.filter((method) => !Object.keys(a).includes(method));

					for (const method of method_override) {
						const _route = method !== 'put' ? route : trimPath(`${route}/:id`);
						if (verbose) console.log('%s %s', method, _route);

						// Apply routes based on passed methods
						// if default method is PUT, then append route `:id`
						const args = applyMiddleware(_route, middleware, rw(controller[handler[method]]))(method);
						router[method](...args);
					}
				}
			}
		};

		map(_a, null);

		// methods.forEach((method) => router[method.toLowerCase()](path, rw(controller[handler[method]])));
	};

	return router;
};
