import React from 'react';
import {
  Grid,
} from '@material-ui/core';
import InputText from '../components/InputText/inputText';


const FormProfessor = (props) => {
  const {
    name, email, inputErrors
  } = props.stateParent;
  const { onChange } = props;

  return (
    <Grid item xs={12} sm={10} >
      <Grid>
        <InputText
          id="name"
          type="text"
          label="Nome*"
          value={name ? name : "Sem Nome"}
          onChange={onChange}
          error={inputErrors.name}
        />
        <InputText
          id="email"
          type="email"
          label="Email*"
          value={email ? email : "Sem e-mail"}
          onChange={onChange}
          error={inputErrors.email}
        />
      </Grid>
    </Grid>
  );
}

export default FormProfessor;