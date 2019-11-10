import React from 'react';
import {
  Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FileSubmit from '../components/FileSubmit/fileSubmit';
import SubmitButton from '../components/SubmitButton/submitButton';
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
    name, email, matricula, ira, inputErrors, fileSubmit, isFileSubmit
  } = props.stateParent;
  const classes = useStyles();
  const { onChange, setStatusFileSubmit, setFileSubmit } = props;
  const [openDialog, setOpen] = React.useState(null);

  const handleClickOpenUploadDialog = event => {
    setOpen(event.currentTarget);
  }

  const handleCloseUploadDialog = () => {
    setOpen(null);
    setStatusFileSubmit(false);
    setFileSubmit(undefined);
  }

  const onUpdateFileDialog = (fileItems) => {
    setFileSubmit(fileItems.map(fileItem => fileItem.file));
  }

  const handleConfirmUploadDialog = () => {
    if (fileSubmit === undefined || fileSubmit === 0) {
      setFileSubmit(undefined);
    } else {
      setStatusFileSubmit(true);
    }
    setOpen(null);
  }

  const onPressChangePassword = () => {

  }

  const open = Boolean(openDialog);

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
              titleButton="Alterar" />
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
              titleButton="Alterar" />
          </Grid>
        </Grid>

        <Grid item xs={10}
          className={classes.gridFormButtons}>
          <Grid item xs={9}>
            <InputText
              id="registration"
              type="number"
              label="Matrícula*"
              value={matricula ? matricula : "000000000"}
              onChange={onChange}
              error={inputErrors.matricula}
              disable={true}
            />
          </Grid>
        </Grid>

        <Grid item xs={10}
          className={classes.gridFormButtons}>
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
      <Grid container justify="center"
        className={classes.gridFormButtons}>
        <Grid item xs={5}>
          <FileSubmit
            label={"Reenviar Histórico"}
            isFileSubmit={isFileSubmit}
            fileSubmit={fileSubmit}
            onButtonUploadClick={handleClickOpenUploadDialog}
            isUploadDialogOpen={open}
            onCloseUploadDialog={handleCloseUploadDialog}
            onUpdateFileUploadDialog={onUpdateFileDialog}
            onClickCancelUploadDialog={handleCloseUploadDialog}
            onClickConfirmUploadDialog={handleConfirmUploadDialog}
          />
        </Grid>
        <Grid item xs={5} >
          <SubmitButton titleButton="Alterar Senha" onClickSubmitButton={onPressChangePassword} />
        </Grid>
      </Grid>
    </Grid>
  );
}



export default FormStudent;
