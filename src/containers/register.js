import React from 'react';

import { 
    createMuiTheme,
    MuiThemeProvider,
    CssBaseline 
} from '@material-ui/core';


class Register extends React.Component {
    render() {
        return (
            <MuiThemeProvider theme={ theme }>
                <CssBaseline />
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

export default Register;
