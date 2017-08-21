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

import * as ApiUtil from '../../ApiUtil';

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

const getFetchLinkList = (newLinkList, soldOutDict) => {
  const previousLinkList = Object.keys(soldOutDict);
  const linkList = newLinkList.filter(
    link => !previousLinkList.includes(link),
  );

  const set = new Set(linkList);
  return Array.from(set);
};

const isExpired = (ele) => {
  const { date } = ele;

  const now = new Date();
  const deadline = new Date();

  if (now.getHours() > 11) {
    deadline.setHours(12, 0, 0, 0);
  } else {
    deadline.setHours(0, 0, 0, 0);
    deadline.setHours(-12);
  }

  const gameDate = new Date(date);

  const diffHours = (gameDate - deadline) / 36e5;

  return diffHours < 36;
};

class ScheduleList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      date: props.date,
      event: props.event,
      place: props.place,
      soldOutDict: {},
    };

    this.singleLinkPromise = this.singleLinkPromise.bind(this);
    this.handleSportChange = this.handleSportChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleEventChange = this.handleEventChange.bind(this);
    this.handlePlaceChange = this.handlePlaceChange.bind(this);
  }

  componentDidMount() {
    const { schedules } = this.props;
    const { sport } = this.props.match.params;

    if (!schedules[sport]) return;

    const { soldOutDict } = this.state;

    const linkList = schedules[sport]
      .filter(isExpired)
      .map(ele => ele.link);
    const fetchLinkList = getFetchLinkList(linkList, soldOutDict);

    const fetchPromises = fetchLinkList.map(link => this.singleLinkPromise(link));

    Promise.all(fetchPromises);
  }

  componentWillReceiveProps(nextProps) {
    const { sport } = this.props.match.params;
    const { schedules } = this.props;
    const { schedules: nextSchedules } = nextProps;

    const { sport: nextSport } = nextProps.match.params;

    if (sport !== nextSport) {
      this.setState({
        date: null,
        event: '',
        place: null,
      });
    }

    if ((Object.keys(schedules).length === 0 && Object.keys(nextSchedules).length !== 0)
      || sport !== nextSport
    ) {
      const { soldOutDict } = this.state;
      const linkList = nextSchedules[nextSport].filter(isExpired).map(ele => ele.link);
      const fetchLinkList = getFetchLinkList(linkList, soldOutDict);

      const fetchPromises = fetchLinkList.map(link => this.singleLinkPromise(link));

      Promise.all(fetchPromises);
    }
  }

  singleLinkPromise(link) {
    return ApiUtil.get(link)
      .then(response => response.text())
      .then((text) => {
        this.setState(state => (
          Object.assign(
            {},
            state,
            {
              soldOutDict: Object.assign(
                {},
                state.soldOutDict,
                {
                  [link]: text.startsWith('<script'),
                },
              ),
            },
          )),
        );
      });
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
    const { date, event, place, soldOutDict } = this.state;
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
                    <TicketLink
                      soldOut={
                        soldOutDict[schedules[sport][element].link] === undefined
                          ? false : soldOutDict[schedules[sport][element].link]
                      }
                      link={
                        isExpired(schedules[sport][element]) ?
                          null :
                        schedules[sport][element].link
                      }
                    />
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
