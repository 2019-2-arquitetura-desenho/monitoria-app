const UserProfile = (state = {}, action) => {
    switch (action.type) {
        case 'UPDATE_PROFILE_SUCCESS':
            return {
                ...state,
                profileData: action.payload
            };
        case 'GET_PROFILE_SUCCESS':
            return {
                ...state,
                profileData: action.payload
            }
        default:
            return state;
    }
}

export default UserProfile;