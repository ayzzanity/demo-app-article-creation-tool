import { types } from 'mobx-state-tree';
import DropdownSettingsTypeModel from './DropdownSettingsTypeModel';

const DropdownSettingModel = types
  .model('DropdownSettingModel', {
    id: types.optional(types.number, 0),
    settings_type_id: types.optional(types.number, 1),
    name: types.optional(types.string, ''),
    descr: types.optional(types.string, ''),
    Type: types.optional(DropdownSettingsTypeModel, {}),
  })
  .views((self) => ({
    get type_name() {
      return self.Type.name;
    },
  }))
  .actions((self) => ({
    getName() {
      console.log(self.name);
    },
    setType(value) {
      self.type = value;
    },
    setName(value) {
      self.name = value;
    },
    setDesc(value) {
      self.desc = value;
    },
  }));
export default DropdownSettingModel;
