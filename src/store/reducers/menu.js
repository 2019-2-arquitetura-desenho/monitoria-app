const Menu = (state = {}, action) => {
  switch (action.type) {
    case 'REFRESH_MENU':
      return {
        ...state,
        menuStateValue: action.payload,
      };
    default:
      return state
  }
}

export default Menu;