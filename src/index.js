import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import App from './pages/app';
import Login from './pages/Login/login';
import Register from './pages/Register/register';
import Home from './pages/Home/home';
import Menu from './components/NavgationMenu/navigationMenu';

import './index.css';

require('dotenv').config();


export class Routes extends React.Component {
    render() {
        const path = window.location.pathname;
        return (
            <div>
                <BrowserRouter>
                    {path !== '/' &&
                        <div>
                            <Menu />
                        </div>
                    }
                    <Switch>
                        <Route exact path="/" component={App} />
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                        <Route path="/home" component={Home} />
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

ReactDOM.render(
    <Routes />
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
