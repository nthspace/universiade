import PropTypes from 'prop-types';
import React from 'react';

import {
  DropDownMenu,
  MenuItem,
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
};
const defaultProps = {
  schedules: {},
  sport: null,
};

class ScheduleList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      sport: props.sport,
    };
    this.handleSportChange = this.handleSportChange.bind(this);
  }

  handleSportChange(event, key, value) {
    this.setState({
      sport: value,
    });
  }

  render() {
    const { handleSportChange } = this;
    const { schedules } = this.props;
    const { sport } = this.state;
    return (
      <div>
        <DropDownMenu value={sport} onChange={handleSportChange}>
          {Object.keys(schedules).map(element => (
            <MenuItem key={element} value={element} primaryText={element} />
          ))}
        </DropDownMenu>
        <Table>
          <TableHeader displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn>日期</TableHeaderColumn>
              <TableHeaderColumn>時間</TableHeaderColumn>
              <TableHeaderColumn>內容</TableHeaderColumn>
              <TableHeaderColumn>地點</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {sport && Object.keys(schedules[sport]).map(element => (
              <TableRow>
                <TableRowColumn>{schedules[sport][element].date}</TableRowColumn>
                <TableRowColumn>{schedules[sport][element].time}</TableRowColumn>
                <TableRowColumn>{schedules[sport][element].name}</TableRowColumn>
                <TableRowColumn>{schedules[sport][element].gym}</TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
};

ScheduleList.propTypes = propTypes;
ScheduleList.defaultProps = defaultProps;

export default ScheduleList;
