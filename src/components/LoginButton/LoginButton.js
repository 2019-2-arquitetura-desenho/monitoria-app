import React from 'react';

import './LoginButton.css';

const LoginButton = (props) => {
    const value = props.value ? props.value : ''
    return (
        <button className="buttonStyle">{value}</button>
    );
}

export default LoginButton;