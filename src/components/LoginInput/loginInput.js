import React from 'react';
import { FaEnvelope, FaUnlockAlt } from 'react-icons/fa';

import './loginInput.css';

const LoginInput = (props) => {
    const value = props.value ? props.value : "";
    const iconText = props.icon ? props.icon : "";
    const typeField = props.password ? "password" : "text";

    const functionChange = props.inputValue;

    function render_icon() {
        if (iconText === "lock")
            return (
                <FaUnlockAlt
                    size='25px'
                    color='#267cc1'
                />
            );
        else if (iconText === "mail")
            return (
                <FaEnvelope
                    size='25px'
                    color='#267cc1'
                />
            );

    }

    return (
        <div className="input-container">
            <div className='icon'>
                {render_icon()}
            </div>
            <tex className="input-name">{value}:</tex>
            <input className="input-text" type={typeField} onChange={functionChange} />
        </div>
    );
}

export default LoginInput;
