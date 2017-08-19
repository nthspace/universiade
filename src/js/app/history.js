import { createHashHistory as createHistory } from 'history';
import { syncHistoryWithStore } from 'react-router-redux';

import store from './store';

const history = createHistory();

export default syncHistoryWithStore(history, store);
