import axios from 'axios';

export function register(name, email, password, document){
    return function(dispatch){
        axios.post(
            'http://localhost:8000/registration/',
            {
                name: name,
                email: email,
                password: password,
                // document: document
            }
        ).then(response => {
            console.log('Cadastro realizado com sucesso!');
            dispatch({ type: 'REGISTER_SUCCESS', payload: response });
        }).catch(error => {
            console.log('Erro no cadastro.');
            if(!error.response){
                console.log('Error: ERR_CONNECTION_REFUSED');
                dispatch({ type: 'REGISTER_ERROR', payload: 'Error: Network Error' });
            } else {
                console.log('Error', error.response)
                dispatch({ type: "REGISTER_ERROR", payload: error.response })
            }
        });
    }
}

export function restartRegister(){
    return function(dispatch){
        dispatch({ type: "RESTART_REGISTER" })
    }
}