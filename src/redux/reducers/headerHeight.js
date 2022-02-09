import { SET_HEADER_HEIGHT } from '../actions/types'

const initialState = {
  headerHeight: 0
};

function headerReducer (state = initialState, action) {
  switch (action.type) {
    case SET_HEADER_HEIGHT:
      return {
        ...state,
        headerHeight: action.payload
      };
    default:
      return state;
  }
}

export default headerReducer;