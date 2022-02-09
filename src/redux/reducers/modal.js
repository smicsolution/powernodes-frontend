import { SHOW_WALLET_MODAL, HIDE_WALLET_MODAL } from '../actions/types';

const initialState = {
  isVisibleWallet: false
};

function modalReducer (state = initialState, action) {
  switch (action.type) {
    case SHOW_WALLET_MODAL:
      return {
        ...state,
        isVisibleWallet: true
      };
    case HIDE_WALLET_MODAL:
      return {
        ...state,
        isVisibleWallet: false
      };
    default:
      return state;
  }
}

export default modalReducer;
