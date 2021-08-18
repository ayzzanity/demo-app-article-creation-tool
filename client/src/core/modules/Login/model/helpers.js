export const readyUserData = (result, self, password) => {
  let { user } = result;

  let userData = {
    ...user,
    type: user.Type.name
  };

  self.setUserData(userData);

  self.setStatus(true);

  localStorage.setItem('user', JSON.stringify(user));
};
