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


class Register extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            name: '',
            email: '',

            password: '',
            showPassword: false,
            confirmPassword: '',
            showConfirmPassword: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
        this.handleMouseDownPassword = this.handleMouseDownPassword.bind(this);
        this.handleClickShowConfirmPassword = this.handleClickShowConfirmPassword.bind(this);
        this.handleMouseDownConfirmPassword = this.handleMouseDownConfirmPassword.bind(this);
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

    render() {
        const { name, email, password, showPassword, confirmPassword, showConfirmPassword} = this.state;

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
                                />
                                <InputText
                                    id="email"
                                    type="email"
                                    label="Email*"
                                    value={ email }
                                    onChange={ this.handleChange }
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
            default: "#42a0ed",
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
        height: "85%",
        width: "92%",
        backgroundColor: "#ffffff"
    }
}

export default Register;
