import { combineReducers } from 'redux';

import modal from './modal'
import sidemenu from './sidemenu'
import header from './headerHeight'

export default combineReducers({
  modal,
  sidemenu,
  header
});
