import React from 'react';
import { Redirect, Route } from 'react-router-dom';

/**CORE IMPORTS */
import { Error404 } from '@core_modules/';

function PrivateRoute({ Component, Layout, path, isAuthorized, allowed, login, ...rest }) {
  if (!isAuthorized) {
    return (
      <Route
        path={path}
        {...rest}
        render={(props) => {
          if (login.isLoggedIn) {
            return (
              <Redirect
                to={{
                  pathname: '/',
                  state: { from: props.location }
                }}
              />
            );
          } else {
            return (
              <Layout {...props}>
                <Component />
              </Layout>
            );
          }
        }}
      />
    );
  } else {
    return (
      <Route
        path={path}
        {...rest}
        render={(props) => {
          if (login.isLoggedIn) {
            if (allowed.includes(login.type)) {
              if (Layout) {
                return (
                  <Layout {...props}>
                    <Component />
                  </Layout>
                );
              } else {
                return <Component />;
              }
            } else {
              if (Layout) {
                return (
                  <Layout {...props}>
                    <Error404 />
                  </Layout>
                );
              } else {
                return <Error404 />;
              }
            }
          } else {
            return (
              <Redirect
                to={{
                  pathname: '/login',
                  state: { from: props.location }
                }}
              />
            );
          }
        }}
      />
    );
  }
}

export default PrivateRoute;
