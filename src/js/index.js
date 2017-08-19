import React from 'react';
import ReactDOM from 'react-dom';

import { AppContainer } from 'react-hot-loader';

import App from './app';

const render = (Component, container) => {
  ReactDOM.render(<AppContainer><Component /></AppContainer>, container);
};

const container = document.createElement('div');
document.body.appendChild(container);
render(App, container);

if (module.hot) {
  module.hot.accept('./app', () => {
    /* eslint-disable global-require */
    const NextApp = require('./app').default;
    /* eslint-enable */
    render(NextApp, container);
  });
}
