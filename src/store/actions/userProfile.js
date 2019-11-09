import axios from 'axios';
import { connect } from 'react-redux';

const host_api = process.env.REACT_APP_URL_API;

export function updateProfile(token, name, email, password, ira, matricula, document) {
    let url = host_api + '/set_profile/';
    let dataToSend = {
        token,
        email,
        password,
        name,
        ira,
        matricula,
        // document
    };
    return function (dispatch) {
        axios.post(
            url,
            dataToSend
        ).then(response => {
            dispatch({
                type: 'UPDATE_PROFILE_SUCCESS',
                payload: response.data
            });
        }).catch(error => {

        });
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

        });
    }
}

