import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import PrivateRoute from './privateRoute';
import Home from '../containers/home';
import Login from '../containers/login';
import Register from '../containers/register';


const Root = ({ store }) => (
    <Provider store={ store }>
        <Router>
            <Route exact path="/login" component={ Login } />
            <Route exact path="/cadastro" component={ Register } />
            <PrivateRoute exact path="/" component={ Home } />
        </Router>
    </Provider>
)

Root.propTypes = {
    store: PropTypes.object.isRequired
}

export default Root;
