import PropTypes from 'prop-types';
import React from 'react';

import { Card, CardActions, CardHeader, CardTitle } from 'material-ui';

import TicketLink from './TicketLink';

import LogoIcon from '../../../img/logo.png';

const propTypes = {
  schedule: PropTypes.shape({
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    event: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    place: PropTypes.string.isRequired,
    link: PropTypes.string,
  }).isRequired,
  active: PropTypes.bool.isRequired,
  available: PropTypes.bool.isRequired,
};
const defaultProps = {};

const ScheduleCard = ({ schedule, active, available }) => (
  <Card style={{ margin: '8px' }}>
    <CardHeader
      title={schedule.date}
      subtitle={schedule.time}
      avatar={LogoIcon}
    />
    <CardTitle
      title={schedule.event}
      subtitle={schedule.place}
    />
    {active && schedule.link
      ? (
        <CardActions>
          <TicketLink link={schedule.link} soldOut={!available} />
        </CardActions>
      )
      : null
    }
  </Card>
);

ScheduleCard.propTypes = propTypes;
ScheduleCard.defaultProps = defaultProps;

export default ScheduleCard;

