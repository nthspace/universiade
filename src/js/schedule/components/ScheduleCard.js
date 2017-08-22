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
  img: {
    width: '4em',
    height: '4em',
    marginRight: '1em',
  },
  card: {
    padding: '1em',
    margin: '1em',
  },
  cardHeaderTitle: {
    fontSize: '3em',
  },
  cardTitle: {
    fontSize: '2em',
  },
  cardSubtitle: {
    fontSize: '1.5em',
  },
  cardActions: {
    textAlign: 'right',
  },
  button: {
    width: '100%',
    height: '5em',
    maxWidth: '15em',
    lineHeight: '5em',
  },
  buttonLabel: {
    fontSize: '3em',
  },
};

const Avatar = ({ gender }) => {
  if (gender === '女') {
    return <img style={styles.img} alt="female" src={FemaleIcon} />;
  } else if (gender === '男') {
    return <img style={styles.img} alt="male" src={MaleIcon} />;
  }
  return <img style={styles.img} alt="mixed" src={MixedIcon} />
};

const ScheduleCard = ({ schedule, available }) => (
  <Card style={styles.card}>
    <CardHeader
      titleStyle={styles.cardHeaderTitle}
      title={`${withDay(schedule.date)}${schedule.time}`}
      avatar={<Avatar gender={schedule.gender} />}
    />
    <CardTitle
      titleStyle={styles.cardTitle}
      subtitleStyle={styles.cardSubtitle}
      title={schedule.event}
      subtitle={schedule.place}
    />
    {isScheduleActive(schedule) && schedule.link
      ? (
        <CardActions style={styles.cardActions}>
          <RaisedButton
            style={styles.button}
            labelStyle={styles.buttonLabel}
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

