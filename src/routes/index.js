import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import PrivateRoute from './especials/privateRoute';
import Register from '../containers/register';
import Login from '../containers/login';
import Home from '../containers/home';


const App = () => (
    <Router>
        <Route exact path="/cadastro" component={ Register } />
        <Route exact path="/entrar" component={ Login } />
        <PrivateRoute exact path="/" component={ Home } />
    </Router>
);

export default App;
