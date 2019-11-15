import React from 'react';
import { connect } from 'react-redux';
import { getProfile, getStudent, getDisciplines } from '../../store/actions';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  Container,
  Divider,
  MuiThemeProvider,
  createMuiTheme,
  Box,
  CircularProgress
} from '@material-ui/core';
import MainError from '../components/MainError/mainError';
import InputSearch from '../components/InputSearch/inputSearch';
import DisciplineCard from './disciplineCard';
import ConfirmationDialog from '../components/ConfirmationDialog/confirmationDialog';


class SearchDisciplines extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      disciplines: undefined,

      dialogOpen: false,
      dialogTitle: '',
      dialogText: '',
      dialogType: '',
      dialogConfirmPath: '',
      mainError: ''
    }

    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.handleDialogOpen = this.handleDialogOpen.bind(this);
    this.nextPathDialog = this.nextPathDialog.bind(this);
  }

  componentDidMount() {
    const {
      disciplines
    } = this.props;
    this.props.getDisciplines(this.props.token);
    if (disciplines == undefined || disciplines.length == 0) {
    } else {
      // this.getSnapshotBeforeUpdate()
    }
  }

  componentDidUpdate() {
  }

  getSnapshotBeforeUpdate() {
    const {
      disciplines
    } = this.props;
    if (disciplines &&
      this.state.disciplines != disciplines) {
      this.setState({ disciplines: disciplines })
    }
    return null;
  }

  nextPathDialog() {
    this.props.history.push(this.state.dialogConfirmPath);
  }

  handleDialogClose() {
    this.setState({ dialogOpen: false })
  }

  handleDialogOpen(dialogTitle = '', dialogText = '', dialogType = '') {
    this.setState({ dialogTitle: dialogTitle })
    this.setState({ dialogText: dialogText })
    this.setState({ dialogType: 'warning' })
    if (dialogType === "success")
      this.setState({ dialogConfirmPath: '/results' })
    this.setState({ dialogOpen: true })
  }

  renderDisciplines() {
    if (this.state.disciplines != undefined)
      return (
        <div>
          {
            this.state.disciplines && this.state.disciplines.map((discipline, index) => (
              <DisciplineCard
                key={index}
                title={discipline.name}
                code={discipline.code}
                classrooms={discipline.discipline_class}
                onPress={this.handleDialogOpen}
              />
            ))
          }
        </div>
      );
    else {
      return (
        <CircularProgress color="secondary" align='center' />
      );
    }
  }




  render() {
    const { classes } = this.props;
    const {
      mainError
    } = this.state;

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
              handleConfirmNextPath={this.nextPathDialog}
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
            <Grid container className={classes.disciplinesContainer} alignItems='center'>
              {this.renderDisciplines()}
            </Grid>
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
    minHeight: '80vh',
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
  },
  disciplinesContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '80%',
    width: '100%'
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
    profileData: state.userProfile.profileData,
    disciplines: state.disciplines.disciplines
  }
}

export const SearchDisciplinesContainer = connect(
  mapStateToProps,
  { getProfile, getStudent, getDisciplines },
)(withStyles(styles, { withTheme: true })(SearchDisciplines))

export default SearchDisciplinesContainer;