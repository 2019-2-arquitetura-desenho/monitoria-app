import React from 'react';
import { connect } from 'react-redux';
import { getProfile, getStudent, logout } from '../../store/actions';
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
import ConfirmationDialog from './confirmationDialog';
import { getDisciplines, registerInDiscipline } from './requestDisciplines';


class SearchDisciplines extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      disciplines: undefined,
      searchDisciplines: '',

      textButtonClass: '',
      dialogOpen: false,
      disciplineSelected: undefined,
      classroomSelected: undefined,
      successSubscribe: false,
      mainError: ''
    }

    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.handleActionInClassroom = this.handleActionInClassroom.bind(this);
    this.nextPathDialog = this.nextPathDialog.bind(this);
    this.handleInputSearch = this.handleInputSearch.bind(this);
    this.searchDisciplines = this.searchDisciplines.bind(this);
    this.verifyErrors = this.verifyErrors.bind(this);
    this.handleConfirmDialog = this.handleConfirmDialog.bind(this);
  }

  async componentDidMount() {
    const {
      profileData, token
    } = this.props;

    if (profileData.is_professor) {
      this.setState({ textButtonClass: "Verificar Ranking" });
    } else {
      this.setState({ textButtonClass: "Inscrever-se para a Monitoria" });
    }

    const tokenExpiredTest = `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6InRlc3RlNyIsImV4cCI6MTU3NDAwMDE1MSwiZW1haWwiOiJ0ZXN0ZTdAZ21haWwuY29tIn0.pXyu-VRACjgNQ267EsCdrPfoKnTvJEqKnNvf2db489s`
    let response = await getDisciplines(token);
    let disciplines = response.responseData;
    let error = response.responseError;

    this.setState({ disciplines: disciplines });

    this.verifyErrors(error, "Erro na Busca das Disciplinas")
  }

  verifyErrors(error, unknowError = "Erro Desconhecido") {
    const {
      logout
    } = this.props;

    if (error === 'Error: Network Error') {
      this.setState({
        mainError: "Erro! Verifique sua conexão com a internet e tente novamente mais tarde.",
        loading: false
      });
    } else if (error && error.non_field_errors && error.non_field_errors[0] === "Signature has expired.") {
      this.setState({
        mainError: error.non_field_errors,
        loading: false
      });
      logout();
    }
    else if (error) {
      this.setState({
        mainError: unknowError,
        loading: false
      });
    }
  }

  componentDidUpdate() {
  }

  handleActionInClassroom(discipline, classroom) {
    this.state.classroomSelected = classroom;
    this.state.disciplineSelected = discipline;
    this.setState({ dialogOpen: true });
  }

  async handleConfirmDialog(priority) {
    const {
      token
    } = this.props;

    let response = await registerInDiscipline(
      token,
      this.state.disciplineSelected.code,
      this.state.classroomSelected,
      priority
    );
    console.log("Response: ", response);
    if (response.status === 200) {
      this.setState({ successSubscribe: true });
    } else {
      this.verifyErrors(response.responseError, "Não Foi possível se inscrever!");
      this.setState({ dialogOpen: false });
      window.scrollTo(0, 0);
    }

  }

  handleDialogClose() {
    this.setState({
      dialogOpen: false,
      successSubscribe: false,
      disciplineSelected: undefined,
      classroomSelected: false
    })
  }

  handleInputSearch(textValue) {
    this.state.searchDisciplines = textValue;
  }

  searchDisciplines() {
    this.forceUpdate();
  }

  renderDisciplines() {
    const {
      profileData
    } = this.props;

    let filteredDisciplines;
    if (this.state.disciplines) {
      filteredDisciplines = this.state.disciplines.filter(discipline => (
        discipline.name.normalize('NFD').
          replace(/[\u0300-\u036f]/g, "").
          toLowerCase().includes(this.state.searchDisciplines)
      ));
      if (!this.state.disciplines.length) {
        const textStudent = `O Estudante não possui nenhuma disciplina em que pode se matricular`;
        const textProfessor = `O Professor não possui nenhuma disciplina ministrada no semestre`;
        return (
          <Typography color="secondary">{profileData.is_professor ? textProfessor : textStudent}</Typography>
        );
      }
    }

    if (filteredDisciplines) {
      if (filteredDisciplines.length > 0) {
        return (
          <DisciplinesList
            disciplines={filteredDisciplines}
            labelButtonAction={this.state.textButtonClass}
            action={this.handleActionInClassroom}
          />
        );
      }
      else {
        return (
          <Typography color="secondary">Nenhuma Disciplina Encontrada</Typography>
        );
      }
    } else {
      return (
        <div>
          <CircularProgress color="secondary" align='center' />
        </div>
      );
    }
  }

  nextPathDialog(path = '/results') {
    this.props.history.push(path);
  }


  renderDialogConfirm() {
    const {
      disciplineSelected, classroomSelected, successSubscribe
    } = this.state;

    const dialogText = "Escolha a Prioridade para a Disciplina";
    const dialogContext = successSubscribe ? "success" : "confirm";
    const dialogTitle = "Confirmação";
    const dialogPriority = true;
    const dialogRangePriority = 10;
    const successMessage = `Você foi inscrito na seleção para a monitoria de
      ${disciplineSelected ? disciplineSelected.title :
        '<DISCIPLINA>'} tuma ${classroomSelected ? classroomSelected : '<TURMA>'}`;

    return (
      <ConfirmationDialog
        isOpen={this.state.dialogOpen}
        handleClose={this.handleDialogClose}
        title={dialogTitle}
        description={dialogText}
        handlePressButton={this.handleConfirmDialog}
        hasSelect={dialogPriority}
        rangeSelect={dialogRangePriority}
        context={dialogContext}
        messageOnSuccess={successMessage}
        actionButtonSuccess={this.nextPathDialog}
      />
    );
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
              {this.renderDialogConfirm()}
              <Grid container justify="center">
                <Typography
                  variant="h5"
                  className={classes.title}>
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
  { getProfile, getStudent, logout },
)(withStyles(styles, { withTheme: true })(SearchDisciplines))

export default SearchDisciplinesContainer;