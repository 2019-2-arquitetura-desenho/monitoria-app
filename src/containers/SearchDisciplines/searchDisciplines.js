import React from 'react';
import { connect } from 'react-redux';
import { updateProfile, getProfile, restartUpdateProfile } from '../../store/actions';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  Container,
  Divider,
  MuiThemeProvider,
  createMuiTheme,
  Box
} from '@material-ui/core';
import MainError from '../components/MainError/mainError';
import InputSearch from '../components/InputSearch/inputSearch';
import DisciplineCard from './disciplineCard';
import ConfirmationDialog from '../components/ConfirmationDialog/confirmationDialog';


class SearchDisciplines extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dialogOpen: false,
      dialogTitle: '',
      dialogText: '',
      dialogType: '',
      mainError: ''
    }

    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.handleDialogOpen = this.handleDialogOpen.bind(this);
  }

  handleDialogClose() {
    this.setState({ dialogOpen: false })
  }

  handleDialogOpen(dialogTitle = '', dialogText = '', dialogType = '') {
    this.setState({ dialogTitle: dialogTitle })
    this.setState({ dialogText: dialogText })
    this.setState({ dialogType: dialogType })
    this.setState({ dialogOpen: true })
  }

  render() {
    const { classes } = this.props;
    const {
      mainError
    } = this.state;

    let disciplines = [{ title: 'Cálculo 2', code: 113042 }]

    let classrooms = [
      {
        title: 'AA', period: 'Diurno', shedules: ['Segunda - 8:00/9:50'],
        professors: ['Luiza Yoko Taneguti']
      },
      {
        title: 'BB', period: 'Diurno', shedules: ['Terca - 14:00/15:50', 'Quinta - 14:00/15:50'],
        professors: ['Lindomar Bomfim de Carvallho', 'Wesley Ferreira Lopes', 'Yevsey Yehoshua']
      }
    ]

    disciplines[0].classrooms = classrooms

    return (
      <div className={classes.root}>
        <MuiThemeProvider theme={theme}>
          <Container component="div" maxWidth="md" className={classes.container}>
            <ConfirmationDialog
              isOpen={this.state.dialogOpen}
              handleClose={this.handleDialogClose}
              title={this.state.dialogTitle}
              description={this.state.dialogText}
              type={this.state.dialogType}
            />
            <Grid container justify="center">
              <Typography
                variant="h5"
                className={classes.title}>
                <InputSearch />
              </Typography>
            </Grid>
            <Divider className={classes.divider} />
            <Box className={classes.boxHelpLabel}>
              <Box className={classes.mainErrorBox}>
                <MainError error={mainError} />
              </Box>
            </Box>

            <DisciplineCard
              discipline={disciplines[0]}
              onPress={this.handleDialogOpen}
            />
          </Container>
        </MuiThemeProvider>
      </div >
    );
  }
}

const theme = createMuiTheme({
  palette: {
    background: {
      default: "#42a0ed"
    },
    primary: {
      main: "#42a0ed",
      contrastText: "white"
    },
    secondary: {
      main: "#267cc1"
    }
  }
})

const styles = {
  root: {
    paddingTop: 30,
    paddingBottom: 30,
    backgroundColor: '#42a0ed',
    minHeight: '100vh'
  },
  container: {
    paddingTop: 20,
    backgroundColor: '#fff',
    minHeight: '80%',
    paddingBottom: 20,
  },
  title: {
    color: "#267cc1",
    paddingBottom: 15,
    width: "60%"
  },
  boxHelpLabel: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  mainErrorBox: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%'
  },
  helpLabel: {
    color: "#267cc1",
    paddingBottom: 15,
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  divider: {
    size: 30,
    color: "black"
  }
};

SearchDisciplines.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.authentication.isAuthenticated,
    token: state.authentication.token,
    requisitionError: state.userProfile.requisitionError,
    profileData: state.userProfile.profileData
  }
}

export const SearchDisciplinesContainer = connect(
  mapStateToProps,
  { updateProfile, getProfile, restartUpdateProfile },
)(withStyles(styles, { withTheme: true })(SearchDisciplines))

export default SearchDisciplinesContainer;