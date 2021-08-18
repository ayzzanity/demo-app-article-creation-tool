import { types, flow, cast } from 'mobx-state-tree';
import DropdownSettingModel from './DropdownSettingModel';
import axios from 'axios';

const DropdownSettingState = types
  .model('DropdownSettingState', {
    state: types.optional(types.array(DropdownSettingModel), []),
    updatedAt: types.optional(types.string, ''),
    loading: types.optional(types.boolean, false)
  })
  .actions((self) => ({
    RESET_DROPDOWN_SETTING(value) {
      self.state = [];
    },

    SET_UPDATED_AT() {
      self.updatedAt = new Date().getTime().toString();
    },

    FETCH_DATA: flow(function* (settings_type_id = '') {
      self.loading = true;

      const { data } = yield axios.get(`/api/settings/${settings_type_id}`);
      self.state = cast(data);

      self.loading = false;
    }),

    ADD: flow(function* (values) {
      const { data } = yield axios.post('/api/settings', values);
      self.state.push(data);
      self.SET_UPDATED_AT();
      return true;
    }),

    DELETE: flow(function* (id) {
      yield axios.delete('/api/settings', { data: { ids: [id] } });
      self.state.splice(
        self.state.findIndex((data) => data.id === id),
        1
      );
      self.SET_UPDATED_AT();
    }),

    UPDATE: flow(function* (id, values) {
      const { data } = yield axios.put(`/api/settings/${id}`, values);
      self.state.splice(
        self.state.findIndex((data) => data.id === id),
        1,
        data
      );
      self.SET_UPDATED_AT();
    }),
  }))
  .views((self) => ({}));
export default DropdownSettingState;
