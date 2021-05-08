import Leaderboards from '../views/pages/Leaderboards/Leaderboards';
import Game from '../views/pages/Game/Game';
import Home from '../views/pages/Home/Home';
import Error from '../views/components/Error/Error';

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
