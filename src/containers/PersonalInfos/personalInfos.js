import React from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import axios from 'axios';

import {
  Link,
  Grid,
  Typography,
  Container,
  Divider,
  MuiThemeProvider,
  createMuiTheme,
  CssBaseline,
  Box,
  withStyles,
  IconButton,
  Button,
  CircularProgress
} from '@material-ui/core';

import {
  updateProfile,
  getProfile,
  restartUpdateProfile
} from '../../store/actions';

import HelpIcon from '@material-ui/icons/Help';
import GetAppIcon from '@material-ui/icons/GetApp';

import FormStudent from './formStudent';
import FormProfessor from './formProfessor';

import MainError from '../components/MainError/mainError';
import FileSubmit from '../components/FileSubmit/fileSubmit';
import SubmitButton from '../components/SubmitButton/submitButton';


const host_api = process.env.REACT_APP_URL_API;

class PersonalInfos extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      ira: '',
      matricula: '',
      user: '',

      uploadLoadingScreen: false,
      isUploadDialogOpen: false,
      isUploadFileLoading: false,
      file: undefined,
      isFileSubmit: false,
      fileName: '',
      isViewDialogOpen: false,
      isConfirmFileSubmit: false, 

      mainError: "",
      inputErrors: {}
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleClickDownloadActualFileUpload = this.handleClickDownloadActualFileUpload.bind(this);
    this.handleClickOpenUploadDialog = this.handleClickOpenUploadDialog.bind(this);
    this.handleCloseUploadDialog = this.handleCloseUploadDialog.bind(this);
    this.handleUploadFile = this.handleUploadFile.bind(this);
    this.handleDeleteFileUpload = this.handleDeleteFileUpload.bind(this);
    this.handleConfirmUploadDialog = this.handleConfirmUploadDialog.bind(this);
    this.handleClickViewFileUpload = this.handleClickViewFileUpload.bind(this);
    this.handleCloseViewFileUpload = this.handleCloseViewFileUpload.bind(this);
    this.onPressSubmitName = this.onPressSubmitName.bind(this);
    this.onPressSubmitEmail = this.onPressSubmitEmail.bind(this);
    this.handleClickConfirmFileChange = this.handleClickConfirmFileChange.bind(this);
  }

  componentDidMount() {
    axios.post(
      host_api + '/get_student/',
      {
        token: this.props.token
      },
    ).then(response => {
      this.props.getProfile(this.props.token);

      const pdf_name = response.data.pdf_url.split(".com/")[1]

      if (this.props.profileData) {
        console.log(this.props.profileData.is_professor);
        this.setState({
          user: this.props.profileData.is_professor,
          pdf_name: pdf_name,
          pdf_url: response.data.pdf_url,
          name: this.props.profileData.name,
          email: this.props.profileData.user.email,
          matricula: response.data.matricula,
          ira: response.data.ira
        });
      }

    }).catch(error => {
      console.log(error);

      this.props.getProfile(this.props.token);

      if (this.props.profileData){
        if (this.props.profileData.is_professor){
          this.setState({
            user: this.props.profileData.is_professor,
            name: this.props.profileData.name,
            email: this.props.profileData.user.email,
          });
        } else {
            this.setState({
              mainError: "Erro! Verifique sua conexão com a internet e tente novamente mais tarde."
            });
        }
      }
      
      });
    }

  componentDidUpdate() {
    if (this.props.requisitionError !== undefined) {
      this.props.restartUpdateProfile();

      if (this.props.requisitionError === "Error: Network Error") {

        this.setState({
          mainError: "Erro! Verifique sua conexão com a internet e tente novamente mais tarde."
        });

      } else {
        let inputErrors = {}
        if (this.props.requisitionError.data.name) {
          inputErrors['name'] = this.props.requisitionError.data.name
        }
        if (this.props.requisitionError.data.email) {
          inputErrors['email'] = this.props.requisitionError.data.email
        }
        if (this.props.requisitionError.data.password1) {

          inputErrors['password'] = "Escolha uma senha mais segura."

          let passwordError = this.props.requisitionError.data.password1
          if (passwordError.length === 2) {
            if (passwordError[1] === "Esta senha é inteiramente numérica.") {
              inputErrors['password'] += "Não utilize somente números na sua senha."
            } else {
              inputErrors['password'] += " " + passwordError[1]
            }
          }
        }

        this.setState({
          inputErrors: inputErrors
        })
      }
    }
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleClickDownloadActualFileUpload(){
    window.open(this.state.pdf_url, '_blank');
  }

  handleClickOpenUploadDialog() {
    this.setState({ isUploadDialogOpen: true });
  }

  handleCloseUploadDialog() {
    this.setState({ isUploadDialogOpen: false });
  }

  handleUploadFile(files) {
    this.setState({ isUploadFileLoading: true });

    // console.log(this.state.fileUploadAttempt);
    // console.log(files);
        
    const file = files[0]

    // console.log(files)
    // console.log(file.size)

    clearTimeout();
    setTimeout(
      function () {
        // console.log(file.name)
                
        if (file.size > 1000000){
          this.setState({
            errorFileUpload: "O arquivo enviado excedeu o tamanho limite. Por favor, envie um arquivo de até 1 MB.",
            isUploadFileLoading: false,
          });
        } else {
          this.setState({ 
            file: file,
            errorFileUpload: "",
            isFileSubmit: true,
            fileName: file.name,
            isUploadFileLoading: false,
          });
        }

      }.bind(this),
        1000
    );
  }

  handleDeleteFileUpload() {
    this.setState({
        file: undefined,
        isFileSubmit: false,
        isConfirmFileSubmit: false,
        fileName: '',
    });
  }

  handleConfirmUploadDialog() {
    this.setState({ isConfirmFileSubmit: true, isUploadDialogOpen: false });
  }

  handleClickViewFileUpload() {
    this.setState({ isViewDialogOpen: true });
  }

  handleCloseViewFileUpload() {
    this.setState({ isViewDialogOpen: false });
  }

  onPressSubmitName() {
    const {
      name
    } = this.state;

    let inputErrors = {};
    let f_errorName = false;

    this.setState({ mainError: "" });

    if (!name) {
      inputErrors['name'] = "Digite o nome";
      f_errorName = true;
    }

    this.setState({ inputErrors: inputErrors });

    if (!f_errorName) {
      this.props.updateProfile({ token: this.props.token, name });
    }
  }

  onPressSubmitEmail() {
    const {
      email
    } = this.state;

    let inputErrors = {};
    let f_errorEmail = false;

    this.setState({ mainError: "" });

    if (!email) {
      inputErrors['email'] = "Digite o email";
      f_errorEmail = true;
    } else if (!email.includes("@")) {
      inputErrors['email'] = "Digite um e-mail válido";
      f_errorEmail = true;
    }

    this.setState({ inputErrors: inputErrors });

    if (!f_errorEmail) {
      this.props.updateProfile({ token: this.props.token, email });
    }

  }

  handleClickConfirmFileChange() {
    this.setState({ uploadLoadingScreen: true });

    const formData = new FormData();

    formData.append("file", this.state.file);
    formData.append("UPLOADCARE_PUB_KEY", "2283d78f30fdf4fec719");
    formData.append("UPLOADCARE_STORE", "1");
    
    axios.post(
        "https://upload.uploadcare.com/base/",
        formData
    ).then(response => {
        // console.log("Uploadcare", response);

        const file_id = response.data.file;
        const file_url = "https://ucarecdn.com/" + file_id + "/" + this.state.file.name

        //console.log(file_url);

        axios.post(
          host_api + '/set_student/',
          {
            token: this.props.token,
            pdf_url: file_url
          }
        ).then(response => {
          console.log("set_student", response);
          window.location.reload()         
        }).catch(error => {
          if(error.response.data.error === "PDF Invalido"){
            this.setState({
              mainError: "Erro! Envie um histórico escolar válido.",
              uploadLoadingScreen: false
            });
          } else {
            this.setState({
              mainError: "Erro! Verifique sua conexão com a internet e tente novamente mais tarde.",
              uploadLoadingScreen: false
            });
          }
        });

    }).catch(error => {
        console.log("Uploadcare", error);
        
        clearTimeout();
        setTimeout(
            function () {
                
                this.setState({
                    mainError: "Erro! Verifique sua conexão com a internet e tente novamente mais tarde.",
                    uploadLoadingScreen: false
                });

            }.bind(this),
            1000
        );
    });
  }

  buttonConfirmFileChange() {
    if (this.state.isConfirmFileSubmit && !this.state.uploadLoadingScreen){
      return (
        <Button
          variant="contained"
          size="large"
          color="primary"
          style={{width: "86%", marginTop: "2%", marginRight: "8%", marginLeft: "8%"}}
          onClick={this.handleClickConfirmFileChange}
        >
          Confirmar Alteração de Documento
        </Button>
      );
    } else if (this.state.uploadLoadingScreen) {
      return (
        <div style={{textAlign:"center", marginTop: "2%", marginBottom: "2%"}}>
          <CircularProgress color="secondary" />
        </div>
      );
    } else {
      return <div></div>
    }
  }

  formInfos() {
    if (this.state.user === true) {
      return (
        <Grid container justify="center">
          <FormProfessor
            stateParent={this.state}
            onChange={this.handleChange}
            onSubmitName={this.onPressSubmitName}
            onSubmitEmail={this.onPressSubmitEmail}
          />
        </Grid >
      );
    } else if (this.state.user === false) {
      return (
        <Grid container justify="center" >
          <Grid item xs={12} sm={6}>
            <div style={{marginTop: "2%", marginBottom: "1%", marginLeft: "8%", marginRight:"8%"}}>
              <b style={{color:"#267cc1"}}>Histórico Escolar Atual</b>
              <Typography style={{ display:"flex" }}>
                <b>{this.state.pdf_name}</b>
                <IconButton>
                  <GetAppIcon
                    style={{color: "#5e1dad", marginLeft:"3%"}}
                    onClick={ this.handleClickDownloadActualFileUpload }
                  />
                </IconButton>
              </Typography>
            </div>
            <FileSubmit
              label={"Atualizar Histórico Escolar"}
              isConfirmFileSubmit={this.state.isConfirmFileSubmit}
              onButtonUploadClick={this.handleClickOpenUploadDialog}
              isUploadDialogOpen={this.state.isUploadDialogOpen}
              onCloseUploadDialog={this.handleCloseUploadDialog}
              onFileUpload={this.handleUploadFile}
              isUploadFileLoading={this.state.isUploadFileLoading}
              isFileSubmit={this.state.isFileSubmit}
              error={this.state.errorFileUpload}
              fileName={this.state.fileName}
              onClickDeleteFileUpload={this.handleDeleteFileUpload}
              onClickConfirmUploadDialog={this.handleConfirmUploadDialog}
              onClickViewFileUpload={this.handleClickViewFileUpload}
              isViewDialogOpen={this.state.isViewDialogOpen}
              onCloseViewFileUpload={this.handleCloseViewFileUpload}
              file={this.state.file}
            />
            { this.buttonConfirmFileChange() }
            <Link href={host_api + "/password_reset/"}>
              <SubmitButton titleButton="Alterar Senha"
                buttonColor="secondary"
              />
            </Link>
          </Grid>
          <FormStudent
            stateParent={this.state}
            onChange={this.handleChange}
            setStatusFileSubmit={this.setStatusFileSubmit}
            setFileSubmit={this.setFileSubmit}
            onSubmitName={this.onPressSubmitName}
            onSubmitEmail={this.onPressSubmitEmail}
          />
        </Grid >
      );
    } else {
      return <div></div>
    }
  }

  render() {
    const { classes } = this.props
    const {
      mainError
    } = this.state;
    return (

      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Grid container style={{ justifyContent: "center", alignItems: "center", height: "90vh" }}>
          <Typography component='div' style={{ width: "92%", marginTop: "1%", marginBottom: "1%", backgroundColor: "#ffffff", minHeight: "85%" }}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Container component="div" className={classes.container}>
                  <Typography
                    variant="h5" align="center"
                    className={classes.title}>
                    Suas Informações - {this.state.user ? "Professor" : "Aluno"}
                  </Typography>
                  <Divider className={classes.divider} />
                  <Box className={classes.boxHelpLabel}>
                    <Typography
                      variant="subtitle1"
                      className={classes.helpLabel}
                    >
                      <HelpIcon style={{ paddingRight: '5px' }} />
                      As Informações aqui presentes não estão disponíveis para
                      a visualização dos alunos, exceto o nome
                      </Typography>
                    <Box className={classes.mainErrorBox}>
                      <MainError error={mainError} />
                    </Box>
                  </Box>
                  {this.formInfos()}
                </Container>
              </Grid>
            </Grid>
          </Typography>
        </Grid>
      </MuiThemeProvider>

    );
  }
}

const theme = createMuiTheme({
  palette: {
    background: {
      default: "#ffffff"
    },
    primary: {
      main: "#42a0ed",
      contrastText: "white"
    },
    secondary: {
      main: "#267cc1"
    }
  }
})

PersonalInfos.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

const styles = theme => ({
  root: {
    backgroundColor: '#42a0ed',
    height: '85vh',
    paddingTop: theme.spacing(3),
  },
  container: {
    paddingTop: theme.spacing(2),
    backgroundColor: '#fff',
    height: '80%',
    paddingBottom: 20,
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
  mainErrorBox: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%'
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

function mapStateToProps(state) {
  return {
    isAuthenticated: state.authentication.isAuthenticated,
    token: state.authentication.token,
    requisitionError: state.userProfile.requisitionError,
    profileData: state.userProfile.profileData
  }
}

export const personalInfosContainer = connect(
  mapStateToProps,
  { updateProfile, getProfile, restartUpdateProfile },
)(withStyles(styles, { withTheme: true })(PersonalInfos));

export default personalInfosContainer;