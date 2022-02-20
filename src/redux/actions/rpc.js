import { GET_RPC } from './types'
import axios from 'axios'

export const getRPC = (account) => dispatch => {
  axios.post("https://api.powernode.io/create_rpc/", { address: account })
    .then(res => {
      dispatch({
        type: GET_RPC,
        payload: res.data
      })
    })
    .catch(err => console.log(err));
}