import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login, restartRegister } from '../store/actions';

import {
  createMuiTheme,
  MuiThemeProvider,
  CssBaseline,
  CircularProgress
} from '@material-ui/core';

import InputText from './components/InputText/inputText';
import SubmitButton from './components/SubmitButton/submitButton';
import classroomImg from './assets/classroom.svg';
import logo from './assets/logo_full.png';

import './login.css';


class Login extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      
      email: '',

      password: '',
      showPassword: false,

      inputErrors: {}
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
    this.handleMouseDownPassword = this.handleMouseDownPassword.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
    this.submitSignUp = this.submitSignUp.bind(this);
}

  componentDidUpdate() {
    this.requisitionErrorHandler();

    if (this.props.isAuthenticated === true) {
      this.props.history.push("/");
    }
  }

  requisitionErrorHandler() {
    if (this.props.requisitionError !== undefined && this.state.loading === true) {
      this.props.restartRegister();

      if (this.props.requisitionError === "Error: Network Error") {

        this.setState({
          mainError: "Erro! Verifique sua conexão com a internet e tente novamente mais tarde.",
          loading: false
        });
      } else {
        let inputErrors = {}
        if (this.props.requisitionError.data.non_field_errors) {
          inputErrors['password'] = this.props.requisitionError.data.non_field_errors;
        }

        this.setState({
          inputErrors: inputErrors,
          loading: false
        })
      }
    }
  }

  submitLogin(e) {
    e.preventDefault();

    let inputErrors = {};

    let f_errorEmail;
    let f_errorPassword;

    let email = this.state.email;
    let password = this.state.password;

    if (!email) {
      inputErrors['email'] = "Digite o email";
      f_errorEmail = true;
    } else if (!email.includes("@")) {
      inputErrors['email'] = "Digite um e-mail válido";
      f_errorEmail = true;
    }

    if (!password) {
      inputErrors['password'] = "Digite uma senha";
      f_errorPassword = true;
    }

    this.setState({ inputErrors: inputErrors });

    if (!f_errorEmail && !f_errorPassword) {
      this.setState({ loading: true })

      clearTimeout();
      setTimeout(
        function() {
          this.props.login(email, password);
        }.bind(this),
        1000
      )
    }
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleClickShowPassword() {
    this.setState({ showPassword: !this.state.showPassword });
  }

  handleMouseDownPassword(event) {
    event.preventDefault();
  }

  nextPath(path) {
    this.props.history.push(path);
  }

  submitSignUp(e) {
    e.preventDefault();
    this.nextPath('/cadastro');
  }

  loginForm() {
    const { mainError, email, password, showPassword, inputErrors, loading } = this.state;

    if (loading) {
      return (
        <form className="formLogin">
          <div style={styles.progress}>
            <CircularProgress color="secondary" />
          </div>
        </form>
      );
    } else {
      return (
        <form className="formLogin">
          <div className="userLoginContent">
            <InputText
              id="email"
              type="email"
              label="Email"
              value={email}
              onChange={this.handleChange}
              error={inputErrors.email}
            />
            <InputText
              id="password"
              type={showPassword ? "text":"password"}
              label="Senha"
              value={password}
              onChange={this.handleChange}
              onClickShow={this.handleClickShowPassword}
              onMouseDown={this.handleMouseDownPassword}
              valueVisibility={showPassword}
              error={inputErrors.password}
            />
          </div>
          <div className="userButtonsGroup">
            <SubmitButton
              titleButton="Cadastrar"
              buttonColor="primary"
              onClickSubmitButton={this.submitSignUp}
            />
            <SubmitButton
              titleButton="Entrar"
              buttonColor="secondary"
              onClickSubmitButton={this.submitLogin}
            />
          </div>
        </form>
      ); 
    }
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <div className="container">
          <div className="content">
            <div className="presentationPanel">
              <div className="title">
                <h1 id="titlePart1">Monitoria</h1>
                <h1 id="titlePart2">FGA</h1>
              </div>
              <div className="descApp">
                {/* Descrição do app e
                  apresentação de funcionalidades */}
              </div>
              <div className="contentImg">
                <img alt="classroomImg" className="classroomImg" src={classroomImg} />
              </div>
            </div>
            <div className="loginPanel">
              <div className="logoContent">
                <img alt="logo" id="logo" src={logo} />
              </div>
              {this.loginForm()}
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

const theme = createMuiTheme({
  palette: {
      primary: {
          main: "#42a0ed",
          contrastText: "white"
      },
      secondary: {
          main: "#267cc1",
          contrastText: "white"
      }
  }
})

const styles = {
  progress: {
    textAlign: "center"
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.authentication.isAuthenticated,
    requisitionError: state.authentication.requisitionError
  }
}

export const loginContainer = connect(
  mapStateToProps,
  { login, restartRegister },
)(Login)

export default loginContainer;
