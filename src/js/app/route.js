import React from 'react';

import { Redirect, Route, Switch } from 'react-router-dom';

import Root from './components/Root';
import features from './features';

export default () => (
  <Switch>
    <Route exact path="/" component={Root} />
    {features.map(feature => (
      <Route key={feature.constants.NAME} path={`/${feature.constants.NAME}`} component={feature.route} />
    ))}
    <Redirect to="/" />
  </Switch>
);
