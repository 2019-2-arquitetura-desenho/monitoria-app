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
        updatingProfile: action.updatingProfile
      };
    case 'UPDATE_PROFILE_SUCCESS':
      return {
        ...state,
        profileData: action.payload,
        updatingProfile: action.updatingProfile
      };
    case 'UPDATE_PROFILE_ERROR':
      return {
        ...state,
        requisitionError: action.payload,
        updatingProfile: action.updatingProfile
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
    case 'GET_STUDENT_REQUEST':
      return {
        ...state,
        profileData: {
          ...state.profileData, student: {
            ...state.profileData.student, fetchingStudent: action.fetchingStudent
          }
        },
      }
    case 'GET_STUDENT_SUCCESS':
      return {
        ...state,
        profileData: {
          ...state.profileData, student: {
            ...action.payload, fetchingStudent: action.fetchingStudent
          }
        },
      }
    case 'GET_STUDENT_ERROR':
      return {
        ...state,
        requisitionError: action.requestError,
        profileData: {
          ...state.profileData, student: {
            ...state.profileData.student, fetchingStudent: action.fetchingStudent
          }
        }
      };
    default:
      return state;
  }
}

export default UserProfile;