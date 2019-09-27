import React from 'react';

import './Login.css';

import classroomImg from '../../assets/classroom.svg';

function Login() {
    return (
        <div className="Container">
            <div className="Content">
                <div className="Panel-left">
                    <div className="Title">
                        <h1 id="Title-part1">Monitoria</h1>
                        <h1 id="Title-part2">FGA</h1>
                    </div>
                    <div id="DescApp">
                        <text>Descrição detalhada do app e
                            apresentação de funcionalidades, é
                            nesse texto
                        </text>
                    </div>
                    <img className="Classroom-img"
                        src={classroomImg}
                    />
                </div>
                <div className="Panel-login">

                </div>
            </div>
        </div>
    );
}

export default Login;
