import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { withStyles } from "@material-ui/core/styles";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import Hidden from '@material-ui/core/Hidden';
import ResponsiveDrawer from './responsiveDrawer';
import { connect } from 'react-redux';

import logo from '../assets/logo_icon.png';
import { Button } from '@material-ui/core';
import { logout } from '../../store/actions';


const styles = theme => ({
  root: {
    ...theme.mixins.toolbar,
    flexGrow: 1,
    backgroundColor: '#42a0ed'
  },
  appBar: {
    background: 'transparent',
    boxShadow: 'none'
  },
  toolbar: {
    minHeight: 60,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing(1),
    backgroundColor: '#42a0ed'
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row'
  },
  tabs: {
    minHeight: 0,
    backgroundColor: '#42a0ed'
  },
  tab: {
    minWidth: 100,
    fontSize: 10
  },
  indicator: {
    backgroundColor: '#5e1dad',
  },
});

class NavigationMenu extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value: 0
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeDrawer = (value) => {
    this.setState({ value });
  };

  render() {
    const { classes, theme, isAuthenticated, logout } = this.props

    if (isAuthenticated) {
      return (
        <div className={classes.root}>
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
              <Box className={classes.title}>
                <Hidden mdUp implementation="css">

                  <ResponsiveDrawer changeIndicator={this.handleChangeDrawer}
                  />
                </Hidden>

                <Button component={Link} to="/home">
                  <img alt="logo" id="logo" src={logo} style={{ width: '30px', height: '30px' }} />
                  <Typography style={{ marginLeft: '10px' }} variant="h6" id="titlePart1">Monitoria</Typography>
                  <Typography variant="h6" id="titlePart2">FGA</Typography>
                </Button>
              </Box>
              <Hidden smDown implementation="css">

                <Tabs aria-label="simple tabs example"
                  centered
                  classes={{
                    indicator: classes.indicator
                  }}
                  className={classes.tabs}
                  value={this.state.value}
                  onChange={this.handleChange}>
                  <Tab className={classes.tab} label="Página Inicial" component={Link} to="/entrar" />
                  <Tab className={classes.tab} label="Informações Pessoais" component={Link} to="/personal-infos" />
                  <Tab className={classes.tab} label="Procurar Monitoria" component={Link} to="/search-disciplines" />
                  <Tab className={classes.tab} label="Acompanhar Resultados" component={Link} to="/results" />
                </Tabs>
              </Hidden>
              <Button style={{ color: "white" }} onClick={logout}>
                Sair
              </Button>
            </Toolbar>
          </AppBar>
        </div>
      );
    }
    else {
      return (
        <div></div>
      );
    }
  }
}

NavigationMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.authentication.isAuthenticated
});

export const navigationMenuContainer = connect(
  mapStateToProps,
  { logout }
)(withStyles(styles, { withTheme: true })(NavigationMenu));

export default withStyles(styles, { withTheme: true })(navigationMenuContainer);