import PropTypes from 'prop-types';
import React from 'react';

import moment from 'moment';
import { Redirect, Route, Switch } from 'react-router-dom';

import Root from './containers/RootContainer';


const propTypes = {
  match: PropTypes.object.isRequired,
};

const route = ({ match }) => (
  <Switch>
    <Route path={`${match.url}/:sport`} component={Root} />
    <Redirect to={`${match.url}/全部?date=${moment().format('YYYY-MM-DD')}`} />
  </Switch>
);

route.propTypes = propTypes;

export default route;
