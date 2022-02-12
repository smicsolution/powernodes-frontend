import { SET_ACCOUNT } from '../actions/types'

const initialState = {
  myAccount: null
};

function accountReducer (state = initialState, action) {
  switch (action.type) {
    case SET_ACCOUNT:
      return {
        ...state,
        myAccount: action.payload
      };
    default:
      return state;
  }
}

export default accountReducer;