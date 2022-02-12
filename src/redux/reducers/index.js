import { combineReducers } from 'redux';

import modal from './modal'
import sidemenu from './sidemenu'
import header from './headerHeight'
import account from './account'

export default combineReducers({
  modal,
  sidemenu,
  header,
  account
});
