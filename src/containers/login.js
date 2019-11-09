import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login, restartRegister } from '../store/actions';


import './login.css';
import LoginButton from './components/LoginButton/loginButton';
import InputText from './components/InputText/inputText';


import logo from './assets/logo_full.png';
import classroomImg from './assets/classroom.svg';


class Login extends Component {
  constructor() {
    super();
    this.submitLogin = this.submitLogin.bind(this);
    this.submitSignUp = this.submitSignUp.bind(this);
    this.emailChange = this.emailChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.textMessagePopUp = '';
    this.popUpType = '';

    this.state = {
      email: '',
      password: '',
      inputErrors: {}

    }
  }

  componentDidUpdate() {
    this.requisitionErrorHandler();

    if (this.props.isAuthenticated === true) {
      this.props.history.push("/");
    }
  }

  requisitionErrorHandler() {
    if (this.props.requisitionError !== undefined) {
      console.log("test update: ", this.props.requisitionError)
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

  nextPath(path) {
    this.props.history.push(path);
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
    } else {
      if (password.length < 8) {
        inputErrors['password'] = "Use 8 caracteres ou mais para a sua senha";
        f_errorPassword = true;
      } else if (password.length > 16) {
        inputErrors['password'] = "Use 16 caracteres ou menos para a sua senha";
        f_errorPassword = true;
      }
    }

    this.setState({ inputErrors: inputErrors });

    if (!f_errorEmail && !f_errorPassword) {
      this.props.login(email, password);
    }
  }

  submitSignUp(e) {
    e.preventDefault();
    this.nextPath('/cadastro');
  }

  emailChange(e) {
    this.setState({
      email: e.target.value
    })
  }

  passwordChange(e) {
    this.setState({
      password: e.target.value
    })
  }


  render() {
    return (
      <div className="container" >
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
              <img alt="classroomImg" className="classroomImg"
                src={classroomImg}
              />
            </div>
          </div>


          <div className="loginPanel">
            <div className="logoContent">
              <img alt="logo" id="logo" src={logo} />
            </div>

            <form className="formLogin" onSubmit={this.submitLogin}>
              <div className="userLoginContent">
                <InputText
                  id="email"
                  type="email"
                  label="Email"
                  value={this.state.email}
                  onChange={this.emailChange}
                  error={this.state.inputErrors.email}
                />
                <InputText
                  id="password"
                  type="password"
                  label="Senha"
                  value={this.state.password}
                  onChange={this.passwordChange}
                  error={this.state.inputErrors.password}
                />

              </div>

              <div className="userButtonsGroup">
                <LoginButton
                  value="Entrar"
                  onClick={this.submitLogin}
                />
                <LoginButton
                  value="Criar Conta"
                  onClick={this.submitSignUp}
                />
              </div>
            </form>


          </div>
        </div>
      </div >
    );
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
