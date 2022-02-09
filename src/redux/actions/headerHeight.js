import { SET_HEADER_HEIGHT } from './types'

export const setHeaderHeight = height => dispatch => {
  dispatch({
    type: SET_HEADER_HEIGHT,
    payload: height
  })
}