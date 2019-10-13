import React, { Component } from 'react';


import './login.css';
import LoginInput from '../../components/LoginInput/loginInput';
import LoginButton from '../../components/LoginButton/loginButton';

import logo from '../../assets/logo_full.png';
import classroomImg from '../../assets/classroom.svg';

import { withRouter } from 'react-router-dom';

class Login extends Component {
    constructor() {
        super();
        this.submitLogin = this.submitLogin.bind(this);
        this.submitSignUp = this.submitSignUp.bind(this);
        this.emailChange = this.emailChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);

        this.state = {
            email: undefined,
            password: undefined
        }
    }

    nextPath(path) {
        this.props.history.push(path);
    }

    submitLogin(e) {
        e.preventDefault();
        let dataToSend = {
            userData: {
                email: this.state.email,
                password: this.state.password
            }
        };
        console.log(dataToSend)
        let url = 'http://localhost:3001/auth/login'
        fetch(url, {
            method: "POST",
            body: JSON.stringify(dataToSend),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => response.json())
            .then(responseJson => {
                console.log(responseJson);
                if (responseJson.success) {
                    localStorage.setItem('MONITORIAAPP_TOKEN', responseJson.token);
                    this.nextPath('/home');
                }
            }).catch(err => {
                console.log('-------');
                console.log(err);
            })
    }

    submitSignUp(e) {

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

                        <form className="formLogin">
                            <div className="userLoginContent">
                                <LoginInput
                                    icon="mail"
                                    value="E-mail"
                                    inputValue={this.emailChange}
                                />
                                <LoginInput
                                    icon="lock"
                                    value="Senha"
                                    password="true"
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
