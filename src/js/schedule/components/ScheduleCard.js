import PropTypes from 'prop-types';
import React from 'react';

import { Card, CardActions, CardHeader, CardTitle } from 'material-ui';

import TicketLink from './TicketLink';
import { isScheduleActive } from '../utils';

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
  available: PropTypes.bool.isRequired,
};
const defaultProps = {};

const ScheduleCard = ({ schedule, available }) => (
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
    {isScheduleActive(schedule) && schedule.link
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

