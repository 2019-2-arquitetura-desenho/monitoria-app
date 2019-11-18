import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Menu from '../containers/NavigationMenu/navigationMenu';
import PublicRoute from './especials/publicRoute';
import PrivateRoute from './especials/privateRoute';
import PageShell from '../containers/components/PageShell/pageShell';
import Register from '../containers/register';
import Login from '../containers/Login/login';
import RecoveryPassword from '../containers/recoveryPassword';
import Home from '../containers/Home/home';
import PersonalInfos from '../containers/PersonalInfos/personalInfos';
import SearchDisciplines from '../containers/SearchDisciplines/searchDisciplines';
import Results from '../containers/results';


export default class App extends React.Component {

  render() {
    return (
      <Router>
        <Menu />
        <PublicRoute
          exact path="/cadastro"
          component={PageShell(Register)}
        />
        <PublicRoute
          exact path="/entrar"
          component={PageShell(Login)}
        />
        <PublicRoute
          exact path="/recuperar-senha"
          component={PageShell(RecoveryPassword)}
        />
        <Route
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
