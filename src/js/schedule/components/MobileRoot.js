import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';

import { AppBar, Drawer, IconButton, MenuItem, SelectField, TextField } from 'material-ui';
import SearchIcon from 'material-ui/svg-icons/action/search';

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
  event: PropTypes.string,
  schedules: PropTypes.array,
  availabilities: PropTypes.object,
  onSportChange: PropTypes.func,
  onDateChange: PropTypes.func,
  onPlaceChange: PropTypes.func,
  onEventChange: PropTypes.func,
};
const defaultProps = {
  sports: [],
  sport: null,
  dates: [],
  date: null,
  places: [],
  place: null,
  event: '',
  schedules: [],
  availabilities: {},
  onSportChange: () => {},
  onDateChange: () => {},
  onPlaceChange: () => {},
  onEventChange: () => {},
};

const styles = {
  appBar: {
    position: 'fixed',
    top: '0',
  },
  textField: {
    width: '100%',
    height: 'auto',
  },
  textFieldInput: {
    fontSize: '24px',
    color: 'rgba(255, 255, 255, 0.9)',
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
      searchOpen: false,
    };
    this.handleDrawerIconButtonTouchTap = this.handleDrawerIconButtonTouchTap.bind(this);
    this.handleSearchIconButtonTouchTap = this.handleSearchIconButtonTouchTap.bind(this);
    this.handleDrawerChange = this.handleDrawerChange.bind(this);
    this.handleSearchBlur = this.handleSearchBlur.bind(this);
    this.handleSportChange = this.handleSportChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handlePlaceChange = this.handlePlaceChange.bind(this);
    this.handleEventChange = this.handleEventChange.bind(this);
  }

  handleDrawerIconButtonTouchTap() {
    this.setState({
      drawerOpen: true,
    });
  }

  handleSearchIconButtonTouchTap() {
    this.setState({
      searchOpen: true,
    });
  }

  handleDrawerChange(open) {
    this.setState({
      drawerOpen: open,
    });
  }

  handleSearchBlur() {
    const { event } = this.props;
    if (!event) {
      this.setState({
        searchOpen: false,
      });
    }
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

  handleEventChange(event, value) {
    this.props.onEventChange(value);
    scrollNodeIntoView(ReactDOM.findDOMNode(this.scrollAnchor));
  }

  render() {
    const {
      handleDrawerIconButtonTouchTap,
      handleSearchIconButtonTouchTap,
      handleDrawerChange,
      handleSearchBlur,
      handleSportChange,
      handleDateChange,
      handlePlaceChange,
    } = this;
    const {
      sports,
      sport,
      dates,
      date,
      places,
      place,
      event,
      schedules,
      availabilities,
    } = this.props;
    const { drawerOpen, searchOpen } = this.state;

    const sortedSchedules = this.sortSchedules(schedules);

    return (
      <div>
        <AppBar
          style={styles.appBar}
          title={sport}
          iconElementRight={searchOpen
            ? null
            : <IconButton><SearchIcon /></IconButton>
          }
          onLeftIconButtonTouchTap={handleDrawerIconButtonTouchTap}
          onRightIconButtonTouchTap={handleSearchIconButtonTouchTap}
        >
          {searchOpen
            ? (
              <TextField
                style={styles.textField}
                inputStyle={styles.textFieldInput}
                value={event}
                onChange={this.handleEventChange}
                onBlur={handleSearchBlur}
              />
            )
            : null
          }
        </AppBar>
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
              <MenuItem value="全部" primaryText="全部" />
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
              schedule={
                Object.assign({}, element, { sport : this.props.sport})
              }
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
