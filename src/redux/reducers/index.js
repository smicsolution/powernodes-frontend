import { combineReducers } from 'redux';

import modal from './modal'
import sidemenu from './sidemenu'
import header from './headerHeight'
import account from './account'
import sidebar from './sidebarHeight'
import screen from './screen'
import contentScreen from './contentScreen'
import generatorScreen from './generatorScreen'

export default combineReducers({
  modal,
  sidemenu,
  header,
  account,
  sidebar,
  screen,
  contentScreen,
  generatorScreen
});
