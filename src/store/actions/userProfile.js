import axios from 'axios';
//import { connect } from 'react-redux';

const host_api = process.env.REACT_APP_URL_API;

export function updateProfile(props) {
  const {
    token, name, email, password, document
  } = props;

  let url = host_api + '/set_profile/';
  let dataToSend = {
    token,
    name,
    email,
    password,
    document
  };


  return function (dispatch) {
    dispatch({
      type: 'UPDATE_PROFILE_REQUEST',
      updatingProfile: {
        name: name ? true : false,
        email: email ? true : false,
        password: password ? true : false,
        document: document ? true : false
      }
    });

    axios.post(
      url,
      dataToSend
    ).then(response => {
      dispatch({
        type: 'UPDATE_PROFILE_SUCCESS',
        payload: response.data,
        updatingProfile: { name: false, email: false, password: false, document: false }
      });
    }).catch(error => {
      if (!error.response) {
        dispatch({
          type: 'UPDATE_PROFILE_ERROR',
          payload: 'Error: Network Error',
          updatingProfile: { name: false, email: false, password: false, document: false }
        });
      } else {
        dispatch({
          type: 'UPDATE_PROFILE_ERROR',
          payload: error.response
        });
      }
    });
  }
}

export function restartUpdateProfile() {
  return function (dispatch) {
    dispatch({ type: 'RESTART_UPDATE_PROFILE' });
  }
}

export function getProfile(token) {
  let url = host_api + '/get_profile/';
  let dataToSend = {
    token
  };
  return function (dispatch) {
    axios.post(
      url,
      dataToSend
    ).then(response => {
      dispatch({
        type: 'GET_PROFILE_SUCCESS',
        payload: response.data
      });
    }).catch(error => {
      if (!error.response) {
        dispatch({
          type: 'GET_PROFILE_ERROR',
          payload: 'Error: Network Error'
        });
      } else {
        dispatch({
          type: 'GET_PROFILE_ERROR',
          payload: error.response
        });
      }
    });
  }
}

