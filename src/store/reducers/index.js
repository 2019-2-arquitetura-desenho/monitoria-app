import { combineReducers } from 'redux';

import Authentication from './authentication';
import PersonalInfos from './personalInfos';


const reducers = combineReducers({
    authentication: Authentication,
    personalInfos: PersonalInfos
});

export default reducers;
