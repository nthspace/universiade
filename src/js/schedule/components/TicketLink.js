import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  RaisedButton,
} from 'material-ui';
import * as ApiUtil from '../../ApiUtil';


class TicketLink extends PureComponent {
  render() {
    const { link, soldOut } = this.props;

    if (!link) {
      return null;
    }

    const label = soldOut ? '已售罄' : '購票';

    return (
      <RaisedButton
        label={label}
        primary
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        disabled={soldOut}
      />
    );
  }
}

TicketLink.propTypes = {
  link: PropTypes.string,
  soldOut: PropTypes.bool.isRequired,
};

export default TicketLink;
