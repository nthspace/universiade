import { firebaseStateReducer } from 'react-redux-firebase';
import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

import features from './features';

const reducers = {};
features.forEach((feature) => {
  reducers[feature.constants.NAME] = feature.reducer;
});
reducers.firebase = firebaseStateReducer;
reducers.router = routerReducer;

export default combineReducers(reducers);
