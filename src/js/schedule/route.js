import PropTypes from 'prop-types';
import React from 'react';

import { Redirect, Route, Switch } from 'react-router-dom';

import Root from './containers/ScheduleListContainer';

const propTypes = {
  match: PropTypes.object.isRequired,
};

const route = ({ match }) => (
  <Switch>
    <Route exact path={match.url} component={Root} />
    <Redirect to={match.url} />
  </Switch>
);

route.propTypes = propTypes;

export default route;
