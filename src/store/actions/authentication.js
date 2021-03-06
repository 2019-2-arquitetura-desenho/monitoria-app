import axios from 'axios';


const host_api = process.env.REACT_APP_URL_API;

export function register(name, email, password, file_url) {
  return function (dispatch) {
    axios.post(
      host_api + '/registration/',
      {
        name: name,
        email: email,
        password: password,
        pdf_url: file_url
      }
    ).then(response => {
      dispatch({
        type: 'REGISTER_SUCCESS',
        payload: response.data.token
      });
    }).catch(error => {
      if (!error.response) {
        dispatch({
          type: 'REGISTER_ERROR',
          payload: 'Error: Network Error'
        });
      } else {
        dispatch({
          type: 'REGISTER_ERROR',
          payload: error.response
        });
      }
    });
  }
}

export function restartRegister() {
  return function (dispatch) {
    dispatch({ type: 'RESTART_REGISTER' });
  }
}

export function login(email, password) {
  let url = host_api + '/login/';
  let dataToSend = {
    email: email,
    password: password
  };

  return function (dispatch) {
    axios.post(
      url,
      dataToSend
    ).then(response => {
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: response.data.token
      });
    }).catch(error => {
      if (!error.response) {
        dispatch({
          type: 'LOGIN_ERROR',
          payload: 'Error: Network Error'
        });
      } else {
        dispatch({
          type: 'LOGIN_ERROR',
          payload: error.response
        });
      }
    });
  }
}

export function restartLogin() {
  return function (dispatch) {
    dispatch({ type: 'RESTART_LOGIN' });
  }
}

export function logout() {
  return function (dispatch) {
    dispatch({ type: 'LOGOUT' });
  }
}
