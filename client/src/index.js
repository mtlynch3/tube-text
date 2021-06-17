import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './app/App';

import { BrowserRouter } from 'react-router-dom';

/**
 * This is the Provider Component that is needed in order to
 * provide the store to our app component that will have our 
 * SPA's (Single Page Application) contents.
 */
import { Provider } from 'react-redux';
/**
 * The store has our layout in respect to the actions our app
 * will have, the middleware we will use, and more.
 */
import store from './store/index';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>, document.getElementById('root')
);
