import { cast, types, flow } from 'mobx-state-tree';
import axios from 'axios';

import UserTypesModel from '@core_modules/UserManagement/model/UserTypesModel';
import CountryData from '@core_data/countries/Countries.json';

const API_PATH = '/api/users';

const UserManagementUtilities = types
  .model('UserManagementUtilities', {
    showAddUserModal: types.optional(types.boolean, false),
    search: types.optional(types.string, ''),
    props: types.optional(types.array(types.string), ['first_name', 'last_name', 'email']),
    userTypes: types.optional(types.array(UserTypesModel), []),
    isUpdate: types.optional(types.boolean, false),
    updateId: types.optional(types.string, ''),
    cities: types.optional(types.array(types.string), [])
  })
  .views((self) => ({}))
  .actions((self) => ({
    setToggleShowAddOrUpdateUserModal(isUpdate = false) {
      self.isUpdate = isUpdate ? true : false;
      self.showAddOrUpdateUserModal = !self.showAddOrUpdateUserModal;
    },

    setCities(selectedCountry) {
      if (selectedCountry) {
        const country = CountryData.find((row) => row.country === selectedCountry);
        return (self.cities = cast(country.cities));
      }
      if (!selectedCountry) {
        self.cities = [];
      }
    },

    setUpdateId(id) {
      self.updateId = id;
    },

    setSearch(searchValue) {
      self.search = searchValue;
    },

    FETCH_USER_TYPES: flow(function* () {
      const { data } = yield axios.get(`${API_PATH}/types`);
      self.userTypes = cast(data);
    })
  }));

export default UserManagementUtilities;
