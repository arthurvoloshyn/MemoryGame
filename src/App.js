import React from 'react';
import { Route } from 'react-router-dom';

import Layout from './components/layout/Layout';
import Home from './pages/home/Home';
import Game from './pages/game/Game';
import Leaderboards from './pages/leaderboards/Leaderboards';

function App() {
  return (
    <Layout>
      <Route path="/leaderboards">
        <Leaderboards />
      </Route>
      <Route path="/game">
        <Game />
      </Route>
      <Route exact path="/">
        <Home />
      </Route>
    </Layout>
  );
}

export default App;
