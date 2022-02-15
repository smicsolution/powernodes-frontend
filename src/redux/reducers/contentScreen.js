import { SET_CONTENT_WIDTH } from '../actions/types'

const initialState = {
  width: 0
};

function contentScreenReducer (state = initialState, action) {
  switch (action.type) {
    case SET_CONTENT_WIDTH:
      return {
        ...state,
        width: action.payload
      };
    default:
      return state;
  }
}

export default contentScreenReducer;