import React from 'react';

import './loginButton.css';

const LoginButton = (props) => {
    const value = props.value ? props.value : ''
    const actionButton = props.onClick ? props.onClick : ''
    return (
        <button className="buttonStyle" onClick={actionButton}>
            {value}
        </button>
    );
}

export default LoginButton;