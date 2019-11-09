import axios from 'axios';
import { connect } from 'react-redux';

const host_api = process.env.REACT_APP_URL_API;

function updateProfile(name, email, password, ira, registration, document) {
    let url = host_api + '/set_profile/';
    let dataToSend = {
        token: this.props.token,
        email,
        password,
        name,
        ira,
        registration,
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

function getProfile() {
    let url = host_api + '/get_profile/';
    let dataToSend = {
        token: this.props.token
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

function mapStateToProps(state) {
    return {
        isAuthenticated: state.authentication.isAuthenticated,
        token: state.authentication.userData.token
    }
}

export const updateProfileAction = connect(
    mapStateToProps
)(updateProfile);

export const getProfileAction = connect(
    mapStateToProps,
)(getProfile);
