import { combineReducers } from 'redux';

import Authentication from './authentication';
import UserProfile from './userProfile';


const reducers = combineReducers({
    authentication: Authentication,
    userProfile: UserProfile
});

const rootReducer = (state, action) => {
    if (action.type === 'LOGOUT') {
        state = undefined
    }

    return reducers(state, action)
}

export default rootReducer;
