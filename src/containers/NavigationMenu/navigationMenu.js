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
import { withRouter } from 'react-router-dom';


const styles = theme => ({
  root: {
    ...theme.mixins.toolbar,
    flexGrow: 1,
    backgroundColor: '#267cc1'
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
    backgroundColor: '#267cc1'
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row'
  },
  tabs: {
    minHeight: 0,
    backgroundColor: '#267cc1'
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
    this.state = {
      indicatorValue: 0,
      pathsMenuList: undefined
    };
    this.handleChange = this.handleChange.bind(this);
    this.menuList = this.menuList.bind(this);
    this.handleIndicator = this.handleIndicator.bind(this);
    this.renderTab = this.renderTab.bind(this);
    this.renderButton = this.renderButton.bind(this);
  }

  handleChange(event, indicatorValue) {
    this.setState({ indicatorValue });
  };

  handleChangeDrawer(indicatorValue) {
    this.setState({ indicatorValue });
  };

  componentDidMount() {
    this.rebuildMenu()
  }

  getSnapshotBeforeUpdate() {
    this.rebuildMenu();
    return null;
  }

  rebuildMenu() {
    let menuList = this.menuList();
    let indicatorValue = this.handleIndicator(menuList);
    if (indicatorValue !== this.state.indicatorValue)
      this.setState({
        indicatorValue: indicatorValue
      })
  }

  menuList() {
    const {
      profileData
    } = this.props;

    let is_professor = profileData ? profileData.is_professor : false;

    let list = [
      { label: 'Página Inicial', path: '/home', value: 0 },
      { label: 'Informações Pessoais', path: '/personal-infos', value: 1 },
      { label: is_professor ? 'Disciplinas' : 'Procurar Monitoria', path: '/search-disciplines', value: 2 },
      { label: 'Acompanhar Resultados', path: '/results', value: 3 },
    ]
    if (!this.state.pathsMenuList)
      this.setState({
        pathsMenuList: list
      });
    return list;
  }

  handleIndicator(menuList = []) {
    const {
      location
    } = this.props;
    let indicatorValue = null;
    if (location.pathname === '/' || menuList.length === 0)
      indicatorValue = 0;
    else
      indicatorValue = menuList.map(pathMenu =>
        (pathMenu.path)
      ).indexOf(location.pathname);
    if (indicatorValue === -1) indicatorValue = 0;
    return indicatorValue;
  }

  renderTab() {
    const {
      isAuthenticated, classes
    } = this.props;
    if (isAuthenticated) {
      return (
        <Tabs aria-label="simple tabs example"
          centered
          classes={{
            indicator: classes.indicator
          }}
          className={classes.tabs}
          value={this.state.indicatorValue}
          onChange={this.handleChange}>
          {this.state.pathsMenuList && this.state.pathsMenuList.map(pathMenu => (
            <Tab key={pathMenu.value} className={classes.tab} label={pathMenu.label} component={Link} to={pathMenu.path}
            />
          ))}
        </Tabs>
      );
    }
  }

  renderButton() {
    const {
      isAuthenticated, logout
    } = this.props;
    if (isAuthenticated) {
      return (
        <Button style={{ color: "white" }} onClick={logout}>
          Sair
        </Button>
      );
    } else {
      return (
        <Button style={{ color: "white" }} component={Link} to={'/entrar'}>
          Entrar
        </Button>
      );
    }
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <Box className={classes.title}>
              <Hidden mdUp implementation="css">
                <ResponsiveDrawer
                  changeIndicator={this.handleChangeDrawer}
                />
              </Hidden>
              <Button component={Link} to="/">
                <img alt="logo" id="logo" src={logo} style={{ width: '30px', height: '30px' }} />
                <Typography style={{ marginLeft: '10px' }} variant="h6" id="titlePart1">Monitoria</Typography>
                <Typography variant="h6" id="titlePart2">FGA</Typography>
              </Button>
            </Box>
            <Hidden smDown implementation="css">
              {this.renderTab()}
            </Hidden>
            {this.renderButton()}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

NavigationMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.authentication.isAuthenticated,
  profileData: state.userProfile.profileData,
});

export const navigationMenuContainer = connect(
  mapStateToProps,
  { logout }
)(withStyles(styles, { withTheme: true })(NavigationMenu));

export default withRouter(navigationMenuContainer);