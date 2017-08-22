import PropTypes from 'prop-types';
import React from 'react';

import { AppBar, Drawer, MenuItem, SelectField } from 'material-ui';

import ScheduleCard from './ScheduleCard';
import {
  withDay,
  scrollNodeIntoView,
  todayInitDate,
  sortSchedules,
} from '../utils';

const propTypes = {
  sports: PropTypes.array,
  sport: PropTypes.string,
  dates: PropTypes.array,
  date: PropTypes.string,
  places: PropTypes.array,
  place: PropTypes.string,
  schedules: PropTypes.array,
  availabilities: PropTypes.object,
  onSportChange: PropTypes.func,
  onDateChange: PropTypes.func,
  onPlaceChange: PropTypes.func,
};
const defaultProps = {
  sports: [],
  sport: null,
  dates: [],
  date: null,
  places: [],
  place: null,
  schedules: [],
  availabilities: {},
  onSportChange: () => {},
  onDateChange: () => {},
  onPlaceChange: () => {},
};

const styles = {
  drawerContainer: {
    padding: '8px 16px',
  },
  drawerChildren: {
    width: '100%',
  },
};

class MobileRoot extends React.PureComponent {
  constructor(props) {
    super(props);

    this.sortSchedules = sortSchedules(todayInitDate());

    this.state = {
      drawerOpen: false,
    };
    this.handleDrawerIconButtonTouchTap = this.handleDrawerIconButtonTouchTap.bind(this);
    this.handleDrawerChange = this.handleDrawerChange.bind(this);
    this.handleSportChange = this.handleSportChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handlePlaceChange = this.handlePlaceChange.bind(this);
  }

  handleDrawerIconButtonTouchTap() {
    this.setState({
      drawerOpen: true,
    });
  }

  handleDrawerChange(open) {
    this.setState({
      drawerOpen: open,
    });
  }

  handleSportChange(event, key, value) {
    this.props.onSportChange(value);
    scrollNodeIntoView(this.scrollAnchor);
  }

  handleDateChange(event, key, value) {
    this.props.onDateChange(value);
    scrollNodeIntoView(this.scrollAnchor);
  }

  handlePlaceChange(event, key, value) {
    this.props.onPlaceChange(value);
    scrollNodeIntoView(this.scrollAnchor);
  }

  render() {
    const {
      handleDrawerIconButtonTouchTap,
      handleDrawerChange,
      handleSportChange,
      handleDateChange,
      handlePlaceChange,
    } = this;
    const { sports, sport, dates, date, places, place, schedules, availabilities } = this.props;
    const { drawerOpen } = this.state;

    const sortedSchedules = this.sortSchedules(schedules);

    return (
      <div>
        <AppBar
          onLeftIconButtonTouchTap={handleDrawerIconButtonTouchTap}
          style={{
            position: 'fixed',
            top: '0',
          }}
        />
        <div
          style={{
            marginTop: '70px',
          }}
        >
          <Drawer
            containerStyle={styles.drawerContainer}
            docked={false}
            open={drawerOpen}
            onRequestChange={handleDrawerChange}
          >
            <SelectField style={styles.drawerChildren} value={sport} onChange={handleSportChange}>
              {sports.map(element => (
                <MenuItem key={element} value={element} primaryText={element} />
              ))}
            </SelectField>
            {sport
              ? (
                <SelectField style={styles.drawerChildren} value={date} onChange={handleDateChange}>
                  <MenuItem />
                  {dates.map(element => (
                    <MenuItem key={element} value={element} primaryText={withDay(element)} />
                  ))}
                </SelectField>
              )
              : null
            }
            {sport
              ? (
                <SelectField
                  style={styles.drawerChildren}
                  value={place}
                  onChange={handlePlaceChange}
                >
                  <MenuItem />
                  {places.map(element => (
                    <MenuItem key={element} value={element} primaryText={element} />
                  ))}
                </SelectField>
              )
              : null
            }
          </Drawer>
          <div
            ref={(node) => {
              this.scrollAnchor = node;
            }}
          />
          {sortedSchedules.map(element => (
            <ScheduleCard
              key={`${element.date}|${element.time}|${element.place}`}
              schedule={element}
              available={!(element.link in availabilities) || availabilities[element.link]}
            />
          ))}
        </div>
      </div>
    );
  }
}

MobileRoot.propTypes = propTypes;
MobileRoot.defaultProps = defaultProps;

export default MobileRoot;
