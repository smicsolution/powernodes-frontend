import { SHOW_SIDEMENU, HIDE_SIDEMENU } from './types'

export const showSideMenu = () => dispatch => {
  dispatch({
    type: SHOW_SIDEMENU
  })
}

export const hideSideMenu = () => dispatch => {
  dispatch({
    type: HIDE_SIDEMENU
  })
}