import axios from 'axios';
const host_api = process.env.REACT_APP_URL_API;

export async function getDisciplines(token, idStudent) {
  let url = host_api + `/get_disciplines/`;
  let dataToSend = { token };


  let responseData;

  await axios.post(
    url,
    dataToSend
  ).then(response => {
    responseData = response.data
  }).catch(error => {
    if (!error.response) {
      responseData = 'Error: Network Error'
    } else {
      responseData = error.response;
    }
  });

  return responseData;
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