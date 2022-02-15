import { SET_GENERATOR_WIDTH } from './types'

export const setGeneratorWidth = width => dispatch => {
  dispatch({
    type: SET_GENERATOR_WIDTH,
    payload: width
  })
}