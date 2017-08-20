import PropTypes from 'prop-types';
import React from 'react';
import { createHashHistory as createHistory } from 'history';

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

const propTypes = {
  schedules: PropTypes.object,
  date: PropTypes.string,
  event: PropTypes.string,
  place: PropTypes.string,
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
    params: PropTypes.shape({
      sport: PropTypes.string,
    }),
  }),
};
const defaultProps = {
  schedules: {},
  date: null,
  event: '',
  place: null,
  match: {
    params: {
      sport: '',
    },
  },
};

const toolbarBackgroundColor = 'rgb(0, 188, 212)';
const selectFieldLabelColor = 'rgba(255, 255, 255, 0.9)';
const textFieldInputColor = 'rgba(255, 255, 255, 0.9)';

const history = createHistory();

const generateId = ele =>
  `${ele.date}-${ele.event}-${ele.place}-${ele.time}`;

class ScheduleList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      date: props.date,
      event: props.event,
      place: props.place,
    };
    this.handleSportChange = this.handleSportChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleEventChange = this.handleEventChange.bind(this);
    this.handlePlaceChange = this.handlePlaceChange.bind(this);
  }

  handleSportChange(event, key, value) {
    const { path } = this.props.match;

    const pushLocation = path.replace(':sport', value);
    history.push(pushLocation);
  }

  handleDateChange(event, key, value) {
    this.setState({
      date: value,
    });
  }

  handleEventChange(event, value) {
    this.setState({
      event: value,
    });
  }

  handlePlaceChange(event, key, value) {
    this.setState({
      place: value,
    });
  }

  render() {
    const { handleSportChange, handleDateChange, handleEventChange, handlePlaceChange } = this;
    const { schedules } = this.props;
    const { sport } = this.props.match.params;
    const { date, event, place } = this.state;
    return (
      <div>
        <Toolbar
          style={{
            backgroundColor: toolbarBackgroundColor,
            marginBottom: '30px',
          }}
        >
          <ToolbarGroup>
            <SelectField
              labelStyle={{ color: selectFieldLabelColor }}
              hintText="運動類型"
              value={sport}
              onChange={handleSportChange}
            >
              {Object.keys(schedules).map(element => (
                <MenuItem key={element} value={element} primaryText={element} />
              ))}
            </SelectField>
          </ToolbarGroup>
          {sport && schedules[sport]
            ? (
              <ToolbarGroup>
                <SelectField
                  labelStyle={{ color: selectFieldLabelColor }}
                  hintText="日期"
                  value={date}
                  onChange={handleDateChange}
                >
                  <MenuItem value={null} />
                  {schedules[sport].reduce((accumulator, value) => {
                    if (!accumulator.includes(value.date)) {
                      accumulator.push(value.date);
                    }
                    return accumulator;
                  }, []).map(element => (
                    <MenuItem key={element} value={element} primaryText={element} />
                  ))}
                </SelectField>
              </ToolbarGroup>
            )
            : null
          }
          {sport && schedules[sport]
            ? (
              <ToolbarGroup>
                <SelectField
                  labelStyle={{ color: selectFieldLabelColor }}
                  hintText="地點"
                  value={place}
                  onChange={handlePlaceChange}
                >
                  <MenuItem value={null} />
                  {schedules[sport].reduce((accumulator, value) => {
                    if (!accumulator.includes(value.place)) {
                      accumulator.push(value.place);
                    }
                    return accumulator;
                  }, []).map(element => (
                    <MenuItem key={element} value={element} primaryText={element} />
                  ))}
                </SelectField>
              </ToolbarGroup>
            )
            : null
          }
          {sport && schedules[sport]
            ? (
              <ToolbarGroup>
                <TextField
                  inputStyle={{ color: textFieldInputColor }}
                  hintText="搜尋活動內容"
                  value={event}
                  onChange={handleEventChange}
                />
              </ToolbarGroup>
            )
            : null
          }
        </Toolbar>
        <Table height="500px">
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>日期</TableHeaderColumn>
              <TableHeaderColumn>時間</TableHeaderColumn>
              <TableHeaderColumn>活動</TableHeaderColumn>
              <TableHeaderColumn>性別</TableHeaderColumn>
              <TableHeaderColumn>地點</TableHeaderColumn>
              <TableHeaderColumn>連結</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
            showRowHover
          >
            {sport && schedules[sport] && Object.keys(schedules[sport])
              .filter(element => !date || schedules[sport][element].date === date)
              .filter(element => !event || schedules[sport][element].event.includes(event))
              .filter(element => !place || schedules[sport][element].place === place)
              .map(element => (
                <TableRow key={generateId(schedules[sport][element])}>
                  <TableRowColumn>{schedules[sport][element].date}</TableRowColumn>
                  <TableRowColumn>{schedules[sport][element].time}</TableRowColumn>
                  <TableRowColumn>{schedules[sport][element].event}</TableRowColumn>
                  <TableRowColumn>{schedules[sport][element].gender}</TableRowColumn>
                  <TableRowColumn>{schedules[sport][element].place}</TableRowColumn>
                  <TableRowColumn>
                    <TicketLink link={schedules[sport][element].link} />
                  </TableRowColumn>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

ScheduleList.propTypes = propTypes;
ScheduleList.defaultProps = defaultProps;

export default ScheduleList;
