import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ROUTES from './constants/routes';
import MainLayout from './views/layouts/Main/Main';

const App = () => (
  <MainLayout>
    <Switch>
      {ROUTES.map(({ id, path, exact, component: Component, props }) => (
        <Route key={id} exact={exact} path={path}>
          <Component {...props} />
        </Route>
      ))}
    </Switch>
  </MainLayout>
);

export default App;
