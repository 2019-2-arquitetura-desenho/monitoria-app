import React from 'react';
import {
  Grid,
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
  const { onChange, onSubmitName, onSubmitEmail } = props;
  const classes = useStyles();

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
              value={name ? name : "Sem Nome"}
              onChange={onChange}
              error={inputErrors.name}
            />
          </Grid>
          <Grid item xs={1}>
            <UpdateButton
              titleButton="Alterar"
              onClickSubmitButton={onSubmitName}
            />
          </Grid>
        </Grid>

        <Grid item xs={10}
          className={classes.gridFormButtons}>
          <Grid item xs={9}>
            <InputText
              id="email"
              type="email"
              label="Email*"
              value={email ? email : "Sem e-mail"}
              onChange={onChange}
              error={inputErrors.email}
            />
          </Grid>
          <Grid item xs={1}>
            <UpdateButton
              titleButton="Alterar"
              onClickSubmitButton={onSubmitEmail}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default FormProfessor;