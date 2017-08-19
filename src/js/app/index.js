import React from 'react';

import { Provider } from 'react-redux';
import { HashRouter as Router, Route } from 'react-router-dom';

import route from './route';
import history from './history';
import store from './store';

export default () => (
  <Provider store={store}>
    <Router history={history}>
      <Route component={route} />
    </Router>
  </Provider>
);
