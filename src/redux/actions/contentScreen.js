import { SET_CONTENT_WIDTH } from './types'

export const setContentWidth = width => dispatch => {
  dispatch({
    type: SET_CONTENT_WIDTH,
    payload: width
  })
}