import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';

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
  appBar: {
    position: 'fixed',
    top: '0',
  },
  cards: {
    marginTop: '70px',
  },
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
    scrollNodeIntoView(ReactDOM.findDOMNode(this.scrollAnchor));
  }

  handleDateChange(event, key, value) {
    this.props.onDateChange(value);
    scrollNodeIntoView(ReactDOM.findDOMNode(this.scrollAnchor));
  }

  handlePlaceChange(event, key, value) {
    this.props.onPlaceChange(value);
    scrollNodeIntoView(ReactDOM.findDOMNode(this.scrollAnchor));
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
          style={styles.appBar}
          title={sport}
          onLeftIconButtonTouchTap={handleDrawerIconButtonTouchTap}
        />
        <div style={styles.cards}>
          <Drawer
            containerStyle={styles.drawerContainer}
            docked={false}
            open={drawerOpen}
            onRequestChange={handleDrawerChange}
          >
            <SelectField
              style={styles.drawerChildren}
              hintText="運動類型"
              value={sport}
              onChange={handleSportChange}
            >
              {sports.map(element => (
                <MenuItem key={element} value={element} primaryText={element} />
              ))}
            </SelectField>
            {sport
              ? (
                <SelectField
                  style={styles.drawerChildren}
                  hintText="日期"
                  value={date}
                  onChange={handleDateChange}
                >
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
                  hintText="地點"
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
          {sortedSchedules.map((element, index) => (
            <ScheduleCard
              key={`${element.date}|${element.time}|${element.place}`}
              schedule={element}
              available={!(element.link in availabilities) || availabilities[element.link]}
              ref={(node) => {
                if (index === 0) {
                  this.scrollAnchor = node;
                }
              }}
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
