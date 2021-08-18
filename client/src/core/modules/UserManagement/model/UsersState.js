import { types, flow } from 'mobx-state-tree';
import UsersModel from './UsersModel';
import axios from 'axios';
import ApplyRootCrud from '@core_state_management/Helpers/RootCrud';

const API_PATH = '/api/users';

export default types
  .model('UsersState', {
    state: types.optional(types.array(UsersModel), []),
    single: types.optional(UsersModel, {}),
    total: types.optional(types.number, 0),
    loading: types.optional(types.boolean, false),
    isCreating: types.optional(types.boolean, false),
    updatedAt: types.optional(types.string, '')
  })
  .actions((self) => ({
    ...ApplyRootCrud(API_PATH, self),

    SEND_EMAIL: flow(function* (payload) {
      try {
        let response = yield axios.post(`${API_PATH}/send_email`, payload);
        return [{ message: response.data.data.message }, null];
      } catch (error) {
        return [null, error];
      }
    })
  }))
  .views((self) => ({}));
