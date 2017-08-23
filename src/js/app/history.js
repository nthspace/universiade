import { createHashHistory as createHistory } from 'history';
import qhistory from 'qhistory';
import { parse, stringify } from 'qs';

export default qhistory(
  createHistory(),
  stringify,
  parse,
);
