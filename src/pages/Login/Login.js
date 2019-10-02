import React from 'react';


import './Login.css';
import LoginInput from '../../components/LoginInput/LoginInput';

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
                        <button className="userButton">Entrar</button>
                        <button className="userButton">Criar Conta</button>
                    </div>


                    <div className="professorButtonGroup">
                        <button className="professorButton">
                            Entrar Como Professor
                        </button>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Login;
