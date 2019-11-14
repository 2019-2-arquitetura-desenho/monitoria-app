import React from 'react';
import { connect } from 'react-redux';
import { Card, CardContent, Typography, Box } from '@material-ui/core';
import { getProfile, logout } from '../store/actions';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}

  }

  async componentDidMount() {
    await this.props.getProfile(this.props.token);
  }

  render() {
    return (
      <React.Fragment>
          <p>
            Home Wellison
          </p>
      </React.Fragment >
    );
  }
}

function mapStateToProps(state) {
  return {
    userData: state.authentication.userData,
    token: state.authentication.token,
    profileData: state.userProfile.profileData
  }
}

export const homeContainer = connect(
  mapStateToProps,
  { getProfile, logout }
)(Home)

export default homeContainer;
