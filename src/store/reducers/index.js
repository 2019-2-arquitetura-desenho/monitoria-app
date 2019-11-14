import { combineReducers } from 'redux';

import Authentication from './authentication';
import UserProfile from './userProfile';
import Disciplines from './disiplines';


const reducers = combineReducers({
    authentication: Authentication,
    userProfile: UserProfile,
    disciplines: Disciplines
});

const rootReducer = (state, action) => {
    if (action.type === 'LOGOUT') {
        state = undefined
    }

    return reducers(state, action)
}

export default rootReducer;
