import React from 'react';
import { Route } from 'react-router-dom';

function PublicRoute({ Component, Layout, path, ...rest }) {
  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        return (
          <Layout {...props}>
            <Component />
          </Layout>
        );
      }}
    />
  );
}

export default PublicRoute;
