import React from 'react';

import { connect } from 'react-redux';
import { dataToJS, firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';

const mapStateToProps = ({ firebase }) => ({
  schedules: dataToJS(firebase, 'schedules'),
});

const ScheduleList = ({ schedules }) => (
  <div></div>
);

export default compose(
  firebaseConnect(['schedules']),
  connect(mapStateToProps),
)(ScheduleList);