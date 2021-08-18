import { flow, types } from 'mobx-state-tree';
import Axios from 'axios';

const API_PATH = '/api/users';
const AccountSettingsModel = types
  .model('AccountSettingsModel', { isUpdating: types.optional(types.boolean, false) })
  .views((self) => ({}))
  .actions((self) => ({
    CHANGE_PASSWORD: flow(function* (args) {
      try {
        let { data } = yield Axios.put(`${API_PATH}/change_password`, args);

        return [data, null];
      } catch (error) {
        return [null, error];
      }
    }),

    setIsUpdating(isUpdating) {
      self.isUpdating = isUpdating;
    }
  }));

export default AccountSettingsModel;
