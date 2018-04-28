import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';

import styles from './Avatar.scss';

const Avatar = props => (
  <div styleName="frame">
    <img
      alt={props.name}
      src={props.src}
    />
  </div>
);

Avatar.defaultProps = {
  style: {},
  name: '',
};

Avatar.propTypes = {
  src: PropTypes.string.isRequired,
  name: PropTypes.string,
};

export default CSSModules(Avatar, styles);