import React from 'react';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
//import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
//import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
//import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';


const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        }
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    textList: {
        color: 'black'
    }
}));

function ResponsiveDrawer(props) {
    const { container, changeIndicator } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <List>
                <ListItem onClick={() => changeIndicator(0)}
                    className={classes.tab} component={Link}
                    to="/home">
                    <ListItemText className={classes.textList} primary={'Página Inicial'} />
                </ListItem>
                <ListItem onClick={() => changeIndicator(1)}
                    className={classes.tab} component={Link}
                    to="/personal-infos">
                    <ListItemText className={classes.textList} primary={'Informações Pessoais'} />
                </ListItem>
                <ListItem value={2} onClick={() => changeIndicator(2)}
                    className={classes.tab} component={Link}
                    to="/search-monitoring" >
                    <ListItemText className={classes.textList} primary={'Procurar Monitoria'} />
                </ListItem>
                <ListItem value={3} onClick={() => changeIndicator(3)}
                    className={classes.tab} component={Link}
                    to="/results" >
                    <ListItemText className={classes.textList} primary={'Acompanhar Resultados'} />
                </ListItem>
            </List>
        </div >
    );

    return (
        <div>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
            >
                <MenuIcon />
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </IconButton>
        </div>
    );
}

// ResponsiveDrawer.propTypes = {
//     myClick: PropTypes.func
// };

export default ResponsiveDrawer;