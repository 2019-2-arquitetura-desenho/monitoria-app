import axios from 'axios';
const host_api = process.env.REACT_APP_URL_API;

export function getDisciplines(token, idStudent) {
  let url = host_api + `/students/${idStudent}/disciplines/`;
  let dataToSend = { token };

  return function (dispatch) {
    dispatch({
      type: 'GET_DISCIPLINES_REQUEST',
      fetchingData: true
    });

    axios.get(
      url,
      dataToSend
    ).then(response => {
      dispatch({
        type: 'GET_DISCIPLINES_SUCCESS',
        payload: response.data,
        fetchingData: false
      });
    }).catch(error => {
      if (!error.response) {
        dispatch({
          type: 'GET_DISCIPLINES_ERROR',
          requestError: 'Error: Network Error',
          fetchingData: false
        });
      } else {
        dispatch({
          type: 'GET_DISCIPLINES_ERROR',
          requestError: error.response,
          fetchingData: false
        });
      }
    });
  }
}

export function registerInDiscipline(token, idStudent, idDiscipline) {
  let url = host_api +
    `/students/${idStudent}/disciplines/${idDiscipline}/registration`;

  let dataToSend = {
    token
  };

  return function (dispatch) {
    dispatch({
      type: 'REGISTER_DISCIPLINE_REQUEST',
      registeringDiscipline: true
    });

    axios.post(
      url,
      dataToSend
    ).then(response => {
      dispatch({
        type: 'REGISTER_DISCIPLINE_SUCCESS',
        payload: response.data,
        registeringDiscipline: false
      })
    }).catch(error => {
      if (!error.response) {
        dispatch({
          type: 'REGISTER_DISCIPLINE_ERROR',
          requestError: 'Error: Network Error',
          registeringDiscipline: false
        });
      } else {
        dispatch({
          type: 'REGISTER_DISCIPLINE_ERROR',
          requestError: error.response,
          registeringDiscipline: false
        });
      }
    })
  }
}