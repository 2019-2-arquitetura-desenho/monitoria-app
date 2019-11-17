import axios from 'axios';
const host_api = process.env.REACT_APP_URL_API;

export async function getDisciplines(token, idStudent) {
  let url = host_api + `/get_disciplines/`;
  let dataToSend = { token };

  let responseData;
  let responseError;

  await axios.post(
    url,
    dataToSend
  ).then(response => {
    responseData = response.data
  }).catch(error => {
    if (!error.response) {
      responseError = 'Error: Network Error'
    } else {
      responseError = error.response ? error.response.data : error;
    }
  });

  return { responseData, responseError };
}

export async function registerInDiscipline(token, codeDiscipline, nameClassroom, priority = 1) {
  let url = host_api + `/register_discipline/`;

  let dataToSend = {
    token,
    discipline_code: codeDiscipline,
    class_name: nameClassroom,
    priority
  };

  let responseData;
  let status;
  let responseError;

  await axios.post(
    url,
    dataToSend
  ).then(response => {
    status = response.status
    responseData = response.data
  }).catch(error => {
    if (!error.response) {
      responseError = 'Error: Network Error'
    } else {
      responseError = error.response ? error.response.data : error;
    }
  })
  console.log(responseData)
  return { status, responseData, responseError };
}