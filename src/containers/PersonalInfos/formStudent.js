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

const FormStudent = (props) => {
  const {
    name, email, matricula, ira, inputErrors
  } = props.stateParent;

  const classes = useStyles();
  const { 
    onChange, onSubmitName, updatingProfile,
  } = props;

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
      <Grid item xs={12} sm={6}>
        <Grid container justify="center">
          <Grid 
            item
            xs={12}
            className={classes.gridFormButtons}
          >
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
          <Grid 
            item
            xs={12}
            className={classes.gridFormButtons}
          >
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
          <Grid
            item
            xs={12}
            className={classes.gridFormButtons}
          >
            <Grid item xs={9}>
              <InputText
                id="registration"
                type="text"
                label="Matrícula*"
                value={matricula ? matricula : "000000000"}
                onChange={onChange}
                error={inputErrors.matricula}
                disable={true}
              />
            </Grid>
          </Grid>
          <Grid 
            item
            xs={12}
            className={classes.gridFormButtons}
          >
            <Grid item xs={9}>
              <InputText
                id="ira"
                type="number"
                label="IRA*"
                value={ira ? ira : 0.0}
                onChange={onChange}
                error={inputErrors.ira}
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

export const formStudentComponent = connect(
  mapStateToProps
)(FormStudent)

export default formStudentComponent;
