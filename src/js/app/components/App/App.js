import PropTypes from 'prop-types';
import React from 'react';

import styles from './App.scss';

const propTypes = {
  children: PropTypes.node.isRequired,
};
const defaultProps = {};

const App = ({ children }) => {
  return (
    <div>{children}</div>
  );
};

App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default App;
