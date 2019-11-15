import axios from 'axios';

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
          payload: error.response,
          updatingProfile: { name: false, email: false, password: false, document: false }
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

export function getStudent(token) {
  let url = host_api + '/get_student/';
  let dataToSend = {
    token
  };
  return function (dispatch) {
    dispatch({
      type: 'GET_STUDENT_REQUEST',
      fetchingStudent: true
    });

    axios.post(
      url,
      dataToSend
    ).then(response => {
      dispatch({
        type: 'GET_STUDENT_SUCCESS',
        fetchingStudent: false,
        payload: response.data
      });
    }).catch(error => {
      if (!error.response) {
        dispatch({
          type: 'GET_STUDENT_ERROR',
          fetchingStudent: false,
          requestError: 'Error: Network Error'
        });
      } else {
        dispatch({
          type: 'GET_STUDENT_ERROR',
          fetchingStudent: false,
          requestError: error.response
        });
      }
    });
  }
}
