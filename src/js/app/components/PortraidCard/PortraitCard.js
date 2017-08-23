import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';

import styles from './PortraitCard.scss';

import Avatar from '../Avatar';

class PortraitCard extends React.PureComponent {
  render() {
    return (
      <div styleName="container">
        <Avatar
          src={this.props.src}
          name={this.props.name}
        />
        <div styleName="name">{this.props.name}</div>
      </div>
    );
  }
}

PortraitCard.defaultProps = {};
PortraitCard.propTypes = {
  src: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default CSSModules(PortraitCard, styles);