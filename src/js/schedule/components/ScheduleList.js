import PropTypes from 'prop-types';
import React from 'react';

import { DropDownMenu, MenuItem } from 'material-ui';

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
      </div>
    );
  }
};

ScheduleList.propTypes = propTypes;
ScheduleList.defaultProps = defaultProps;

export default ScheduleList;
