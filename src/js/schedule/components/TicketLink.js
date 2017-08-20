import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  RaisedButton,
} from 'material-ui';
import * as ApiUtil from '../../ApiUtil';


class TicketLink extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      soldOut: false,
    }
  }

  componentDidMount() {
    const { link } = this.props;

    if (link) {
      ApiUtil.get(link)
        .then(response => response.blob())
        .then((blob) => {
          if (blob.type && blob.type.toLowerCase().includes('script')) {
            this.setState({
              soldOut: true,
            });
          }
        });
    }
  }

  render() {
    const { link } = this.props;

    if (!link) {
      return null;
    }

    const label = this.state.soldOut ? '已售罄' : '購票';

    return (
      <RaisedButton
        label={label}
        primary
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        disabled={this.state.soldOut}
      />
    );
  }
}

TicketLink.propTypes = {
  link: PropTypes.string.isRequired,
};

export default TicketLink;