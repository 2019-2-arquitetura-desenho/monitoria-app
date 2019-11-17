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
      responseError = error.response;
    }
  });

  console.log("error fetch return: ", responseError)
  return { responseData, responseError };
}

export function registerInDiscipline(token, idStudent, idDiscipline) {
  let url = host_api +
    `/students/${idStudent}/disciplines/${idDiscipline}/registration`;

  let dataToSend = {
    token
  };

  axios.post(
    url,
    dataToSend
  ).then(response => {
  }).catch(error => {
  })
}