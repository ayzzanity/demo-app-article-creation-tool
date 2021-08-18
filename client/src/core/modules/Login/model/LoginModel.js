import { types, flow } from 'mobx-state-tree';
import axios from 'axios';
import { readyUserData } from './helpers';
import ClientJS from 'clientjs';

const STATUS_OK = 200;

const API_PATH = '/api/auth';

new ClientJS();
const windowClient = new window.ClientJS();

export default types
  .model('LoginModel', {
    id: types.optional(types.string, ''),
    email: types.optional(types.string, ''),
    first_name: types.optional(types.string, ''),
    last_name: types.optional(types.string, ''),
    phone_number: types.optional(types.maybeNull(types.string), ''),
    rememberMe: types.optional(types.boolean, false),
    zip_code: types.optional(types.maybeNull(types.string), ''),
    fingerprint: types.optional(types.string, ''),
    user_type_id: types.optional(types.number, 0),
    street_nr: types.optional(types.maybeNull(types.string), ''),
    country: types.optional(types.maybeNull(types.string), ''),
    city: types.optional(types.maybeNull(types.string), ''),
    type: types.optional(types.string, ''),
    isLoggedIn: types.optional(types.boolean, false),
    active: types.optional(types.boolean, true),
    isLoading: types.optional(types.boolean, true),
    loginErrorMessage: types.optional(types.string, ''),
    isLoggingIn: types.optional(types.boolean, false),
    showOTP: types.optional(types.boolean, false)
  })

  .views((self) => ({
    get standard_user_restriction() {
      return self.user_type_id === 2 ? self.id : '';
    },
    get getFingerPrint() {
      const ua = windowClient.getBrowserData().ua;
      const canvasPrint = windowClient.getCanvasPrint();

      const fingerprint = windowClient.getCustomFingerprint(ua, canvasPrint).toString();
      return fingerprint;
    }
  }))
  .actions((self) => ({
    setUserData(userData) {
      self = Object.assign(self, userData);
    },

    toggleIsLogginIn() {
      self.isLoggingIn = !self.isLoggingIn;
    },

    setLoginErrorMessage(errorMessage) {
      self.loginErrorMessage = errorMessage;
    },

    setStatus(statusId) {
      self.isLoggedIn = statusId;
    },

    setShowOTPToggle() {
      self.showOTP = !self.showOTP;
    },

    resetState() {
      let intialState = {
        id: '',
        email: '',
        first_name: '',
        last_name: '',
        phone_number: '',
        rememberMe: false,
        fingerprint: '',
        user_type_id: 0,
        city: '',
        zip_code: '',
        country: '',
        type: '',
        isLoggedIn: false,
        active: true,
        isLoading: true,
        loginErrorMessage: '',
        isLoggingIn: false
      };

      self = Object.assign(self, intialState);
    },

    login: flow(function* ({ email, password, rememberMe, fingerprint, t }) {
      try {
        const { data: result, status: responseStatus } = yield axios.post(API_PATH, {
          email,
          password,
          rememberMe,
          fingerprint
        });

        return self.validateUser({ result, responseStatus, password });
      } catch (error) {
        return { success: false, message: t('Invalid email or password') };
      }
    }),

    async logout() {
      let response = await axios.post(`${API_PATH}/logout`);

      if (response.status === STATUS_OK) {
        self.resetState();

        localStorage.removeItem('user');
        return true;
      } else {
        return false;
      }
    },

    validateUser({ result, responseStatus, password }) {
      const { email, fingerprint, rememberMe } = result.user;

      if (responseStatus !== STATUS_OK) return { success: false, ...result };

      if (responseStatus === STATUS_OK && result.suspended)
        return { success: false, suspended: true };

      if (result.new) {
        self.setUserData({ email, rememberMe, fingerprint, password });
        return { success: true, newDevice: true };
      }

      if (result.user && !result.hasOwnProperty('new')) {
        readyUserData(result, self, password);

        return { success: true, newDevice: false };
      }

      return { success: false };
    },
    update: flow(function* (password, email, firstName, lastName, phoneNumber) {
      const {
        data: result,
        status: responseStatus,
        statusText
      } = yield axios
        .put(`/api/users/${self.id}`, {
          password,
          email,
          firstName,
          lastName,
          phoneNumber
        })

        .then((response) => response)
        .catch((error) => error.response);

      //setTimeout(function(){
      // self.status =isNaN(result)?1:result;
      if (responseStatus !== 200) {
        console.log(statusText);
        return false;
      }
      var localUser = JSON.parse(localStorage.getItem('user'));
      if (self.id === localUser.id) {
        if (result.token) {
          self.setToken(result.token);
          axios.defaults.headers.common['X-Auth-Token'] = result.token;
          localStorage.removeItem('token');
          localStorage.setItem('token', result.token);
        }
      }
      if (result.passwordchanged) {
        self.logout();
        return true;
      }
      if (result.user) {
        if (self.id === localUser.id) {
          //self.setEmail(result.user.email);
          //self.setId(parseInt(result.user.id));
          self.setFirstName(result.user.first_name);
          self.setLastName(result.user.last_name);
          // self.setCompanyId(result.user.companyId);
          self.setPhoneNumber(result.user.phone_number);
          //self.setStatus(true);
          localStorage.setItem('user', JSON.stringify(result.user));
        }
        return true;
      } else return false;
    }),
    updateProfile: flow(function* (email, password, isEmailChanged) {
      try {
        console.log(password);
        const {
          data: result,
          status: responseStatus,
          statusText
        } = yield axios
          .put(`/api/users/${self.id}`, {
            email,
            password,
            fingerprint: self.fingerprint,
            rememberMe: self.rememberMe,
            isSelf: true,
            isEmailChanged
          })
          .then((response) => response)
          .catch((error) => {
            throw error;
          });

        //setTimeout(function(){
        // self.status =isNaN(result)?1:result;
        if (responseStatus !== 200) {
          console.log(statusText);
          return false;
        }
        var localUser = JSON.parse(localStorage.getItem('user'));
        if (self.id === localUser.id) {
          if (result.token) {
            self.setToken(result.token);
            axios.defaults.headers.common['X-Auth-Token'] = result.token;
            localStorage.removeItem('token');
            localStorage.setItem('token', result.token);
          }
        }
        if (result.passwordchanged) {
          self.logout();
          return true;
        }
        if (result.user) {
          if (self.id === localUser.id) {
            //self.setEmail(result.user.email);
            //self.setId(parseInt(result.user.id));
            self.setFirstName(result.user.firstName);
            self.setLastName(result.user.lastName);
            // self.setCompanyId(result.user.companyId);
            self.setPhoneNumber(result.user.phoneNumber);
            // self.setIsAdmin(result.user.isAdmin === "1");
            //self.setStatus(true);
            localStorage.setItem('user', JSON.stringify(result.user));
          }
          return true;
        } else return false;
      } catch (err) {
        throw err;
      }
    }),

    resetPassword: flow(function* (email) {
      //  return true;

      const { data: result, status: responseStatus } = yield axios
        .post(`${API_PATH}/resetpassword`, {
          email
        })

        .then((response) => response)
        .catch((error) => error.response);

      if (responseStatus !== 200) return false;

      if (result.success) {
        return true;
      } else return false;
    }),

    loginOTP: flow(function* ({ email, password, rememberMe, fingerprint, pin }) {
      const { data: result, status: responseStatus } = yield axios
        .post(`${API_PATH}/login_device`, {
          email,
          password,
          rememberMe,
          fingerprint,
          pin
        })

        .then((response) => response)
        .catch((error) => error.response);

      if (responseStatus !== 200) return { success: false, ...result };

      if (result.user) {
        readyUserData(result, self);

        return { success: true, newDevice: false };
      } else return { success: false };
    })
  }));
