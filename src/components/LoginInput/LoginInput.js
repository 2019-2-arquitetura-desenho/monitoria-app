import React from 'react';
import { FaEnvelope, FaUnlockAlt } from 'react-icons/fa';

import './LoginInput.css';

const LoginInput = (props) => {
    const value = props.value ? props.value : '';
    const icon_text = props.icon ? props.icon : '';

    function render_icon() {
        if (icon_text === 'lock')
            return (
                <FaUnlockAlt
                    size='25px'
                    color='#267cc1'
                />
            );
        else if (icon_text === 'mail')
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
            <tex className="input-text">{value}</tex>
            <input className="input-inside" type="text" />
        </div>
    );
}

export default LoginInput;
