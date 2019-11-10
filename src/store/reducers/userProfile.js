const UserProfile = (state = {}, action) => {
  switch (action.type) {
    case 'GET_PROFILE_SUCCESS':
      return {
        ...state,
        profileData: action.payload
      }
    case 'UPDATE_PROFILE_REQUEST':
      return {
        ...state,
        isFetching: action.isFetching
      };
    case 'UPDATE_PROFILE_SUCCESS':
      return {
        ...state,
        profileData: action.payload,
        isFetching: action.isFetching
      };
    case 'UPDATE_PROFILE_ERROR':
      return {
        ...state,
        requisitionError: action.payload,
        isFetching: action.isFetching
      };
    case 'RESTART_UPDATE_PROFILE':
      return {
        ...state,
        requisitionError: undefined
      };
    case 'GET_PROFILE_ERROR':
      return {
        ...state,
        requisitionError: action.payload
      };
    default:
      return state;
  }
}

export default UserProfile;