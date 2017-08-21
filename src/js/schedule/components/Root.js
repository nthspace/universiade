import PropTypes from 'prop-types';
import React from 'react';

import MobileRoot from './MobileRoot';

const propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
    params: PropTypes.shape({
      sport: PropTypes.string,
    }).isRequired,
  }).isRequired,
  schedules: PropTypes.object,
};
const defaultProps = {
  schedules: {},
};

class Root extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      date: null,
      place: null,
    };
    this.handleSportChange = this.handleSportChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handlePlaceChange = this.handlePlaceChange.bind(this);
  }

  handleSportChange(value) {
    const { history } = this.props;
    const { path } = this.props.match;
    history.push(path.replace(':sport', value));
  }

  handleDateChange(value) {
    this.setState({
      date: value,
    });
  }

  handlePlaceChange(value) {
    this.setState({
      place: value,
    });
  }

  render() {
    const { handleSportChange, handleDateChange, handlePlaceChange } = this;
    const { sport } = this.props.match.params;
    const { date, place } = this.state;
    const sports = Object.keys(this.props.schedules);
    const dates = this.props.schedules[sport]
      ? this.props.schedules[sport]
        .reduce((accumulator, value) => {
          if (!accumulator.includes(value.date)) {
            accumulator.push(value.date);
          }
          return accumulator;
        }, [])
      : [];
    const places = this.props.schedules[sport]
      ? this.props.schedules[sport]
        .reduce((accumulator, value) => {
          if (!accumulator.includes(value.place)) {
            accumulator.push(value.place);
          }
          return accumulator;
        }, [])
      : [];
    const schedules = this.props.schedules[sport]
      ? this.props.schedules[sport]
        .filter(element => !date || element.date === date)
        .filter(element => !place || element.place === place)
      : [];
    return (
      <MobileRoot
        sports={sports}
        sport={sport}
        dates={dates}
        date={date}
        places={places}
        place={place}
        schedules={schedules}
        onSportChange={handleSportChange}
        onDateChange={handleDateChange}
        onPlaceChange={handlePlaceChange}
      />
    );
  }
}

Root.propTypes = propTypes;
Root.defaultProps = defaultProps;

export default Root;
