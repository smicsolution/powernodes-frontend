import { SHOW_WALLET_MODAL, HIDE_WALLET_MODAL } from './types'

export const showWalletModal = () => dispatch => {
  dispatch({
    type: SHOW_WALLET_MODAL
  })
}

export const hideWalletModal = () => dispatch => {
  dispatch({
    type: HIDE_WALLET_MODAL
  })
}