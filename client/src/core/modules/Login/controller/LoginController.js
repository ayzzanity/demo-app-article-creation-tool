const LoginController = ({ store, history, t }) => {
  const handleLogin = async (values) => {
    const fingerprint = store.login.getFingerPrint
    store.login.toggleIsLogginIn()

    let response = await store.login.login({ ...values, fingerprint, t })

    let { success, message, newDevice } = response

    if (success) {
      if (newDevice) {
        store.login.toggleIsLogginIn()
        store.login.setShowOTPToggle()
        return
      } else {
        return history.push("/")
      }
    }

    if (!success) {
      store.login.toggleIsLogginIn()
      store.login.setLoginErrorMessage(message)
      return
    }
  }

  const handleOTP = async (values) => {
    let { pin } = values
    let { email, password, rememberMe, fingerprint } = store.login

    let userData = { email, password, rememberMe, fingerprint, pin }

    store.login.toggleIsLogginIn()

    let response = await store.login.loginOTP(userData)

    let { success, newDevice } = response

    if (success && !newDevice) {
      store.login.toggleIsLogginIn()
      return history.push("/")
    }
  }

  return { handleLogin, handleOTP }
}

export default LoginController
