export function refreshMenu(value, pathname) {
  return function (dispatch) {
    dispatch({
      type: 'REFRESH_MENU',
      payload: value
    });
  }
}