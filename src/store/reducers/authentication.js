
const Authentication = (state = {}, action) => {
    switch(action.type){
        case 'RESTART_REGISTER':
            return { ...state, requisitionError: undefined }
        case 'REGISTER_SUCCESS':
            return { ...state, isAuthenticated: true, userData: action.payload }
        case 'REGISTER_ERROR':
            return { ...state, isAuthenticated: false, requisitionError: action.payload }
        default:
            return state;
    }
}

export default Authentication;