import { SET_SIDEBAR_HEIGHT } from '../actions/types'

const initialState = {
  sidebarHeight: 0
};

function sidebarReducer (state = initialState, action) {
  switch (action.type) {
    case SET_SIDEBAR_HEIGHT:
      return {
        ...state,
        sidebarHeight: action.payload
      };
    default:
      return state;
  }
}

export default sidebarReducer;