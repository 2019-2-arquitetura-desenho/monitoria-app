import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { createMuiTheme, MuiThemeProvider, CssBaseline, Grid, CircularProgress, Typography, Box } from '@material-ui/core';

import { register, restartRegister } from '../store/actions';

import doubtIcon from './assets/doubtIcon.svg';

import MainTitle from './components/MainTitle/mainTitle';
import InputText from './components/InputText/inputText';
import FileSubmit from './components/FileSubmit/fileSubmit';
import SubmitButton from './components/SubmitButton/submitButton';
import MainError from './components/MainError/mainError';


class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isRegisterLoading: false,

            name: '',
            email: '',

            password: '',
            showPassword: false,
            confirmPassword: '',
            showConfirmPassword: false,
            
            isUploadDialogOpen: false,
            isUploadFileLoading: false,
            file: undefined,
            isFileSubmit: false,
            fileName: '',
            isViewDialogOpen: false,

            fileDeleteToken: '',
            isConfirmFileSubmit: false,

            mainError: '',
            inputErrors: {},
            errorFileUpload: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
        this.handleMouseDownPassword = this.handleMouseDownPassword.bind(this);
        this.handleClickShowConfirmPassword = this.handleClickShowConfirmPassword.bind(this);
        this.handleMouseDownConfirmPassword = this.handleMouseDownConfirmPassword.bind(this);
        this.handleClickOpenUploadDialog = this.handleClickOpenUploadDialog.bind(this);
        this.handleCloseUploadDialog = this.handleCloseUploadDialog.bind(this);
        this.handleUploadFile = this.handleUploadFile.bind(this);
        this.handleDeleteFileUpload = this.handleDeleteFileUpload.bind(this);
        this.handleConfirmUploadDialog = this.handleConfirmUploadDialog.bind(this);
        this.handleClickViewFileUpload = this.handleClickViewFileUpload.bind(this);
        this.handleCloseViewFileUpload = this.handleCloseViewFileUpload.bind(this);

        this.onPressSubmit = this.onPressSubmit.bind(this);
    }

    componentDidUpdate() {
        if (this.props.requisitionError !== undefined && this.state.isRegisterLoading === true) {
            this.props.restartRegister();

            if (this.props.requisitionError === "Error: Network Error") {

                this.setState({
                    mainError: "Erro! Verifique sua conexão com a internet e tente novamente mais tarde.",
                    isRegisterLoading: false
                });
            } else {
                let f_inputErrors = 0;
                let inputErrors = {}
                let mainError = ''

                if (this.props.requisitionError.data.name) {
                    inputErrors['name'] = this.props.requisitionError.data.name
                    f_inputErrors = 1
                }
                if (this.props.requisitionError.data.email) {
                    inputErrors['email'] = this.props.requisitionError.data.email
                    f_inputErrors = 1
                }
                if (this.props.requisitionError.data.password1) {

                    inputErrors['password'] = "Escolha uma senha mais segura."

                    let passwordError = this.props.requisitionError.data.password1
                    if (passwordError.length === 2) {
                        if (passwordError[1] === "Esta senha é inteiramente numérica.") {
                            inputErrors['password'] += " Não utilize somente números na sua senha."
                        } else {
                            inputErrors['password'] += " " + passwordError[1]
                        }
                    }

                    f_inputErrors = 1
                }
                if (this.props.requisitionError.data.error === "PDF Invalido"){
                    mainError = "Erro! Envie um histórico escolar válido."
                }

                if (mainError === '' && f_inputErrors === 0){
                    this.setState({ mainError: 'Erro! Tente novamente.', isRegisterLoading: false });
                } else {
                    this.setState({ mainError: mainError, inputErrors: inputErrors, isRegisterLoading: false });
                }
            }
        }

        if (this.props.isAuthenticated === true) {
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

    onPressSubmit() {
        var inputErrors = {};
        var mainError = '';

        let f_errorName = false;
        let f_errorEmail = false;
        let f_errorPassword = false;
        let f_errorConfirmPassword = false;
        let f_errorFile = false

        let name = this.state.name;
        let email = this.state.email;
        let password = this.state.password;
        let confirmPassword = this.state.confirmPassword;
        let file = this.state.file;

        if (!name) {
            inputErrors['name'] = "Digite o nome";
            f_errorName = true;
        }

        if (!email) {
            inputErrors['email'] = "Digite o email";
            f_errorEmail = true;
        } else if (!email.includes("@")) {
            inputErrors['email'] = "Digite um e-mail válido";
            f_errorEmail = true;
        }

        if (!password) {
            inputErrors['password'] = "Digite uma senha";
            f_errorPassword = true;
        } else {
            if (password.length < 8) {
                inputErrors['password'] = "Use 8 caracteres ou mais para a sua senha";
                f_errorPassword = true;
            } else if (password.length > 16) {
                inputErrors['password'] = "Use 16 caracteres ou menos para a sua senha";
                f_errorPassword = true;
            }
        }

        if (!f_errorPassword) {
            if (!confirmPassword) {
                inputErrors['confirmPassword'] = "Confirme sua senha";
                f_errorConfirmPassword = true;
            } else if (password !== confirmPassword) {
                inputErrors['confirmPassword'] = "As senhas não coincidem";
                f_errorConfirmPassword = true;
            }
        }

        if (!file){
            mainError = "Adicione o seu histórico escolar universitário.";
            f_errorFile = true;
        }

        this.setState({ mainError: mainError, inputErrors: inputErrors });


        if (!f_errorName && !f_errorEmail && !f_errorPassword && !f_errorConfirmPassword && !f_errorFile) {
            this.setState({ isRegisterLoading: true, mainError: "" });

            // Uploadcare File Upload

            const formData = new FormData();

            formData.append("file", file);
            formData.append("UPLOADCARE_PUB_KEY", "2283d78f30fdf4fec719");
            formData.append("UPLOADCARE_STORE", "1");
            
            axios.post(
                "https://upload.uploadcare.com/base/",
                formData
            ).then(response => {
                // console.log("Uploadcare", response);

                const file_id = response.data.file;
                const file_url = "https://ucarecdn.com/" + file_id + "/" + file.name

                //console.log(file_url);
                
                this.props.register(name, email, password, file_url)

            }).catch(error => {
                console.log("Uploadcare", error);
                
                clearTimeout();
                setTimeout(
                    function () {
                        
                        this.setState({
                            mainError: "Erro! Verifique sua conexão com a internet e tente novamente mais tarde.",
                            isRegisterLoading: false
                        });

                    }.bind(this),
                    1000
                );
            });


            // Cloudinary File Upload

            // const formData = new FormData();
        
            // console.log("submit", file);
    
            // formData.append("file", file);
            // formData.append("tags", 'histórico escolar');
            // formData.append("upload_preset", "fuuwagxl");
            // formData.append("api_key", "845594749864499");
            // formData.append("timestamp", (Date.now() / 1000) | 0);
    
            // axios.post(
            //     "https://api.cloudinary.com/v1_1/dstgmoevd/auto/upload/",
            //     formData,
            //     {
            //         headers: {
            //             "X-Requested-With": "XMLHttpRequest"
            //         }    
            //     }
            // ).then(response => {
            //     // console.log(response);

            //    this.props.register(name, email, password, response.data.secure_url)

            // }).catch(error => {
            //     console.log("Error Upload File", error);

            //     this.setState({
            //         mainError: "Erro! Verifique sua conexão com a internet e tente novamente mais tarde.",
            //         isRegisterLoading: false
            //    });
            // });
        }
    }

    registerForm() {
        const {
            isRegisterLoading, mainError, name, inputErrors, email, showPassword, password, showConfirmPassword,
            confirmPassword, isConfirmFileSubmit, isUploadDialogOpen, isUploadFileLoading, isFileSubmit, errorFileUpload,
            fileName, isViewDialogOpen, file 
        } = this.state;

        if (isRegisterLoading) {
            return (
                <Grid item xs={12} sm={6}>
                    <div style={styles.progress}>
                        <CircularProgress color="secondary" />
                    </div>
                </Grid>
            );
        } else {
            return (
                <Grid item xs={12} sm={6}>
                    <MainError error={mainError} />
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
                        id="password"
                        type={showPassword ? "text" : "password"}
                        label="Senha*"
                        value={password}
                        onChange={this.handleChange}
                        onClickShow={this.handleClickShowPassword}
                        onMouseDown={this.handleMouseDownPassword}
                        valueVisibility={showPassword}
                        error={inputErrors.password}
                    />
                    <InputText
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        label="Confirmar Senha*"
                        value={confirmPassword}
                        onChange={this.handleChange}
                        onClickShow={this.handleClickShowConfirmPassword}
                        onMouseDown={this.handleMouseDownConfirmPassword}
                        valueVisibility={showConfirmPassword}
                        error={inputErrors.confirmPassword}
                    />
                    <FileSubmit
                        label={"Enviar Histórico Escolar"}
                        isConfirmFileSubmit={isConfirmFileSubmit}
                        onButtonUploadClick={this.handleClickOpenUploadDialog}
                        isUploadDialogOpen={isUploadDialogOpen}
                        onCloseUploadDialog={this.handleCloseUploadDialog}
                        onFileUpload={this.handleUploadFile}
                        isUploadFileLoading={isUploadFileLoading}
                        isFileSubmit={isFileSubmit}
                        error={errorFileUpload}
                        fileName={fileName}
                        onClickDeleteFileUpload={this.handleDeleteFileUpload}
                        onClickConfirmUploadDialog={this.handleConfirmUploadDialog}
                        onClickViewFileUpload={this.handleClickViewFileUpload}
                        isViewDialogOpen={isViewDialogOpen}
                        onCloseViewFileUpload={this.handleCloseViewFileUpload}
                        file={file}
                    />
                    <SubmitButton titleButton="Criar Conta" buttonColor="secondary" onClickSubmitButton={this.onPressSubmit} />
                </Grid>
            );
        }
    }

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                <Grid container style={styles.screenBackground}>
                    <Typography component="div" style={styles.screenContent}>
                        <Grid container spacing={1}>
                            <MainTitle title="Criar Conta" />
                            {this.registerForm()}
                            <Grid item xs={12} sm={6}>
                                <Typography variant="h4">
                                    <Box style={styles.boxSubTitle}>
                                        Por que nós precisamos das suas informações?
                                    </Box>
                                </Typography>
                                <Box textAlign="center">
                                    <img src={doubtIcon} alt="Doubt Icon" width="20%" height="20%" />
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

const styles = {
    screenBackground: {
        justifyContent: "center",
        alignItems: "center",
        // height: "93vh",
        // minHeight: "500px"
    },
    screenContent: {
        width: "92%",
        marginTop: "1%",
        marginBottom: "1%",
        backgroundColor: "#ffffff",
        minHeight: "85%"
    },
    boxSubTitle: {
        textAlign: "center",
        fontSize: "95%",
        color: "#267cc1",
        marginTop: "6%",
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
        marginBottom: "4%",
        fontWeight: "bold",
        // fontFamily: 'fontFamily'
    },
    progress: {
        marginTop: "25%",
        marginBottom: "25%",
        textAlign: "center",
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
    { register, restartRegister }
)(Register)

export default registerContainer;
