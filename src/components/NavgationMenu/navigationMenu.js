import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box'
import { useHistory } from "react-router-dom";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import logo from '../../assets/logo_icon.png';
import { Button } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  root: {
    ...theme.mixins.toolbar,
    flexGrow: 1,
    backgroundColor: '#42a0ed'
  },
  menuButton: {
    marginRight: theme.spacing(2),
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
  }
}));

const NavigationMenu = () => {
  const classes = useStyles();
  let history = useHistory();
  const [value, setValue] = React.useState(0);

  function handleHome() {
    history.push('/home');
  }
  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          <Box className={classes.title}>
            <Button onClick={handleHome}>
              <img alt="logo" id="logo" src={logo} style={{ width: '30px', height: '30px' }} />
              <Typography style={{ marginLeft: '10px' }} variant="h6" id="titlePart1">Monitoria</Typography>
              <Typography variant="h6" id="titlePart2">FGA</Typography>
            </Button>
          </Box>
          <Tabs aria-label="simple tabs example"
            centered
            indicatorColor="primary"
            className={classes.tabs}
            value={value}>
            <Tab value={0} label="Página Inicial" />
            <Tab value={1} label="Informações Pessoais" />
            <Tab value={2} label="Procurar Monitoria" />
            <Tab value={3} label="Acompanhar Resultados" />
          </Tabs>
          <Button style={{ color: "white" }}>
            Sair
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavigationMenu;