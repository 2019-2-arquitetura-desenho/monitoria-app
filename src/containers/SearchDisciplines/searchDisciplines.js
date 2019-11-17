import React from 'react';
import { connect } from 'react-redux';
import { getProfile, getStudent } from '../../store/actions';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Typography,
  Container,
  MuiThemeProvider,
  createMuiTheme,
  Box,
  Grid,
  CircularProgress
} from '@material-ui/core';
import MainError from '../components/MainError/mainError';
import InputSearch from '../components/InputSearch/inputSearch';
import DisciplinesList from './disciplinesList';
import ConfirmationDialog from '../components/ConfirmationDialog/confirmationDialog';
import { getDisciplines } from './requestDisciplines';


class SearchDisciplines extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      disciplines: undefined,
      searchDisciplines: '',

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
    this.handleInputSearch = this.handleInputSearch.bind(this);
    this.searchDisciplines = this.searchDisciplines.bind(this);
  }

  async componentDidMount() {
    const {
      profileData
    } = this.props;

    if (!profileData.is_professor) {
      let response = await getDisciplines(this.props.token);
      let disciplines = response.responseData;
      let error = response.responseError;

      this.setState({ disciplines: disciplines });

      if (error === 'Error: Network Error') {
        this.setState({
          mainError: "Erro! Verifique sua conexão com a internet e tente novamente mais tarde.",
          loading: false
        });
      } else if (error != undefined) {
        this.setState({
          mainError: "Erro Interno ou conexão expirada. Refaça o Login.",
          loading: false
        });
      }
    }
  }

  componentDidUpdate() {
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
    this.setState({ dialogType: dialogType })
    if (dialogType === "success")
      this.setState({ dialogConfirmPath: '/results' })
    this.setState({ dialogOpen: true })
  }

  handleInputSearch(textValue) {
    this.state.searchDisciplines = textValue;
  }

  searchDisciplines() {
    this.forceUpdate();
  }

  testListDisciplines() {
    let classrooms = [
      {
        name: 'E',
        shift: 'Diurno',
        discipline: {
          name: 'Pratica de Eletronica Digital 1',
          code: '11111000'
        },
        professors: [
          "Guilhermo Alvares"
        ],
        period: {
          initial_time: '201'
        }
      }
    ]
  }

  renderDisciplines() {
    const {
      profileData
    } = this.props;

    if (!profileData.is_professor) {
      let filteredDisciplines;
      if (this.state.disciplines) {
        filteredDisciplines = this.state.disciplines.disciplines.filter(discipline => (
          discipline.name.normalize('NFD').
            replace(/[\u0300-\u036f]/g, "").
            toLowerCase().includes(this.state.searchDisciplines)
        ));
      }

      if (filteredDisciplines) {
        return (
          <DisciplinesList
            disciplines={filteredDisciplines}
            onPress={this.handleDialogOpen}
          />
        );
      }
      else {
        return (
          <div>
            <CircularProgress color="secondary" align='center' />
          </div>
        );
      }
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
          <Container component="div" maxWidth="md" className={classes.container} >
            <Grid container>
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
                  {/* <MainError error={this.state.mainError} /> */}
                  <InputSearch
                    onChange={this.handleInputSearch}
                    onPress={this.searchDisciplines}
                  />
                </Typography>
              </Grid>
              <Box className={classes.boxHelpLabel} align="center">
                <Box className={classes.mainErrorBox}>
                  <MainError error={mainError} />
                </Box>
              </Box>
            </Grid>
            <Grid container align="center" className={classes.disciplines}>
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
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%'
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
  disciplines: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: '60vh',
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
  }
}

export const SearchDisciplinesContainer = connect(
  mapStateToProps,
  { getProfile, getStudent, getDisciplines },
)(withStyles(styles, { withTheme: true })(SearchDisciplines))

export default SearchDisciplinesContainer;