const UserProfile = (state = {}, action) => {
  switch (action.type) {
    case 'GET_PROFILE_SUCCESS':
      return {
        ...state,
        profileData: action.payload
      }
    case 'UPDATE_PROFILE_SUCCESS':
      return {
        ...state,
        profileData: action.payload
      };
    case 'GET_PROFILE_ERROR':
      return {
        ...state,
        requisitionError: action.payload
      };
    case 'UPDATE_PROFILE_ERROR':
      return {
        ...state,
        requisitionError: action.payload
      };
    default:
      return state;
  }
}

export default UserProfile;