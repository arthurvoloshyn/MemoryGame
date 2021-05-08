import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ROUTES from './constants/routes';
import Layout from './components/layout/Layout';

const App = () => (
  <Layout>
    <Switch>
      {ROUTES.map(({ id, path, exact, component: Component, props }) => (
        <Route key={id} exact={exact} path={path}>
          <Component {...props} />
        </Route>
      ))}
    </Switch>
  </Layout>
);

export default App;
