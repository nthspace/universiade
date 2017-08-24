import PropTypes from 'prop-types';
import React from 'react';

import Media from 'react-media';

import DesktopRoot from './DesktopRoot';
import MobileRoot from './MobileRoot';
import { get } from '../../ApiUtil';

import Tracker from '../../Tracker';
import {
  GA_EVENT_CATEGORY,
  GA_FILTER_ACTION,
} from '../../core/constants';

const propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    query: PropTypes.object,
  }).isRequired,
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
      place: null,
      event: '',
      availabilities: {},
    };
    this.filterSchedules = this.filterSchedules.bind(this);
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
    Tracker.logPageView();
  }

  componentWillReceiveProps(nextProps) {
    const { schedules } = this.props;
    const { schedules: nextSchedules } = nextProps;
    const { sport } = this.props.match.params;
    const { sport: nextSport } = nextProps.match.params;

    if (sport !== nextSport) {
      this.setState({
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

  filterSchedules(schedules) {
    const { date } = this.props.location.query;
    const { place, event } = this.state;
    return schedules
      .filter(element => !date || element.date === date)
      .filter(element => !place || element.place === place)
      .filter(element => !event || element.event.includes(event));
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

    Tracker.logEvent(GA_EVENT_CATEGORY.filter, GA_FILTER_ACTION.sport, value);
  }

  handleDateChange(value) {
    const { history } = this.props;
    const { pathname, query } = this.props.location;
    history.push({
      pathname,
      query: Object.assign({}, query, { date: value }),
    });

    Tracker.logEvent(
      GA_EVENT_CATEGORY.filter,
      `${this.state.sport}-${GA_FILTER_ACTION.date}`,
      value,
    );
  }

  handlePlaceChange(value) {
    this.setState({
      place: value,
    });

    Tracker.logEvent(GA_EVENT_CATEGORY.filter, GA_FILTER_ACTION.arena, value);
  }

  handleEventChange(value) {
    this.setState({
      event: value,
    });
  }

  render() {
    const {
      filterSchedules,
      handleSportChange,
      handleDateChange,
      handlePlaceChange,
      handleEventChange,
    } = this;
    const { date } = this.props.location.query;
    const { sport } = this.props.match.params;
    const { place, event, availabilities } = this.state;
    const schedules = sport === '全部'
      ? Object.keys(this.props.schedules)
        .map(key => this.props.schedules[key])
        .reduce((accumulator, value) => [].concat(accumulator, value))
      : this.props.schedules[sport] || [];
    const sports = Object.keys(this.props.schedules);
    const dates = schedules.reduce((accumulator, value) => {
      if (!accumulator.includes(value.date)) {
        accumulator.push(value.date);
      }
      return accumulator;
    }, []).sort();
    const places = schedules.reduce((accumulator, value) => {
      if (!accumulator.includes(value.place)) {
        accumulator.push(value.place);
      }
      return accumulator;
    }, []).sort();
    return (
      <Media query={{ maxDeviceWidth: 768 }}>
        {matches => (matches
          ? (
            <MobileRoot
              sports={sports}
              sport={sport}
              dates={dates}
              date={date}
              places={places}
              place={place}
              event={event}
              schedules={filterSchedules(schedules)}
              availabilities={availabilities}
              onSportChange={handleSportChange}
              onDateChange={handleDateChange}
              onPlaceChange={handlePlaceChange}
              onEventChange={handleEventChange}
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
              schedules={filterSchedules(schedules)}
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
