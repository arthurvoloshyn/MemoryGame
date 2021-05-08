import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './components/layout/Layout';
import Home from './pages/home/Home';
import Game from './pages/game/Game';
import Leaderboards from './pages/leaderboards/Leaderboards';
import Error from './components/Error/Error';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/leaderboards">
          <Leaderboards />
        </Route>
        <Route path="/game">
          <Game />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route>
          <Error subTitle="Oops! Nothing was found." />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
