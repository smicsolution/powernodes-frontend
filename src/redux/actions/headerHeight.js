import { SET_HEADER_HEIGHT } from './types'

export const setHeaderHeight = height => dispatch => {
  localStorage.setItem("headerHeight", height);

  dispatch({
    type: SET_HEADER_HEIGHT,
    payload: height
  })
}