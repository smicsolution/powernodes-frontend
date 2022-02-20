import { GET_RPC } from '../actions/types'

const initialState = {
  RPCs: []
};

function rpcReducer (state = initialState, action) {
  switch (action.type) {
    case GET_RPC:
      return {
        ...state,
        RPCs: action.payload
      };
    default:
      return state;
  }
}

export default rpcReducer;