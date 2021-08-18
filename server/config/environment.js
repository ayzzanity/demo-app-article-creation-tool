require('custom-env').env(true);
require('custom-env').env(process.env.NODE_ENV);

module.exports = Object.freeze(Object.assign({}, process.env));
