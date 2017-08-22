import PropTypes from 'prop-types';
import React from 'react';

import { Card, CardActions, CardHeader, CardTitle, RaisedButton } from 'material-ui';

import { isScheduleActive, withDay } from '../utils';

import FemaleIcon from '../../../img/female.png';
import MaleIcon from '../../../img/male.png';
import MixedIcon from '../../../img/mixed.png';

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

const styles = {
  card: {
    padding: '0.5em',
    margin: '0.5em',
  },
  cardHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardHeaderTitle: {
    fontSize: '18px',
  },
  cardSubtitle: {
    fontSize: '16px',
  },
  cardActions: {
    textAlign: 'right',
  },
};

const toIcon = (gender) => {
  if (gender === '女') {
    return FemaleIcon;
  } else if (gender === '男') {
    return MaleIcon;
  }
  return MixedIcon;
};

const ScheduleCard = ({ schedule, available }) => (
  <Card style={styles.card}>
    <CardHeader
      style={styles.cardHeader}
      titleStyle={styles.cardHeaderTitle}
      title={`${withDay(schedule.date)}${schedule.time}`}
      avatar={toIcon(schedule.gender)}
    />
    <CardTitle
      subtitleStyle={styles.cardSubtitle}
      title={schedule.event}
      subtitle={schedule.place}
    />
    {isScheduleActive(schedule) && schedule.link
      ? (
        <CardActions style={styles.cardActions}>
          <RaisedButton
            primary
            disabled={!available}
            label={available ? '購票' : '已售罄'}
            href={schedule.link}
          />
        </CardActions>
      )
      : null
    }
  </Card>
);

ScheduleCard.propTypes = propTypes;
ScheduleCard.defaultProps = defaultProps;

export default ScheduleCard;

