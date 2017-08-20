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
} from 'material-ui';


const propTypes = {
  schedules: PropTypes.object,
  sport: PropTypes.string,
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
    params: PropTypes.shape({
      sport: PropTypes.string,
    }),
  }),
};
const defaultProps = {
  schedules: {},
  sport: null,
  match: {
    params: {
      sport: '',
    },
  },
};

const history = createHistory();

const generateId = ele =>
  `${ele.date}-${ele.event}-${ele.place}-${ele.time}`;

class ScheduleList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      sport: props.sport,
    };
    this.handleSportChange = this.handleSportChange.bind(this);
  }

  handleSportChange(event, key, value) {
    const { path } = this.props.match;

    const pushLocation = path.replace(':sport', value);
    history.push(pushLocation);
  }

  render() {
    const { handleSportChange } = this;
    const { schedules } = this.props;
    const { sport } = this.props.match.params;
    return (
      <div>
        <SelectField hintText="運動類型" value={sport} onChange={handleSportChange}>
          {Object.keys(schedules).map(element => (
            <MenuItem key={element} value={element} primaryText={element} />
          ))}
        </SelectField>
        <Table>
          <TableHeader displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn>日期</TableHeaderColumn>
              <TableHeaderColumn>時間</TableHeaderColumn>
              <TableHeaderColumn>活動</TableHeaderColumn>
              <TableHeaderColumn>性別</TableHeaderColumn>
              <TableHeaderColumn>地點</TableHeaderColumn>
              <TableHeaderColumn>連結</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {sport && schedules[sport] && Object.keys(schedules[sport]).map(element => (
              <TableRow
                key={generateId(schedules[sport][element])}
              >
                <TableRowColumn>{schedules[sport][element].date}</TableRowColumn>
                <TableRowColumn>{schedules[sport][element].time}</TableRowColumn>
                <TableRowColumn>{schedules[sport][element].event}</TableRowColumn>
                <TableRowColumn>{schedules[sport][element].gender}</TableRowColumn>
                <TableRowColumn>{schedules[sport][element].place}</TableRowColumn>
                <TableRowColumn>
                  {schedules[sport][element].link
                    ? (
                      <a
                        href={schedules[sport][element].link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        購票
                      </a>
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

ScheduleList.propTypes = propTypes;
ScheduleList.defaultProps = defaultProps;

export default ScheduleList;
