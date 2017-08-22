import PropTypes from 'prop-types';
import React from 'react';

import { AppBar, Drawer, MenuItem, SelectField } from 'material-ui';

import ScheduleCard from './ScheduleCard';

const propTypes = {
  sports: PropTypes.array,
  sport: PropTypes.string,
  dates: PropTypes.array,
  date: PropTypes.string,
  places: PropTypes.array,
  place: PropTypes.string,
  schedules: PropTypes.array,
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
  }

  handleDateChange(event, key, value) {
    this.props.onDateChange(value);
  }

  handlePlaceChange(event, key, value) {
    this.props.onPlaceChange(value);
  }

  render() {
    const {
      handleDrawerIconButtonTouchTap,
      handleDrawerChange,
      handleSportChange,
      handleDateChange,
      handlePlaceChange,
    } = this;
    const { sports, sport, dates, date, places, place, schedules } = this.props;
    const { drawerOpen } = this.state;
    return (
      <div>
        <AppBar onLeftIconButtonTouchTap={handleDrawerIconButtonTouchTap} />
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
                  <MenuItem key={element} value={element} primaryText={element} />
                ))}
              </SelectField>
            )
            : null
          }
          {sport
            ? (
              <SelectField style={styles.drawerChildren} value={place} onChange={handlePlaceChange}>
                <MenuItem />
                {places.map(element => (
                  <MenuItem key={element} value={element} primaryText={element} />
                ))}
              </SelectField>
            )
            : null
          }
        </Drawer>
        {schedules.map(element => (
          <ScheduleCard
            key={`${element.date}|${element.time}|${element.place}`}
            schedule={element}
          />
        ))}
      </div>
    );
  }
}

MobileRoot.propTypes = propTypes;
MobileRoot.defaultProps = defaultProps;

export default MobileRoot;