import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';


import {
  MenuItem,
  SelectField,
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  TextField,
  Toolbar,
  ToolbarGroup,
} from 'material-ui';

import TicketLink from './TicketLink';
import {
  isScheduleActive,
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
  toolbar: {
    marginBottom: '30px',
    backgroundColor: 'rgb(0, 188, 212)',
  },
  selectFieldLabel: {
    color: 'rgba(255, 255, 255, 0.9)',
  },
  textFieldInput: {
    color: 'rgba(255, 255, 255, 0.9)',
  },
};

class DesktopRoot extends React.PureComponent {
  constructor(props) {
    super(props);

    this.sortSchedules = sortSchedules(todayInitDate());

    this.handleSportChange = this.handleSportChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handlePlaceChange = this.handlePlaceChange.bind(this);
    this.handleEventChange = this.handleEventChange.bind(this);
  }

  handleSportChange(event, key, value) {
    this.props.onSportChange(value);
    scrollNodeIntoView(this.scrollAnchor);
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
    const { handleSportChange, handleDateChange, handlePlaceChange, handleEventChange } = this;
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

    const sortedSchedules = this.sortSchedules(schedules);
    return (
      <div>
        <Toolbar style={styles.toolbar}>
          <ToolbarGroup>
            <SelectField
              labelStyle={styles.selectFieldLabel}
              hintText="運動類型"
              value={sport}
              onChange={handleSportChange}
            >
              <MenuItem value="全部" primaryText="全部" />
              {sports.map(element => (
                <MenuItem key={element} value={element} primaryText={element} />
              ))}
            </SelectField>
          </ToolbarGroup>
          {sport
            ? (
              <ToolbarGroup>
                <SelectField
                  labelStyle={styles.selectFieldLabel}
                  hintText="日期"
                  value={date}
                  onChange={handleDateChange}
                >
                  <MenuItem value={null} />
                  {dates.map(element => (
                    <MenuItem key={element} value={element} primaryText={withDay(element)} />
                  ))}
                </SelectField>
              </ToolbarGroup>
            )
            : null
          }
          {sport
            ? (
              <ToolbarGroup>
                <SelectField
                  labelStyle={styles.selectFieldLabel}
                  hintText="地點"
                  value={place}
                  onChange={handlePlaceChange}
                >
                  <MenuItem value={null} />
                  {places.map(element => (
                    <MenuItem key={element} value={element} primaryText={element} />
                  ))}
                </SelectField>
              </ToolbarGroup>
            )
            : null
          }
          {sport
            ? (
              <ToolbarGroup>
                <TextField
                  inputStyle={styles.textFieldInput}
                  hintText="搜尋活動內容"
                  value={event}
                  onChange={handleEventChange}
                />
              </ToolbarGroup>
            )
            : null
          }
        </Toolbar>
        <Table height="calc(100vh - 145px)">
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn>競賽</TableHeaderColumn>
              <TableHeaderColumn>日期</TableHeaderColumn>
              <TableHeaderColumn>時間</TableHeaderColumn>
              <TableHeaderColumn>活動</TableHeaderColumn>
              <TableHeaderColumn>性別</TableHeaderColumn>
              <TableHeaderColumn>地點</TableHeaderColumn>
              <TableHeaderColumn>連結</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} showRowHover>
            {sortedSchedules.map((element, index) => (
              <TableRow
                key={`${element.date}|${element.time}|${element.event}|${element.gender}`}
                ref={(node) => {
                  if (index === 0) {
                    this.scrollAnchor = node;
                  }
                }}
              >
                <TableRowColumn>{element.sport || sport}</TableRowColumn>
                <TableRowColumn>{withDay(element.date)}</TableRowColumn>
                <TableRowColumn>{element.time}</TableRowColumn>
                <TableRowColumn>{element.event}</TableRowColumn>
                <TableRowColumn>{element.gender}</TableRowColumn>
                <TableRowColumn>{element.place}</TableRowColumn>
                <TableRowColumn>
                  {element.link && isScheduleActive(element)
                    ? (
                      <TicketLink
                        link={element.link}
                        soldOut={element.link in availabilities && !availabilities[element.link]}
                      />
                    )
                    : null
                  }
                </TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

DesktopRoot.propTypes = propTypes;
DesktopRoot.defaultProps = defaultProps;

export default DesktopRoot;
