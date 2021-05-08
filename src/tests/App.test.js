import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import store from '../state/store';
import App from '../App';

test('should mount app correctly', () => {
  const { getByText } = render(
    <Provider store={store}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </Provider>,
  );

  expect(getByText(/mini-memory game/i)).toBeInTheDocument();
});
