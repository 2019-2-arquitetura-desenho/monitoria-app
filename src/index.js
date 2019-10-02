import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { Route, BrowserRouter as Router } from 'react-router-dom'
import App from './pages/app';
import Login from './pages/Login/login';
import Register from './pages/Register/register';

import * as serviceWorker from './serviceWorker';


const route_component = (
    <Router>
        <div>
            <Route path="/" component={ App } />
            <Route path="/login" component={ Login } />
            <Route path="/register" component= { Register }/>
        </div>
    </Router>
)

ReactDOM.render(route_component, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
