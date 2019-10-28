import React from 'react';

import { 
    createMuiTheme,
    MuiThemeProvider,
    CssBaseline, 
    Typography,
    Grid,
    Box
} from '@material-ui/core';


class Register extends React.Component {
    render() {
        return (
            <MuiThemeProvider theme={ theme }>
                <CssBaseline />
                <Grid container style={ styles.screenBackground }>
                    <Typography component="div" style={ styles.screenContent }>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Typography variant="h2" style={ styles.mainTitle }>
                                    Criar Conta
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
        display: "flex", 
        backgroundColor: "#ffffff"
    },
    mainTitle: {
        marginTop: "3%",
        marginBottom: "3%",
        textAlign: "center",
        color: "#267cc1",
        fontWeight: "bold",
        // fontFamily: "fontFamily"
    }
}

export default Register;
