import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';


import './login.css';
import LoginInput from '../../components/LoginInput/loginInput';
import LoginButton from '../../components/LoginButton/loginButton';
import AlertMessage from '../../components/AlertMessage/alertMessage';

import logo from '../../assets/logo_full.png';
import classroomImg from '../../assets/classroom.svg';


const host_api = process.env.REACT_APP_URL_API;

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
      email: undefined,
      password: undefined
    }
  }

  togglePopup(message, popUpType = "error") {
    this.textMessagePopUp = message;
    this.popUpType = popUpType;
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  nextPath(path) {
    this.props.history.push(path);
  }

  submitLogin(e) {
    if (!this.state.email || !this.state.password)
      return;
    e.preventDefault();
    let dataToSend = {
      email: this.state.email,
      password: this.state.password
    };
    let url = host_api + '/login/';
    fetch(url, {
      method: "POST",
      body: JSON.stringify(dataToSend),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => response.json())
      .then(responseJson => {
        console.log(responseJson)
        if (responseJson.token) {
          console.log(responseJson);
          localStorage.setItem('MONITORIAAPP_TOKEN', responseJson.token);
          this.nextPath('/home');
        }
        else if (responseJson.email) {
          this.togglePopup("Insira um formato de email válido", "error")
        }
        else if (responseJson.non_field_errors) {
          this.togglePopup("Email ou senha inválidos", "error")
        }
      }).catch(err => {
        console.log('-------');
        console.log(err);

        this.togglePopup("Erro ao Processar!!!", "error");
      })
  }

  submitSignUp(e) {
    e.preventDefault();
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
              <text>Descrição detalhada do app e
                  apresentação de funcionalidades
                            </text>
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

            {this.state.showPopup ?
              <AlertMessage onClick={this.togglePopup.bind(this)}
                type={this.popUpType}
                textMessage={this.textMessagePopUp} /> :
              null}

            <form className="formLogin" onSubmit={this.submitLogin}>
              <div className="userLoginContent">
                <LoginInput
                  icon="mail"
                  value="E-mail"
                  type="email"
                  inputValue={this.emailChange}
                />
                <LoginInput
                  icon="lock"
                  value="Senha"
                  type="password"
                  inputValue={this.passwordChange}
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

export default withRouter(Login);
