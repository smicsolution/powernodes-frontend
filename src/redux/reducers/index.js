import { combineReducers } from 'redux';

import modal from './modal'
import sidemenu from './sidemenu'
import header from './headerHeight'
import account from './account'
import sidebar from './sidebarHeight'

export default combineReducers({
  modal,
  sidemenu,
  header,
  account,
  sidebar
});
