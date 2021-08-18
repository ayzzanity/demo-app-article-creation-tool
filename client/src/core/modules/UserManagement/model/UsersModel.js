import { types } from 'mobx-state-tree';
import UserTypesModel from './UserTypesModel';

const UsersModel = types
  .model('UsersModel', {
    id: types.optional(types.string, ''),
    key: types.optional(types.string, ''),
    email: types.optional(types.string, ''),
    first_name: types.optional(types.string, ''),
    last_name: types.optional(types.string, ''),
    user_type_id: types.optional(types.number, 0),
    phone_number: types.optional(types.maybeNull(types.string), ''),
    zip_code: types.optional(types.maybeNull(types.string), ''),
    street_nr: types.optional(types.maybeNull(types.string), ''),
    country: types.optional(types.maybeNull(types.string), ''),
    city: types.optional(types.maybeNull(types.string), ''),
    Type: types.optional(UserTypesModel, {}),
    active: types.optional(types.boolean, true)
  })
  .views((self) => ({
    get name() {
      return self.first_name + ' ' + self.last_name;
    }
  }))
  .actions((self) => ({
    SET_STATE(values) {
      self = {
        ...self,
        ...values
      };
    },
    setUser(values) {
      self.first_name = values.first_name;
      self.last_name = values.last_name;
      self.user_type_id = values.user_type_id;
    }
  }));

export default UsersModel;
