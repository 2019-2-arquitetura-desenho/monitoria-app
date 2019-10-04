import React from 'react';


import './login.css';
import LoginInput from '../../components/LoginInput/loginInput';
import LoginButton from '../../components/LoginButton/loginButton';

import logo from '../../assets/logo_full.png';
import classroomImg from '../../assets/classroom.svg';

const Login = () => {
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

                    <div className="userLoginContent">
                        <LoginInput
                            icon="mail"
                            value="E-mail"
                        />
                        <LoginInput
                            icon="lock"
                            value="Senha"
                            password="true"
                        />
                    </div>


                    <div className="userButtonsGroup">
                        <LoginButton
                            value="Entrar"
                        />
                        <LoginButton
                            value="Criar Conta"
                        />
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Login;
