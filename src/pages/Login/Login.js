import React from 'react';


import './Login.css';
import LoginInput from '../../components/LoginInput/LoginInput';
import LoginButton from '../../components/LoginButton/LoginButton';

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
                        <img className="classroomImg"
                            src={classroomImg}
                        />
                    </div>
                </div>

                <div className="loginPanel">
                    <div className="logoContent">
                        <img id="logo" src={logo} />
                    </div>

                    <div className="userLoginContent">
                        <LoginInput
                            icon="mail"
                            value="E-mail"
                        />
                        <LoginInput
                            icon="lock"
                            value="Senha"
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


                    <div className="professorButtonGroup">
                        <LoginButton
                            value="Entrar Como Professor"
                        />
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Login;
