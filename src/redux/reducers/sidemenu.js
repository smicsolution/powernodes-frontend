import { SHOW_SIDEMENU, HIDE_SIDEMENU } from '../actions/types';

const initialState = {
  isVisibleSidemenu: false
};

function sidemenuReducer (state = initialState, action) {
  switch (action.type) {
    case SHOW_SIDEMENU:
      return {
        ...state,
        isVisibleSidemenu: false
      };
    case HIDE_SIDEMENU:
      return {
        ...state,
        isVisibleSidemenu: true
      };
    default:
      return state;
  }
}

export default sidemenuReducer;
