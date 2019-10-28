import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import reducers from './store/reducers';
import Root from './skins/root';

import './index.css';


// require('dotenv').config();

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(
    reducers,
    windown.__REDUX_DECTOOLS_EXTENSION__ && window.__REDUX_DECTOOLS_EXTENSION__()
)

ReactDOM.render(<Root store={store}/>, document.getElementById('root'));
