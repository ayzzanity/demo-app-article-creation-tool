import { types, flow } from 'mobx-state-tree';
import axios from 'axios';
import DropdownSettingsModel from './DropdownSettings';
import GlobalModel from './Global';

/**APP IMPORTS */

import { AppStore } from '@app_state_management/';

/**CORE IMPORTS */
import LoginModel from '@core_modules/Login/model/LoginModel';
import { TranslationState } from '@core_modules/Translation/model';
import { UsersState, UserManagementUtilities } from '@core_modules/UserManagement/model';
import { DashboardModel } from '@core_modules/Dashboard2/model';
import { AccountSettingsModel } from '@core_modules/AccountSettings/model';
import { ResetPasswordModel } from '@core_modules/ResetPassword/model/';

const RootStore = types
  .model('RootStore', {
    globalState: types.optional(GlobalModel, {}),
    login: types.optional(LoginModel, {}),
    users: types.optional(UsersState, {}),
    translations: types.optional(TranslationState, {}),
    accountSettings: types.optional(AccountSettingsModel, {}),
    dashboard: types.optional(DashboardModel, {}),
    UserManagementUtilities: types.optional(UserManagementUtilities, {}),
    resetPassword: types.optional(ResetPasswordModel, {}),
    dropdownSettings: types.optional(DropdownSettingsModel, {}),
    ...AppStore
  })
  .views((self) => ({}))
  .actions((self) => ({
    initialize: flow(function* () {
      // This should check if the currently stored login data is still valid.
      // var token = localStorage.getItem("token")
      const { data: result, status: responseStatus } = yield axios
        .get('/api/auth/token')
        .then((response) => response)
        .catch((error) => error.response);

      let { user } = result;

      if (responseStatus === 200) {
        localStorage.setItem('user', JSON.stringify(user));
      }

      self.login = LoginModel.create(
        responseStatus === 200
          ? {
              id: user.id,
              email: user.email,
              first_name: user.first_name,
              last_name: user.last_name,
              user_type_id: user.user_type_id,
              fingerprint: user.fingerprint,
              type: user.Type.name,
              city: user.city,
              street_nr: user.street_nr,
              country: user.country,
              zip_code: user.zip_code,
              phone_number: user.phone_number,
              rememberMe: user.rememberMe,
              isLoggedIn: true,
              isLoading: false
            }
          : {
              id: '0',
              email: '',
              type: '',
              first_name: '',
              last_name: '',
              user_type_id: 0,
              zip_code: '',
              country: '',
              street_nr: '',
              fingerprint: '',
              phone_number: '',
              rememberMe: false,
              isLoggedIn: false,
              isLoading: false
            }
      );
    })
  }));

export default RootStore;
