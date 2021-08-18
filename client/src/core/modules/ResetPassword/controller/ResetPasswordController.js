const ResetPasswordController = ({ store, params, history }) => {
  const handleResetPassword = async ({ email }) => {
    store.resetPassword.setIsSendingEmail(true)

    const response = await store.resetPassword.requestResetPassword(email)

    let { success, message } = response

    success && store.resetPassword.setStartCountdown(true)
    store.resetPassword.setMessage(message, success)
    store.resetPassword.setIsSendingEmail(false)
  }

  const handleStopCountdown = () => {
    localStorage.removeItem("countdownTimeLeft")
    store.resetPassword.setStartCountdown(false)
  }

  const handleValidateUserAndToken = async () => {
    const response = await store.resetPassword.validateUserAndToken(params)
    const { success, message } = response
    if (!success) {
      store.resetPassword.setMessage(message, success)
      store.resetPassword.setIsLinkExpired(true)
    }
  }

  const handleChangePassword = async ({ password }) => {
    store.resetPassword.setIsChangingPassword(true)
    const fingerprint = store.login.getFingerPrint
    const { data: result, status: responseStatus } = await store.resetPassword.changePassword({ ...params, password, fingerprint })

    let response = await store.login.validateUser({ result, responseStatus })
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

    store.resetPassword.setIsChangingPassword(false)
  }
  const cleanUpMessage = () => {
    store.resetPassword.setMessage("")
  }

  const handleCountdownTick = (tick) => {
    localStorage.setItem("countdownTimeLeft", Date.now() + tick.total)
  }

  return { handleResetPassword, handleValidateUserAndToken, cleanUpMessage, handleChangePassword, handleStopCountdown, handleCountdownTick }
}

export default ResetPasswordController
