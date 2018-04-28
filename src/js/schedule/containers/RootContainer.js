import { connect } from 'react-redux';
import { dataToJS, firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';

import Root from '../components/Root';

const mapStateToProps = ({ firebase }) => ({
  schedules: dataToJS(firebase, 'schedules'),
});

export default compose(
  firebaseConnect(['schedules']),
  connect(mapStateToProps),
)(Root);
