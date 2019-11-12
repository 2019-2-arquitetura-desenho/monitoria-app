import React from 'react';

import { Button } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#fff",
      contrastText: "#42a0ed"
    }
  },
  shadows: ["none"]
})

const UpdateButton = (props) => {
  const {
    onClickSubmitButton, titleButton
  } = props

  return (
    <MuiThemeProvider theme={theme}>
      <Button style={{ backgroundColor: 'transparent' }}
        variant="contained"
        color="primary"
        size="large"
        onClick={onClickSubmitButton}
      >
        {titleButton}
      </Button>
    </MuiThemeProvider>
  )
}


/*const styles = {
  buttonStyle: {
    width: "86%",
    marginTop: "4%",
    marginLeft: "8%",
    marginRight: "8%",
    marginBottom: "4%",
    fontWeight: "bold"
  }
}
*/
export default UpdateButton;