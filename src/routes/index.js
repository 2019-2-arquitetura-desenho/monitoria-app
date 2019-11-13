import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import PublicRoute from './especials/publicRoute';
import PrivateRoute from './especials/privateRoute';
import Register from '../containers/register';
import Login from '../containers/Login/login';
import RecoveryPassword from '../containers/recoveryPassword';
import PageShell from '../containers/components/PageShell/pageShell';
import Home from '../containers/home';
import PersonalInfos from '../containers/PersonalInfos/personalInfos';
import SearchDisciplines from '../containers/SearchDisciplines/searchDisciplines';
import Results from '../containers/results';
import Menu from '../containers/components/NavigationMenu/navigationMenu';


export default class App extends React.Component {
    render() {
        return (
            <Router>
                <Menu />
                <PublicRoute
                    exact path="/cadastro"
                    component={Register}
                />
                <PublicRoute
                    exact path="/entrar"
                    component={Login}
                />
                <PublicRoute
                    exact path="/recuperar-senha"
                    component={RecoveryPassword}
                />
                <PrivateRoute
                    exact path="/"
                    component={PageShell(Home)}
                />
                <PrivateRoute
                    exact path="/home"
                    component={PageShell(Home)}
                />
                <PrivateRoute
                    exact path="/personal-infos"
                    component={PageShell(PersonalInfos)}
                />
                <PrivateRoute
                    exact path="/search-disciplines"
                    component={PageShell(SearchDisciplines)}
                />
                <PrivateRoute
                    exact path="/results"
                    component={PageShell(Results)}
                />
            </Router>
        );
    }
}
