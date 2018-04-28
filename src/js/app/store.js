import { getFirebase, reactReduxFirebase } from 'react-redux-firebase';
import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import history from './history';
import reducer from './reducer';

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */
const enhancer = composeEnhancers(
  applyMiddleware(routerMiddleware(history)),
  applyMiddleware(thunk.withExtraArgument(getFirebase)),
  reactReduxFirebase({
    apiKey: 'AIzaSyA6SMFKYDID-oZ3qg1mKvADummNcut47CY',
    authDomain: 'universiade-96de2.firebaseapp.com',
    databaseURL: 'https://universiade-96de2.firebaseio.com',
  }),
);

export default createStore(reducer, enhancer);
