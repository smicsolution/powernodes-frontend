import { SET_GENERATOR_WIDTH } from '../actions/types'

const initialState = {
  width: 0
};

function generatorScreenReducer (state = initialState, action) {
  switch (action.type) {
    case SET_GENERATOR_WIDTH:
      return {
        ...state,
        width: action.payload
      };
    default:
      return state;
  }
}

export default generatorScreenReducer;