import PropTypes from 'prop-types';
import React from 'react';

import Media from 'react-media';

import DesktopRoot from './DesktopRoot';
import MobileRoot from './MobileRoot';
import { get } from '../../ApiUtil';

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
      event: '',
      availabilities: {},
    };
    this.checkLinkAvailability = this.checkLinkAvailability.bind(this);
    this.handleSportChange = this.handleSportChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handlePlaceChange = this.handlePlaceChange.bind(this);
    this.handleEventChange = this.handleEventChange.bind(this);
  }

  componentDidMount() {
    const { schedules } = this.props;
    const { sport } = this.props.match.params;
    const links = schedules[sport]
      ? schedules[sport].reduce((accumulator, value) => {
        if (value.link && !accumulator.includes(value.link)) {
          accumulator.push(value.link);
        }
        return accumulator;
      }, [])
      : [];
    links.forEach((value) => {
      this.checkLinkAvailability(value);
    });
  }

  componentWillReceiveProps(nextProps) {
    const { schedules } = this.props;
    const { schedules: nextSchedules } = nextProps;
    const { sport } = this.props.match.params;
    const { sport: nextSport } = nextProps.match.params;

    if (sport !== nextSport) {
      this.setState({
        date: null,
        place: null,
        event: '',
      });
    }

    if (Object.keys(schedules).length !== Object.keys(nextSchedules).length
      || sport !== nextSport) {
      const { availabilities } = this.state;
      const links = nextSchedules[nextSport]
        ? nextSchedules[nextSport].reduce((accumulator, value) => {
          if (value.link && !(value.link in availabilities) && !accumulator.includes(value.link)) {
            accumulator.push(value.link);
          }
          return accumulator;
        }, [])
        : [];
      links.forEach((value) => {
        this.checkLinkAvailability(value);
      });
    }
  }

  checkLinkAvailability(link) {
    return get(link)
      .then(response => response.text())
      .then((response) => {
        const availabilities = Object.assign({}, this.state.availabilities, {
          [link]: !response.startsWith('<script'),
        });
        this.setState({
          availabilities,
        });
      });
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

  handleEventChange(value) {
    this.setState({
      event: value,
    });
  }

  render() {
    const { handleSportChange, handleDateChange, handlePlaceChange, handleEventChange } = this;
    const { sport } = this.props.match.params;
    const { date, place, event, availabilities } = this.state;
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
        .filter(element => !event || element.event.includes(event))
      : [];
    return (
      <Media query={{ maxWidth: 768 }}>
        {matches => (matches
          ? (
            <MobileRoot
              sports={sports}
              sport={sport}
              dates={dates}
              date={date}
              places={places}
              place={place}
              schedules={schedules}
              availabilities={availabilities}
              onSportChange={handleSportChange}
              onDateChange={handleDateChange}
              onPlaceChange={handlePlaceChange}
            />
          )
          : (
            <DesktopRoot
              sports={sports}
              sport={sport}
              dates={dates}
              date={date}
              places={places}
              place={place}
              event={event}
              schedules={schedules}
              availabilities={availabilities}
              onSportChange={handleSportChange}
              onDateChange={handleDateChange}
              onPlaceChange={handlePlaceChange}
              onEventChange={handleEventChange}
            />
          )
        )}
      </Media>
    );
  }
}

Root.propTypes = propTypes;
Root.defaultProps = defaultProps;

export default Root;
