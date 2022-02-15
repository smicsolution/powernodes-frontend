import { SET_WIDTH } from './types'

export const setWidth = width => dispatch => {
  dispatch({
    type: SET_WIDTH,
    payload: width
  })
}