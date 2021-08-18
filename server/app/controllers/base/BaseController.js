const path = require('path');
const { Op } = require('sequelize');
const { Upsert, ExistingHandler } = require(path.resolve('utils'));

module.exports = class BaseController {
  constructor(model, includes = {}, options = {}) {
    this.model = model;
    this.includes = includes;
    this.options = options;
  }

  response(message, type) {
    const data = typeof message === 'object' ? message : { message };

    return {
      success: true,
      type,
      data
    };
  }

  /**
   * Default functions relative to its method is assigned on config/controllers
   * @function list : GET
   * @function show: GET
   * @function create : POST
   * @function update : PUT
   * @function setStatus : PUT
   * @function delete : DELETE
   *
   * Incase you are wondering why I'm using arrow functions instead of normal func, it's for the context binding. Context will be lost if passed on RouteGuard if you're not binding the context.
   */

  show = async ({ id }) => {
    return await this.model.findOne({ ...this.includes, where: { id } });
  };

  list = async (_, [{ query }]) => {
    // Pagination variables
    let offset;
    let page = parseInt(query.page) || undefined;
    let limit = parseInt(query.size) || undefined;

    // Search properties
    const search = query.search || '';
    const searchProperties = Array.isArray(query.props)
      ? query.props.reduce((a, property) => {
          if (!a[Op.or]) a[Op.or] = [];
          a[Op.or].push({ [property]: { [Op.like]: `%${search}%` } });

          return a;
        }, {})
      : undefined;
    const options = Array.isArray(query.props) ? { where: searchProperties } : {};

    if (page) {
      limit = limit || 10;
      offset = (page - 1) * limit;
    }

    const { count: total_items, rows: data } = await this.model.findAndCountAll({
      ...this.includes,
      limit,
      offset,
      ...options
    });
    const pagination = page
      ? {
          total_items,
          total_pages: Math.ceil(total_items / limit),
          per_page: limit
        }
      : {};

    return {
      data,
      ...pagination
    };
  };

  create = async (payload) => {
    const [err] = await ExistingHandler.init(this.model, { name: payload.name });
    if (err) throw err;

    return await Upsert.init(this.model, payload, { includes: this.includes, options: this.options });
  };

  update = async ({ id }, payload) => {
    const [err] = await ExistingHandler.init(this.model, { name: payload.name }, { id });
    if (err) throw err;

    return await Upsert.init(this.model, Object.assign(payload, { id }), {
      includes: this.includes,
      options: this.options
    });
  };

  delete = async ({ ids }) => {
    return await !!this.model.destroy({ where: { id: ids } });
  };

  setStatus = async ({ property }, payload) => {
    return await this.model.bulkCreate(payload, { updateOnDuplicate: [property] });
  };
};
