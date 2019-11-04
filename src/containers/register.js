import React from 'react';

import { 
    createMuiTheme,
    MuiThemeProvider,
    CssBaseline, 
    Grid,
    Typography
} from '@material-ui/core';

import MainTitle from './components/MainTitle/mainTitle';
import InputText from './components/InputText/inputText';
import FileSubmit from './components/FileSubmit/fileSubmit';
import SubmitButton from './components/SubmitButton/submitButton';


class Register extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            loading: false,

            name: '',
            email: '',

            password: '',
            showPassword: false,
            confirmPassword: '',
            showConfirmPassword: false,

            isUploadDialogOpen: false,
            isFileSubmit: false,
            fileSubmit: [],

            inputErrors: {},
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
        this.handleMouseDownPassword = this.handleMouseDownPassword.bind(this);
        this.handleClickShowConfirmPassword = this.handleClickShowConfirmPassword.bind(this);
        this.handleMouseDownConfirmPassword = this.handleMouseDownConfirmPassword.bind(this);
        this.handleClickOpenUploadDialog = this.handleClickOpenUploadDialog.bind(this);
        this.handleCloseUploadDialog = this.handleCloseUploadDialog.bind(this);
        this.onUpdateFileUploadDialog = this.onUpdateFileDialog.bind(this);
        this.handleCancelUploadDialog = this.handleCancelUploadDialog.bind(this);
        this.handleConfirmUploadDialog = this.handleConfirmUploadDialog.bind(this);
        this.onUpdateFileUploadScreen = this.onUpdateFileUploadScreen.bind(this);
        this.onPressSubmit = this.onPressSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value });
    }

    handleClickShowPassword() {
        this.setState({ showPassword: !this.state.showPassword });
    }

    handleMouseDownPassword(event) {
        event.preventDefault();
    }

    handleClickShowConfirmPassword() {
        this.setState({ showConfirmPassword: !this.state.showConfirmPassword });
    }

    handleMouseDownConfirmPassword(event) {
        event.preventDefault();
    }

    handleClickOpenUploadDialog() {
        this.setState({ isUploadDialogOpen: true });
    }

    handleCloseUploadDialog() {
        this.setState({ isUploadDialogOpen: false });
    }

    onUpdateFileDialog(fileItems) {
        this.setState({ fileSubmit: fileItems.map(fileItem => fileItem.file) })
    }

    handleCancelUploadDialog() {
        this.setState({ isUploadDialogOpen: false })
    }

    handleConfirmUploadDialog() {
        if (this.state.fileSubmit === undefined){
            this.setState({ isUploadDialogOpen: false });
        } else if (this.state.fileSubmit === 0){
            this.setState({ isUploadDialogOpen: false })
        } else {
            this.setState({ isUploadDialogOpen: false, isFileSubmit: true });
        }
    }

    onUpdateFileUploadScreen(fileItems) {
        if (this.state.fileSubmit.length !== fileItems.map(fileItem => fileItem.file).length){
            this.setState({ fileSubmit: fileItems.map(fileItem => fileItem.file) })
        }
    }

    onPressSubmit() {
        var inputErrors = {}

        let f_errorName = false
        let f_errorEmail = false
        let f_errorPassword = false
        let f_errorConfirmPassword = false
        
        let name = this.state.name
        let email = this.state.email
        let password = this.state.password
        let confirmPassword = this.state.confirmPassword

        if(!name){
            inputErrors['name'] = "Digite o nome";
            f_errorName = true;
        }

        if (!email){
            inputErrors['email'] = "Digite o email";
            f_errorEmail = true;
          } else if (!email.includes("@") || !email.includes(".com")) {
            inputErrors['email'] = "Digite um e-mail válido";
            f_errorEmail = true;
          }
      
          if (!password){
            inputErrors['password'] = "Digite uma senha";
            f_errorPassword = true;
          } else {
            if (password.length < 8){
              inputErrors['password'] = "Use 8 caracteres ou mais para a sua senha";
              f_errorPassword = true;
            } else if (password.length > 16){
              inputErrors['password'] = "Use 16 caracteres ou menos para a sua senha";
              f_errorPassword = true;
            }
          }

          if(!f_errorPassword){
            if(!confirmPassword){
              inputErrors['confirmPassword'] = "Confirme sua senha";
              f_errorConfirmPassword = true;
            } else if (password !== confirmPassword){
              inputErrors['confirmPassword'] = "As senhas não coincidem";
              f_errorConfirmPassword = true;
            }
          }

          this.setState({ inputErrors: inputErrors })
   
        if (!f_errorName && !f_errorEmail && !f_errorPassword && !f_errorConfirmPassword){
            // enviar requisição de registro
      
            this.setState({ loading: true });
          }
    }


    render() {
        const { 
            name, email, password, showPassword, confirmPassword, showConfirmPassword,
            fileSubmit, isFileSubmit, isUploadDialogOpen, inputErrors
        } = this.state;

        return (
            <MuiThemeProvider theme={ theme }>
                <CssBaseline />
                <Grid container style={ styles.screenBackground }>
                    <Typography component="div" style={ styles.screenContent }>
                        <Grid container spacing={1}>
                            <MainTitle title="Criar Conta"/>
                            <Grid item xs={12} sm={6}>
                                <InputText
                                    id="name"
                                    type="text"
                                    label="Nome*"
                                    value={ name }
                                    onChange={ this.handleChange }
                                    error={ inputErrors.name }
                                />
                                <InputText
                                    id="email"
                                    type="email"
                                    label="Email*"
                                    value={ email }
                                    onChange={ this.handleChange }
                                    error={ inputErrors.email }
                                />
                                <InputText
                                    id="password"
                                    type={ showPassword ? "text" : "password" }
                                    label="Senha*"
                                    value={ password }
                                    onChange={ this.handleChange }
                                    onClickShow={ this.handleClickShowPassword }
                                    onMouseDown={ this.handleMouseDownPassword }
                                    valueVisibility={ showPassword }
                                    error={ inputErrors.password }
                                />
                                <InputText
                                    id="confirmPassword"
                                    type={ showConfirmPassword ? "text" : "password" }
                                    label="Confirmar Senha*"
                                    value={ confirmPassword }
                                    onChange={ this.handleChange }
                                    onClickShow={ this.handleClickShowConfirmPassword }
                                    onMouseDown={ this.handleMouseDownConfirmPassword }
                                    valueVisibility={ showConfirmPassword }
                                    error={ inputErrors.confirmPassword }
                                />
                                <FileSubmit 
                                    isFileSubmit={ isFileSubmit }
                                    fileSubmit={ fileSubmit }
                                    onButtonUploadClick={ this.handleClickOpenUploadDialog }
                                    isUploadDialogOpen={ isUploadDialogOpen }
                                    onCloseUploadDialog={ this.handleCloseUploadDialog }
                                    onUpdateFileUploadDialog={ this.onUpdateFileUploadDialog }
                                    onClickCancelUploadDialog={ this.handleCancelUploadDialog }
                                    onClickConfirmUploadDialog={ this.handleConfirmUploadDialog }
                                    onUpdateFileUploadScreen={ this.onUpdateFileUploadScreen }    
                                />
                                <SubmitButton 
                                    titleButton="Criar Conta"
                                    onClickSubmitButton={ this.onPressSubmit }
                                />
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
            default: "#42a0ed"
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

const styles = {
    screenBackground: {
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        // minHeight: "500px"
    },
    screenContent: {
        width: "92%",
        marginTop: "3%",
        marginBottom: "3%",
        backgroundColor: "#ffffff"
    }
}

export default Register;
