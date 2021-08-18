import { types, flow } from "mobx-state-tree"
import Axios from "axios"

const API_PATH = "/api/auth/reset_password"
const API_PATH_USERS = "/api/users/change_password"

export default types
  .model("ResetPasswordModel", {
    id: types.optional(types.number, 0),
    email: types.optional(types.string, ""),
    token: types.optional(types.string, ""),
    message: types.optional(types.string, ""),
    isSuccess: types.optional(types.boolean, false),
    isSendingEmail: types.optional(types.boolean, false),
    startCountdown: types.optional(types.boolean, localStorage.getItem("countdownTimeLeft") ? true : false),
    islinkexpired: types.optional(types.boolean, false),
    isChangingPassword: types.optional(types.boolean, false),
  })

  .views((self) => ({}))
  .actions((self) => ({
    requestResetPassword: flow(function* (email) {
      try {
        let response = yield Axios.post(API_PATH, { email })

        return { success: true, message: response.data.msg }
      } catch (error) {
        return { success: false, message: error.response.data.message }
      }
    }),

    setIsChangingPassword(isChangingPassword) {
      self.isChangingPassword = isChangingPassword
    },

    setStartCountdown(isStart) {
      self.startCountdown = isStart
    },

    setMessage(message, isSuccess) {
      self.message = message
      self.isSuccess = isSuccess
    },
    setIsLinkExpired(boolen) {
      self.islinkexpired = boolen
    },
    setIsSendingEmail(isSendingEmail) {
      self.isSendingEmail = isSendingEmail
    },

    validateUserAndToken: flow(function* ({ token, userId }) {
      try {
        const response = yield Axios.get(`${API_PATH}/${token}/${userId}`)
        return { success: true, message: response.data.msg }
      } catch (error) {
        return { success: false, message: error.response.data.message }
      }
    }),
    changePassword: flow(function* ({ token, userId, password, fingerprint }) {
      try {
        let response = yield Axios.put(`${API_PATH_USERS}/${userId}`, { token, password, fingerprint })
        console.log(response, 'Testet')
        return { success: true, ...response }
      } catch (error) {
        console.log(console.log({ token, userId, password, fingerprint, error }, "Test"))
        return { success: false, message: error.response.data.message }
      }
    }),
  }))
