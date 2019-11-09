import React from 'react';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  Container,
  Divider,
  Box
} from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';
import Menu from './components/NavigationMenu/navigationMenu';
import InputText from './components/InputText/inputText';
import FileSubmit from './components/FileSubmit/fileSubmit';


class PersonalInfos extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      ira: '',
      registration: '',

      isUploadDialogOpen: false,
      isFileSubmit: false,
      fileSubmit: [],

      inputErrors: {}
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleClickOpenUploadDialog = this.handleClickOpenUploadDialog.bind(this);
    this.handleCloseUploadDialog = this.handleCloseUploadDialog.bind(this);
    this.onUpdateFileUploadDialog = this.onUpdateFileDialog.bind(this);
    this.handleCancelUploadDialog = this.handleCancelUploadDialog.bind(this);
    this.handleConfirmUploadDialog = this.handleConfirmUploadDialog.bind(this);
    this.onUpdateFileUploadScreen = this.onUpdateFileUploadScreen.bind(this);
    // this.onPressSubmit = this.onPressSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleClickOpenUploadDialog() {
    this.setState({ isUploadDialogOpen: true });
  }

  handleCloseUploadDialog() {
    this.setState({ isUploadDialogOpen: false, isFileSubmit: false });
  }

  onUpdateFileDialog(fileItems) {
    this.setState({ fileSubmit: fileItems.map(fileItem => fileItem.file) });
  }

  handleCancelUploadDialog() {
    this.setState({ isUploadDialogOpen: false, isFileSubmit: false });
  }

  handleConfirmUploadDialog() {
    if (this.state.fileSubmit === undefined) {
      this.setState({ isUploadDialogOpen: false });
    } else if (this.state.fileSubmit === 0) {
      this.setState({ isUploadDialogOpen: false });
    } else {
      this.setState({ isUploadDialogOpen: false, isFileSubmit: true });
    }
  }

  onUpdateFileUploadScreen(fileItems) {
    if (this.state.fileSubmit.length !== fileItems.map(fileItem => fileItem.file).length) {
      this.setState({ fileSubmit: fileItems.map(fileItem => fileItem.file) });
    }
  }

  formInfos() {
    const {
      name, email, registration, ira, inputErrors, fileSubmit, isFileSubmit,
      isUploadDialogOpen,
    } = this.state;
    return (
      <Grid container justify="center"  >
        <Grid xs={12} sm={10}>
          <InputText
            id="name"
            type="text"
            label="Nome*"
            value={name}
            onChange={this.handleChange}
            error={inputErrors.name}
          />
          <InputText
            id="email"
            type="email"
            label="Email*"
            value={email}
            onChange={this.handleChange}
            error={inputErrors.email}
          />
          <InputText
            id="registration"
            type="number"
            label="Matrícula*"
            value={registration}
            onChange={this.handleChange}
            error={inputErrors.registration}
          />
          <InputText
            id="ira"
            type="number"
            label="IRA*"
            value={ira}
            onChange={this.handleChange}
            error={inputErrors.ira}
          />
          <Grid container
            justify="center">
            <Grid item xs={5}>
              <FileSubmit
                label={"Reenviar Histórico"}
                isFileSubmit={isFileSubmit}
                fileSubmit={fileSubmit}
                onButtonUploadClick={this.handleClickOpenUploadDialog}
                isUploadDialogOpen={isUploadDialogOpen}
                onCloseUploadDialog={this.handleCloseUploadDialog}
                onUpdateFileUploadDialog={this.onUpdateFileUploadDialog}
                onClickCancelUploadDialog={this.handleCancelUploadDialog}
                onClickConfirmUploadDialog={this.handleConfirmUploadDialog}
                onUpdateFileUploadScreen={this.onUpdateFileUploadScreen}
              />
            </Grid>
            <Grid item xs={6} >

            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  render() {
    const { classes, position } = this.props
    return (
      <React.Fragment>
        <div className={classes.root}>
          <Menu position={1} />

          <Container maxWidth="md" className={classes.container}>
            <Typography
              variant="h5" align="center"
              className={classes.title}>
              Suas Informações
            </Typography>
            <Divider className={classes.divider} />
            <Box className={classes.boxHelpLabel}>
              <Typography
                variant="subtitle1"
                className={classes.helpLabel}
              >
                <HelpIcon style={{ paddingRight: '5px' }} />
                As Informações aqui presentes não estão disponíveis para
                a visualização de outros alunos, exceto o nome
              </Typography>
            </Box>

            {this.formInfos()}

          </Container>
        </div>
      </React.Fragment>
    );
  }
}

PersonalInfos.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

const styles = theme => ({
  root: {
    backgroundColor: '#42a0ed',
    paddingTop: theme.spacing(5),
  },
  container: {
    backgroundColor: '#fff',
    height: '100vh'
  },
  title: {
    color: "#267cc1",
    paddingBottom: 15
  },
  boxHelpLabel: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  helpLabel: {
    color: "#267cc1",
    paddingBottom: 15,
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  divider: {
    size: 30,
    color: "black"
  }
});

export default withStyles(styles, { withTheme: true })(PersonalInfos);