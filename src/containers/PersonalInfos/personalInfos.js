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
import HelpIcon from '@material-ui/icons/Help';
import Menu from '../components/NavigationMenu/navigationMenu';
//import InputText from '../components/InputText/inputText';
import FormStudent from './formStudent';
import FormProfessor from './formProfessor';
import MainError from '../components/MainError/mainError';


class PersonalInfos extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      ira: '',
      matricula: '',
      user: '',

      isFileSubmit: false,
      fileSubmit: [],

      mainError: "",
      inputErrors: {}
    }

    this.handleChange = this.handleChange.bind(this);
    this.setFileSubmit = this.setFileSubmit.bind(this);
    this.setStatusFileSubmit = this.setStatusFileSubmit.bind(this);
    this.onPressSubmitName = this.onPressSubmitName.bind(this);
    this.onPressSubmitEmail = this.onPressSubmitEmail.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  setFileSubmit(file) {
    this.setState({ fileSubmit: file });
  }

  setStatusFileSubmit(status) {
    this.setState({ isFileSubmit: status })
  }

  componentWillMount() {
    this.props.getProfile(this.props.token);
    if (this.props.profileData) {
      this.setState({
        name: this.props.profileData.name,
        email: this.props.profileData.user.email,
        matricula: this.props.profileData.matricula,
        ira: this.props.profileData.ira,
        user: this.props.profileData.user
      })
    }
  }


  componentDidUpdate() {

    if (this.props.requisitionError !== undefined) {
      this.props.restartUpdateProfile();

      if (this.props.requisitionError === "Error: Network Error") {

        this.setState({
          mainError: "Erro! Verifique sua conexão com a internet e tente novamente mais tarde."
        });

      } else {
        let inputErrors = {}
        if (this.props.requisitionError.data.name) {
          inputErrors['name'] = this.props.requisitionError.data.name
        }
        if (this.props.requisitionError.data.email) {
          inputErrors['email'] = this.props.requisitionError.data.email
        }
        if (this.props.requisitionError.data.password1) {

          inputErrors['password'] = "Escolha uma senha mais segura."

          let passwordError = this.props.requisitionError.data.password1
          if (passwordError.length === 2) {
            if (passwordError[1] === "Esta senha é inteiramente numérica.") {
              inputErrors['password'] += "Não utilize somente números na sua senha."
            } else {
              inputErrors['password'] += " " + passwordError[1]
            }
          }
        }

        this.setState({
          inputErrors: inputErrors,
          loading: false
        })
      }
    }
  }

  onPressSubmitName() {
    const {
      name
    } = this.state;

    let inputErrors = {};
    let f_errorName = false;

    this.setState({ mainError: "" });

    if (!name) {
      inputErrors['name'] = "Digite o nome";
      f_errorName = true;
    }

    this.setState({ inputErrors: inputErrors });

    if (!f_errorName) {
      this.props.updateProfile({ token: this.props.token, name });
    }
  }

  onPressSubmitEmail() {
    const {
      email
    } = this.state;

    let inputErrors = {};
    let f_errorEmail = false;

    this.setState({ mainError: "" });

    if (!email) {
      inputErrors['email'] = "Digite o email";
      f_errorEmail = true;
    } else if (!email.includes("@")) {
      inputErrors['email'] = "Digite um e-mail válido";
      f_errorEmail = true;
    }

    this.setState({ inputErrors: inputErrors });

    if (!f_errorEmail) {
      this.props.updateProfile({ token: this.props.token, email });
    }

  }

  formInfos() {
    if (this.state.user.is_superuser) {
      return (
        <Grid container justify="center"  >
          <FormProfessor
            stateParent={this.state}
            onChange={this.handleChange}
            onSubmitName={this.onPressSubmitName}
            onSubmitEmail={this.onPressSubmitEmail}
          />
        </Grid >
      );
    } else {
      return (
        <Grid container justify="center" >
          <FormStudent
            stateParent={this.state}
            onChange={this.handleChange}
            setStatusFileSubmit={this.setStatusFileSubmit}
            setFileSubmit={this.setFileSubmit}
            onSubmitName={this.onPressSubmitName}
            onSubmitEmail={this.onPressSubmitEmail}
          />
        </Grid >
      );
    }
  }

  render() {
    const { classes } = this.props
    const {
      mainError
    } = this.state;
    return (
      <div className={classes.root}>
        <MuiThemeProvider theme={theme}>
          <Menu position={1} />

          <Container component="div" maxWidth="md" className={classes.container}>
            <Typography
              variant="h5" align="center"
              className={classes.title}>
              Suas Informações - {this.state.user.is_superuser ? "Professor" : "Aluno"}
            </Typography>
            <Divider className={classes.divider} />
            <Box className={classes.boxHelpLabel}>
              <Typography
                variant="subtitle1"
                className={classes.helpLabel}
              >
                <HelpIcon style={{ paddingRight: '5px' }} />
                As Informações aqui presentes não estão disponíveis para
                a visualização dos alunos, exceto o nome
              </Typography>
              <Box className={classes.mainErrorBox}>
                <MainError error={mainError} />
              </Box>
            </Box>

            {this.formInfos()}

          </Container>
        </MuiThemeProvider>
      </div>
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

PersonalInfos.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

const styles = theme => ({
  root: {
    backgroundColor: '#42a0ed',
    height: '100vh'
  },
  container: {
    marginTop: theme.spacing(3),
    backgroundColor: '#fff',
    height: '80%',
    paddingBottom: 20,
  },
  title: {
    color: "#267cc1",
    paddingBottom: 15
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
});

function mapStateToProps(state) {
  return {
    isAuthenticated: state.authentication.isAuthenticated,
    token: state.authentication.token,
    requisitionError: state.userProfile.requisitionError,
    profileData: state.userProfile.profileData
  }
}

export const personalInfosContainer = connect(
  mapStateToProps,
  { updateProfile, getProfile, restartUpdateProfile },
)(withStyles(styles, { withTheme: true })(PersonalInfos))

export default personalInfosContainer;