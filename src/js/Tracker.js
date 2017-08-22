/**
 * Created by amdis on 2017/8/22.
 */
import ReactGA from 'react-ga';
import constants from './core/constants';

let instance = null;

class Tracker {
  constructor(){
    if (!instance) {
      instance = this;
    }
    if (constants.DEBUG) {
      // test account
      ReactGA.initialize('UA-105068302-2');
    } else {
      ReactGA.initialize('UA-105068302-1');
    }

    return instance;
  }

  logPageView() {
    const url = decodeURI(window.location.hash);
    ReactGA.set({ page: url });
    ReactGA.pageview(url);
  }

  logEvent(category, action, label, value) {
    const eventObj = {};
    if (category) {
      eventObj.category = category;
    }

    if (action) {
      eventObj.action = action;
    }

    if (label) {
      eventObj.label = label;
    }

    if (value) {
      eventObj.value = value;
    }
    if (Object.keys(eventObj).length > 0) {
      ReactGA.event(eventObj);
    }

  }
}

const TRACKER = new Tracker();

export default TRACKER;