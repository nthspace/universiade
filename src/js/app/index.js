import React from 'react';

import { MuiThemeProvider } from 'material-ui';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route } from 'react-router-dom';

import route from './route';
import history from './history';
import store from './store';

export default () => (
  <Provider store={store}>
    <Router history={history}>
      <MuiThemeProvider>
        <Route component={route} />
      </MuiThemeProvider>
    </Router>
  </Provider>
);
