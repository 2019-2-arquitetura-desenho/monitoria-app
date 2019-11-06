import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Menu from './containers/NavgationMenu/navigationMenu';
import PageShell from './components/PageShell/pageShell';
import App from './pages/app';
import Login from './pages/Login/login';
import Register from './pages/Register/register';
import Home from './pages/Home/home';
import PersonalInfos from './pages/PersonalInfos/personalInfos';
import SearchMonitoring from './pages/SearchMonitoring/searchMonitoring';
import Results from './pages/Results/results';


import './index.css';

require('dotenv').config();

export class Routes extends React.Component {

    pathNotInBlackList() {
        const path = window.location.pathname;
        return path !== '/' && path !== '/login'
            && path !== '/register'
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    {this.pathNotInBlackList() &&
                        <div>
                            <Menu />
                        </div>
                    }
                    <Switch>
                        <Route exact path="/" component={App} />
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={PageShell(Register)} />
                        <Route path="/home" component={PageShell(Home)} />
                        <Route path="/personal-infos" component={PageShell(PersonalInfos)} />
                        <Route path="/search-monitoring" component={PageShell(SearchMonitoring)} />
                        <Route path="/results" component={PageShell(Results)} />

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
