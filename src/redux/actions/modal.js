import { SHOW_WALLET_MODAL, HIDE_WALLET_MODAL, SHOW_RPC_MODAL, HIDE_RPC_MODAL } from './types'

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

export const showRPCModal = (tier, checksum) => dispatch => {
  dispatch({
    type: SHOW_RPC_MODAL,
    payload: {
      tier: tier,
      checksum: checksum
    }
  })
}

export const hideRPCModal = () => dispatch => {
  dispatch({
    type: HIDE_RPC_MODAL
  })
}