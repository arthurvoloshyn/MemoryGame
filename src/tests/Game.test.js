import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import store from '../state/store';
import App from '../App';
import { APPLICATION_ROUTES, GAME_INDEX } from './config';

test('should render /game route correctly', () => {
  const { getByText } = render(
    <Provider store={store}>
      <MemoryRouter
        initialEntries={APPLICATION_ROUTES}
        initialIndex={GAME_INDEX}
      >
        <App />
      </MemoryRouter>
    </Provider>,
  );

  expect(getByText(/player/i)).toBeInTheDocument();
});
