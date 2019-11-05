import { combineReducers } from 'redux';
import Authentication from "./authentication"

const reducers = combineReducers({
    authentication: Authentication
})

export default reducers;
