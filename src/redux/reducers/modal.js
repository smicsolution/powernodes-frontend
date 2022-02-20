import { SHOW_WALLET_MODAL, HIDE_WALLET_MODAL, SHOW_RPC_MODAL, HIDE_RPC_MODAL } from '../actions/types';

const initialState = {
  isVisibleWallet: false,
  isVisibleRPC: false,
  tier: "",
  checksum: ""

};

function modalReducer (state = initialState, action) {
  switch (action.type) {
    case SHOW_WALLET_MODAL:
      return {
        ...state,
        isVisibleWallet: true,
        isVisibleRPC: false
      };
    case HIDE_WALLET_MODAL:
      return {
        ...state,
        isVisibleWallet: false
      };
    case SHOW_RPC_MODAL:
      return {
        ...state,
        isVisibleRPC: true,
        isVisibleWallet: false,
        tier: action.payload.tier,
        checksum: action.payload.checksum
      }
    case HIDE_RPC_MODAL:
      return {
        ...state,
        isVisibleRPC: false
      }
    default:
      return state;
  }
}

export default modalReducer;
