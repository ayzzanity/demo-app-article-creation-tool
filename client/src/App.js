import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

/**APP IMPORTS */
import { ArticleManagement } from '@app_modules/ArticleManagement/view';
import { DisplayArticles, DisplayArticle } from '@app_modules/DisplayArticles/view';
import { Dashboard } from '@app_modules/Dashboard/view';
import { NavBar } from '@app_modules/Layout';
import { PublicRoute } from '@app_routing/';

/**APP CORE */
import '@core_assets/css/exact-styles.css';
import '@core_assets/css/App.css';
import '@core_assets/css/App.less';
import '@core_assets/css/antd-custom.css';

import { PrivateRoute, Routes } from '@core_routing/';
import {
  AdminSettings,
  AdminLayout,
  SignInLayout,
  // Dashboard,
  UserManagement,
  Login,
  ResetPassword,
  ChangePassword,
  Error404,
  Translation
} from '@core_modules/';
import UserActivityTable from '@core_modules/Dashboard/components/UserActivityTable';

function App({ store }) {
  let { login } = store;

  // eslint-disable-next-line
  useEffect(store.translations.GET_LOCALES, []);

  return (
    !login.isLoading && (
      <>
        <Router>
          <Switch>
            <PrivateRoute
              exact
              path={Routes.HOME_ROUTE}
              allowed={['Administrator']}
              isAuthorized={true}
              login={login}
              Component={Dashboard}
              Layout={AdminLayout}
            />
            <PrivateRoute
              exact
              path={Routes.ARTICLE_MANAGEMENT_ROUTE}
              allowed={['Administrator']}
              isAuthorized={true}
              login={login}
              Component={ArticleManagement}
              Layout={AdminLayout}
            />
            <PrivateRoute
              exact
              path={Routes.TRANSLATION_VIEW_ROUTE}
              allowed={['Administrator']}
              isAuthorized={true}
              login={login}
              Component={Translation}
              Layout={AdminLayout}
            />
            <PrivateRoute
              exact
              path={Routes.USER_MANAGEMENT_ROUTE}
              allowed={['Administrator']}
              isAuthorized={true}
              login={login}
              Component={UserManagement}
              Layout={AdminLayout}
            />
            <PrivateRoute
              exact
              path={Routes.LOGIN_ROUTE}
              Component={Login}
              isAuthorized={false}
              login={login}
              allowed={['GUEST']}
              Layout={SignInLayout}
            />
            <PrivateRoute
              exact
              path={Routes.RESET_PASSWORD_ROUTE}
              Component={ResetPassword}
              isAuthorized={false}
              login={login}
              allowed={['GUEST']}
              Layout={SignInLayout}
            />
            <PrivateRoute
              exact
              path={Routes.CHANGE_PASSWORD_ROUTE}
              Component={ChangePassword}
              isAuthorized={false}
              login={login}
              allowed={['GUEST']}
              Layout={SignInLayout}
            />
            <PrivateRoute
              exact
              path={Routes.ADMIN_SETTINGS_ROUTE}
              Component={AdminSettings}
              isAuthorized={true}
              login={login}
              allowed={['Administrator']}
              Layout={AdminLayout}
            />

            <PublicRoute
              exact
              path={Routes.ARTICLES_ROUTE}
              Component={DisplayArticles}
              Layout={NavBar}
            />
            <PublicRoute
              exact
              path={`${Routes.ARTICLE_ROUTE}/:user_article_id/:id`}
              Component={DisplayArticle}
              Layout={NavBar}
            />
            <Route component={Error404} />
          </Switch>
        </Router>
      </>
    )
  );
}

export default inject('store')(observer(App));
