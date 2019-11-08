import React from 'react';
import { connect } from 'react-redux';
import { register, restartRegister } from '../store/actions';

import {
    createMuiTheme,
    MuiThemeProvider,
    CssBaseline,
    Grid,
    CircularProgress,
    Typography,
    Box
} from '@material-ui/core';

import doubtIcon from './assets/doubtIcon.svg';

import MainTitle from './components/MainTitle/mainTitle';
import InputText from './components/InputText/inputText';
import FileSubmit from './components/FileSubmit/fileSubmit';
import SubmitButton from './components/SubmitButton/submitButton';
import MainError from './components/MainError/mainError';


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

            mainError: "",
            inputErrors: {},
        };

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

    componentDidUpdate() {
        if (this.props.requisitionError !== undefined && this.state.loading===true){
            this.props.restartRegister();

            if (this.props.requisitionError === "Error: Network Error"){
                // console.log("Erro de Rede");

                this.setState({
                    mainError: "Erro! Verifique sua conexão com a internet e tente novamente mais tarde.",
                    loading: false
                });
            } else {
                // console.log("Erro relacionado aos campos de entrada de texto do formulário de cadastro");

                let inputErrors = {}
                if (this.props.requisitionError.data.name){
                    inputErrors['name'] = this.props.requisitionError.data.name
                }
                if (this.props.requisitionError.data.email){
                    inputErrors['email'] = this.props.requisitionError.data.email
                }
                if (this.props.requisitionError.data.password1){
                    // console.log(this.props.requisitionError.data.password1)
                    // console.log(this.props.requisitionError.data.password1.length)

                    inputErrors['password'] = "Escolha uma senha mais segura."

                    let passwordError = this.props.requisitionError.data.password1
                    if (passwordError.length === 2){
                        if (passwordError[1] === "Esta senha é inteiramente numérica."){
                            inputErrors['password'] += "Não utilize somente números na sua senha."
                        } else {
                            inputErrors['password'] += " " + passwordError[1]
                        }
                    }
                }

                this.setState({
                    inputErrors: inputErrors,
                    loading: false
                })
            }
        }

        if (this.props.isAuthenticated === true){
            this.props.history.push("/");
        }
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
        this.setState({ isUploadDialogOpen: false, isFileSubmit: false });
    }

    onUpdateFileDialog(fileItems) {
        this.setState({ fileSubmit: fileItems.map(fileItem => fileItem.file) });
    }

    handleCancelUploadDialog() {
        this.setState({ isUploadDialogOpen: false, isFileSubmit: false });
    }

    handleConfirmUploadDialog() {
        if (this.state.fileSubmit === undefined){
            this.setState({ isUploadDialogOpen: false });
        } else if (this.state.fileSubmit === 0){
            this.setState({ isUploadDialogOpen: false });
        } else {
            this.setState({ isUploadDialogOpen: false, isFileSubmit: true });
        }
    }

    onUpdateFileUploadScreen(fileItems) {
        if (this.state.fileSubmit.length !== fileItems.map(fileItem => fileItem.file).length){
            this.setState({ fileSubmit: fileItems.map(fileItem => fileItem.file) });
        }
    }

    onPressSubmit() {
        var inputErrors = {};

        let f_errorName = false;
        let f_errorEmail = false;
        let f_errorPassword = false;
        let f_errorConfirmPassword = false;

        let name = this.state.name;
        let email = this.state.email;
        let password = this.state.password;
        let confirmPassword = this.state.confirmPassword;

        if (!name){
            inputErrors['name'] = "Digite o nome";
            f_errorName = true;
        }

        if (!email){
            inputErrors['email'] = "Digite o email";
            f_errorEmail = true;
          } else if (!email.includes("@")) {
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

          if (!f_errorPassword){
            if (!confirmPassword){
              inputErrors['confirmPassword'] = "Confirme sua senha";
              f_errorConfirmPassword = true;
            } else if (password !== confirmPassword){
              inputErrors['confirmPassword'] = "As senhas não coincidem";
              f_errorConfirmPassword = true;
            }
          }

          this.setState({ inputErrors: inputErrors });

        if (!f_errorName && !f_errorEmail && !f_errorPassword && !f_errorConfirmPassword){
            this.setState({ loading: true, mainError: "" });

            clearTimeout();
            setTimeout(
                function(){
                    this.props.register(name, email, password, this.state.fileSubmit)
                }.bind(this),
                1000
            );
        }
    }

    registerForm() {
        const { 
            mainError, name, email, password, showPassword, confirmPassword, showConfirmPassword,
            fileSubmit, isFileSubmit, isUploadDialogOpen, inputErrors, loading
        } = this.state;

        if (loading){
            return (
                <Grid item xs={12} sm={6}>
                    <div style={ styles.progress }>
                        <CircularProgress color="secondary" />
                    </div>
                </Grid>
            );
        } else {
            return (
                <Grid item xs={12} sm={6}>
                    <MainError error={ mainError } />
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
                    <SubmitButton titleButton="Criar Conta" onClickSubmitButton={ this.onPressSubmit } />
                </Grid>
            );
        }
    }

    render() {
        return (
            <MuiThemeProvider theme={ theme }>
                <CssBaseline />
                <Grid container style={ styles.screenBackground }>
                    <Typography component="div" style={ styles.screenContent }>
                        <Grid container spacing={1}>
                            <MainTitle title="Criar Conta" />
                            { this.registerForm() }
                            <Grid item xs={12} sm={6}>
                                <Typography variant="h4">
                                    <Box style={styles.boxSubTitle}>
                                        Por que nós precisamos da suas informações?
                                    </Box>
                                </Typography>
                                <Box textAlign="center">
                                    <img src={ doubtIcon } alt ="Doubt Icon"  width="20%" height="20%" />
                                </Box>
                                <Typography variant="h5">
                                    <Box style={styles.boxText}>
                                        Para validarmos sua conta, comparamos as informações presentes no 
                                        documento enviado com as presentes no sistema da UnB.
                                    </Box>
                                </Typography>
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
    },
    boxSubTitle: {
        textAlign: "center",
        fontSize: "95%",
        color: "#267cc1",
        marginTop: "8%",
        marginLeft: "8%",
        marginRight: "8%",
        marginBottom: "4%",
        fontWeight: "bold",
        // fontFamily: 'fontFamily'
    },
    boxText: {
        textAlign: "center",
        color: "#267cc1",
        marginTop: "4%",
        marginLeft: "12%",
        marginRight: "12%",
        marginBottom: "16%",
        fontWeight: "bold",
        // fontFamily: 'fontFamily'
    },
    progress: {
        display: "flex",
        marginTop: "25%",
        marginLeft: "50%",
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.authentication.isAuthenticated,
        requisitionError: state.authentication.requisitionError
    }
}

export const registerContainer = connect(
   mapStateToProps,
   { register, restartRegister },
)(Register)

export default registerContainer;
