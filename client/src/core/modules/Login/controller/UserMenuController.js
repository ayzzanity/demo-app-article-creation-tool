const UserMenuController = ({ store, i18n }) => {
  const changeLanguage = (locale) => {
    console.log('🚀 ~ file: UserMenuController.js ~ line 3 ~ changeLanguage ~ locale', locale);
    store.globalState.setLanguage(locale);
  };

  return { changeLanguage };
};

export default UserMenuController;
