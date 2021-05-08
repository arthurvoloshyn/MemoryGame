import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter, Route } from 'react-router-dom';

import store from '../state/store';
import App from '../App';
import { APPLICATION_ROUTES, HOME_INDEX } from './config';

test('should render / route correctly', () => {
  const { getByText } = render(
    <Provider store={store}>
      <MemoryRouter
        initialEntries={APPLICATION_ROUTES}
        initialIndex={HOME_INDEX}
      >
        <App />
      </MemoryRouter>
    </Provider>,
  );

  expect(getByText(/mini-memory game/i)).toBeInTheDocument();
  expect(getByText(/nickname/i)).toBeInTheDocument();
  expect(getByText(/start game/i)).toBeInTheDocument();
});

test('should input react on typing', () => {
  render(
    <Provider store={store}>
      <MemoryRouter
        initialEntries={APPLICATION_ROUTES}
        initialIndex={HOME_INDEX}
      >
        <App />
      </MemoryRouter>
    </Provider>,
  );

  const text = 'test';
  const input = screen.getByLabelText(/nickname/i);

  userEvent.type(input, text);

  expect(input).toHaveValue(text);
});

test('should display errors on wrong nickname', () => {
  render(
    <Provider store={store}>
      <MemoryRouter
        initialEntries={APPLICATION_ROUTES}
        initialIndex={HOME_INDEX}
      >
        <App />
      </MemoryRouter>
    </Provider>,
  );

  const tooLongNickname = '123456789012345678901234567890123';
  const tooShortNickname = '12';
  const input = screen.getByLabelText(/nickname/i);

  userEvent.type(input, tooLongNickname);

  expect(input).toHaveValue(tooLongNickname);
  expect(screen.getByText(/nickname is too long./i)).toBeInTheDocument();

  userEvent.type(input, tooShortNickname);

  expect(input).toHaveValue(tooShortNickname);
  expect(screen.getByText(/nickname is too short./i)).toBeInTheDocument();
});

test('should redirect to /game after form submit', () => {
  let testLocation;

  render(
    <Provider store={store}>
      <MemoryRouter
        initialEntries={APPLICATION_ROUTES}
        initialIndex={HOME_INDEX}
      >
        <App />
        <Route
          path="*"
          render={({ location }) => {
            testLocation = location;
            return null;
          }}
        />
      </MemoryRouter>
    </Provider>,
  );

  const text = 'test';
  const input = screen.getByLabelText(/nickname/i);

  userEvent.type(input, text);

  const button = screen.getByText(/start game/i);

  userEvent.click(button);

  expect(testLocation.pathname).toBe('/game');
});
