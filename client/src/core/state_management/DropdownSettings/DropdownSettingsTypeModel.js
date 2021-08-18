import { types } from 'mobx-state-tree';

const DropdownSettingsTypeModel = types.model('DropdownSettingsTypeModel', {
  id: types.optional(types.number, 0),
  name: types.optional(types.string, ''),
});
export default DropdownSettingsTypeModel;
