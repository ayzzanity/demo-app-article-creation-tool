import AppRoutes from '@app_routing/Routes';

/**ADMIN */
const HOME_ROUTE = '/';
const USER_MANAGEMENT_ROUTE = '/user-management';
const ADMIN_SETTINGS_ROUTE = '/admin-settings';

/**SIGN IN */
const LOGIN_ROUTE = '/login';
const RESET_PASSWORD_ROUTE = '/reset-password/';
const CHANGE_PASSWORD_ROUTE = '/change-password/:token/:userId';

const TRANSLATION_VIEW_ROUTE = '/translation';

const Routes = {
  HOME_ROUTE,
  USER_MANAGEMENT_ROUTE,
  ADMIN_SETTINGS_ROUTE,
  LOGIN_ROUTE,
  RESET_PASSWORD_ROUTE,
  CHANGE_PASSWORD_ROUTE,
  TRANSLATION_VIEW_ROUTE,
  ...AppRoutes
};
export default Routes;
