import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import PublicRoute from './especials/publicRoute';
import PrivateRoute from './especials/privateRoute';
import Register from '../containers/register';
import Login from '../containers/Login/login';
import RecoveryPassword from '../containers/recoveryPassword';
import PageShell from '../containers/components/PageShell/pageShell';
import Home from '../containers/home';
import PersonalInfos from '../containers/personalInfos';
import SearchMonitoring from '../containers/searchMonitoring';
import Results from '../containers/results';


export default class App extends React.Component {    
    render() {
        return (
            <Router>
                <PublicRoute
                    exact path="/cadastro"
                    component={ Register }
                />
                <PublicRoute
                    exact path="/entrar"
                    component={ Login }
                />
                <PublicRoute
                    exact path="/recuperar-senha"
                    component={ RecoveryPassword }
                />
                <PrivateRoute
                    exact path="/"
                    component={ PageShell(Home) }
                />
                <PrivateRoute
                    exact path="/home"
                    component={ PageShell(Home) }
                />
                <PrivateRoute
                    exact path="/personal-infos"
                    component={ PageShell(PersonalInfos) }
                />
                <PrivateRoute
                    exact path="/search-monitoring"
                    component={ PageShell(SearchMonitoring) }
                />
                <PrivateRoute
                    exact path="/results"
                    component={PageShell(Results)}
                />
            </Router>
        );
    }
}
