import Leaderboards from '../pages/leaderboards/Leaderboards';
import Game from '../pages/game/Game';
import Home from '../pages/home/Home';
import Error from '../components/Error/Error';

const ROUTES = [
  {
    id: 'leaderboards',
    path: '/leaderboards',
    component: Leaderboards,
  },
  {
    id: 'game',
    path: '/game',
    component: Game,
  },
  {
    id: 'home',
    path: '/',
    exact: true,
    component: Home,
  },
  {
    id: 'error',
    component: Error,
    props: { subTitle: 'Oops! Nothing was found.' },
  },
];

export default ROUTES;
