import { SET_SIDEBAR_HEIGHT } from './types'

export const setSidebarHeight = height => dispatch => {
  dispatch({
    type: SET_SIDEBAR_HEIGHT,
    payload: height
  })
}