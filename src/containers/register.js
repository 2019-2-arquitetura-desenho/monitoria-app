import React from 'react';

import { 
    createMuiTheme,
    MuiThemeProvider,
    CssBaseline, 
    Container,
    Typography,
} from '@material-ui/core';


class Register extends React.Component {
    render() {
        return (
            <MuiThemeProvider theme={ theme }>
                <CssBaseline />
                <Container maxWidth="false" style={ styles.container }>
                    <Typography component="div" style={ styles.content }>
                    </Typography>
                </Container>
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
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        // minHeight: "500px"
    },
    content: {
        height: "85%",
        width: "95%",
        display: "flex", 
        backgroundColor: "#ffffff"
    },
}

export default Register;
