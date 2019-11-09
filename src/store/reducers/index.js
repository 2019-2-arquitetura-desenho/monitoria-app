import { combineReducers } from 'redux';

import Authentication from './authentication';
import UserProfile from './userProfile';


const reducers = combineReducers({
    authentication: Authentication,
    userProfile: UserProfile
});

export default reducers;
