import React, { StrictMode } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { HashRouter as Router } from 'react-router-dom';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import ENV from './constants/environment';
import store from './state/store';
import App from './App';
import Preloader from './views/components/Preloader/Preloader';
import ErrorBoundary from './views/components/ErrorBoundary/ErrorBoundary';
import Error from './views/components/Error/Error';

import './index.css';

const persistor = persistStore(store);
const loading = <Preloader />;
const error = <Error description="Something went wrong!" title="Error" />;

render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={loading} persistor={persistor}>
        <Router>
          <ErrorBoundary fallback={error}>
            <App />
          </ErrorBoundary>
        </Router>
      </PersistGate>
    </Provider>
  </StrictMode>,
  document.getElementById('root'),
);

serviceWorkerRegistration.register();

// eslint-disable-next-line no-console
ENV.IS_DEV && reportWebVitals(console.log);
