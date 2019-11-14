import React from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  CircularProgress
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import InputText from '../components/InputText/inputText';
import UpdateButton from './updateButton';

const useStyles = makeStyles(theme => ({
  gridFormButtons: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  }
}));


const FormProfessor = (props) => {
  const {
    name, email, inputErrors
  } = props.stateParent;
  const { onChange, onSubmitName, updatingProfile } = props;
  const classes = useStyles();


  const handleClickBtnName = (event) => {
    onSubmitName()
  }

  // const handleClickBtnEmail = (event) => {
  //   onSubmitEmail()
  // }

  function changeNameComp() {
    if (updatingProfile && updatingProfile.name)
      return (
        <CircularProgress color="secondary" />
      );
    else
      return (
        <UpdateButton
          titleButton="Alterar"
          onClickSubmitButton={handleClickBtnName}
        />
      );
  }


  return (
    <Grid item xs={10} >
      <Grid container justify="center">
        <Grid item xs={10}
          className={classes.gridFormButtons}>
          <Grid item xs={9}>
            <InputText
              id="name"
              type="text"
              label="Nome*"
              value={name}
              onChange={onChange}
              error={inputErrors.name}
            />
          </Grid>
          <Grid item xs={1}>
            {changeNameComp()}
          </Grid>
        </Grid>

        <Grid item xs={10}
          className={classes.gridFormButtons}>
          <Grid item xs={9}>
            <InputText
              id="email"
              type="email"
              label="Email*"
              value={email}
              onChange={onChange}
              error={inputErrors.email}
              disable={true}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.authentication.isAuthenticated,
    requisitionError: state.userProfile.requisitionError,
    updatingProfile: state.userProfile.updatingProfile
  }
}

export const formProfessorComponent = connect(
  mapStateToProps
)(FormProfessor)

export default formProfessorComponent;