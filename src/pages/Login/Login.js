import React from 'react';

import './Login.css';

import logo from '../../assets/logo_full.png';
import classroomImg from '../../assets/classroom.svg';

const Login = () => {
    return (
        <div className="Container" >
            <div className="Content">
                <div className="Panel-left">
                    <div className="Title">
                        <h1 id="Title-part1">Monitoria</h1>
                        <h1 id="Title-part2">FGA</h1>
                    </div>
                    <div className="DescApp">
                        <text>Descrição detalhada do app e
                            apresentação de funcionalidades, é
                            nesse texto
                        </text>
                    </div>
                    <div className="Content-img">
                        <img className="Classroom-img"
                            src={classroomImg}
                        />
                    </div>
                </div>

                <div className="Panel-login">
                    <div className="Content-logo">
                        <img id="Logo" src={logo} />
                    </div>

                    <div className="Content-userLogin">
                        <input className="UserLogin-input" type="text" value="E-mail" />
                        <input className="UserLogin-input" type="text" value="Senha" />
                    </div>

                    <div className="Content-userButtons">
                        <button className="UserButton">Entrar</button>
                        <button className="UserButton">Criar Conta</button>
                    </div>

                    <div className="Content-professorButton">
                        <button className="ProfessorButton">
                            Entrar Como Professor
                        </button>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Login;
