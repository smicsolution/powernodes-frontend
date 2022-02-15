import { SET_WIDTH } from '../actions/types'

const initialState = {
  width: 0
};

function screenReducer (state = initialState, action) {
  switch (action.type) {
    case SET_WIDTH:
      return {
        ...state,
        width: action.payload
      };
    default:
      return state;
  }
}

export default screenReducer;