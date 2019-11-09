const PersonalInfos = (state = {}, action) => {
    switch (action.type) {
        case 'UPDATE_PROFILE_SUCCESS':
            return {
                ...state,
                userData: action.payload
            };
        case 'GET_PROFILE_SUCCESS':
            return {
                ...state,
                userData: action.payload
            }
        default:
            return state;
    }
}

export default PersonalInfos;