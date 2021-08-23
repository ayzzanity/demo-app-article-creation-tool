import { Routes } from '@core_routing/';

const LayoutController = ({ store, history, setSelectedKeys }) => {
  const setLanguage = async (locale) => {
    console.log(locale, 'sdfsdf');
    await store.globalState.setLanguage(locale);
  };

  const handleLogout = async () => {
    let response = await store.login.logout();

    if (response) {
      //history.push(Routes.LOGIN_ROUTE)
      window.location = Routes.LOGIN_ROUTE;
    }
  };

  const applyActiveClass = (locale) => {
    return store.globalState.language === locale && 'active';
  };

  const setDefaultMenu = async () => {
    if (history.location.pathname === Routes.HOME_ROUTE) {
      setSelectedKeys(['1']);
    } else if (history.location.pathname === Routes.USER_MANAGEMENT_ROUTE) {
      setSelectedKeys(['2']);
    } else if (history.location.pathname === Routes.ARTICLE_MANAGEMENT_ROUTE) {
      setSelectedKeys(['3']);
    }
  };

  const responsiveClass = (screens) => {
    let { xs, sm, md, lg, xl } = screens;

    if (sm && md && lg && xl) {
      return 'w-35';
    } else if (sm && md) {
      return 'w-50';
    } else if (sm) {
      return 'w-75';
    } else if (xs) {
      return 'w-100 mx-4';
    } else {
      return 'w-35';
    }
  };

  return { setLanguage, handleLogout, applyActiveClass, setDefaultMenu, responsiveClass };
};

export default LayoutController;
