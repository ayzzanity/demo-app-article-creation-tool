const BaseController = require('./base/BaseController');

const includes = (db) => ({
  include: [
    {
      association: db.Settings.Type
    }
  ]
});

class SettingsController extends BaseController {
  constructor(db) {
    super(db.Settings, includes(db));
  }

  filter = async ({ id: settings_type_id }) => {
    return await this.model.findAll({ where: { settings_type_id } });
  };
}

module.exports = (db) => new SettingsController(db);
