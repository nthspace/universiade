import React from 'react';

import { MuiThemeProvider } from 'material-ui';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import route from './route';
import history from './history';
import store from './store';

export default () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <MuiThemeProvider>
        <Route component={route} />
      </MuiThemeProvider>
    </ConnectedRouter>
  </Provider>
);
