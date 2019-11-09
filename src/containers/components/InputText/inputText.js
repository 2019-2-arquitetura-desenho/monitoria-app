import React from 'react';

import {
  InputAdornment,
  IconButton,
  withStyles,
  TextField
} from '@material-ui/core';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Visibility from '@material-ui/icons/Visibility';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';



class InputText extends React.Component {
  render() {
    const {
      id, type, label, value, onChange, valueVisibility,
      onClickShow, onMouseDown, error
    } = this.props;

    let inputProps = ""

    if (id === "name") {
      inputProps = {
        startAdornment: (
          <InputAdornment position="start">
            <AccountCircleIcon
              style={styles.iconTextField}
            />
          </InputAdornment>
        )
      }
    } else if (id === "email") {
      inputProps = {
        startAdornment: (
          <InputAdornment position="start">
            <EmailIcon
              style={styles.iconTextField}
            />
          </InputAdornment>
        )
      }
    } else if (id === "password") {
      inputProps = {
        startAdornment: (
          <InputAdornment position="start">
            <LockIcon
              style={styles.iconTextField}
            />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              edge="end"
              aria-label="toggle password visibility"
              onClick={onClickShow}
              onMouseDown={onMouseDown}
            >
              {valueVisibility ?
                <VisibilityOff /> : <Visibility />
              }
            </IconButton>
          </InputAdornment>
        )
      }
    } else if (id === "confirmPassword") {
      inputProps = {
        startAdornment: (
          <InputAdornment position="start">
            <LockIcon style={styles.iconTextField} />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              edge="end"
              aria-label="toggle confirmPassword visibility"
              onClick={onClickShow}
              onMouseDown={onMouseDown}
            >
              {valueVisibility ?
                <VisibilityOff /> : <Visibility />
              }
            </IconButton>
          </InputAdornment>
        )
      }
    } else if (id === "ira") {
      inputProps = {
        startAdornment: (
          <InputAdornment position="start">
            <AssignmentIcon
              style={styles.iconTextField}
            />
          </InputAdornment>
        )
      }
    }
    else if (id === "registration") {
      inputProps = {
        startAdornment: (
          <InputAdornment position="start">
            <AssignmentIndIcon
              style={styles.iconTextField}
            />
          </InputAdornment>
        )
      }
    }

    return (
      <CssTextField
        id={id}
        style={styles.textField}
        variant="outlined"
        type={type}
        label={label}
        value={value}
        onChange={onChange}
        InputProps={inputProps}
        error={error ? true : false}
        helperText={error}
      />
    );
  }
}

const styles = {
  textField: {
    marginTop: "2%",
    marginBottom: "2%",
    marginLeft: "8%",
    marginRight: "8%",
    width: "86%"
  },
  iconTextField: {
    color: "#267cc1"
  }
}

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#267cc1"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#267cc1"
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#267cc1"
      },
      "&:hover fieldset": {
        borderColor: "#141414"
      },
      "&.Mui-focused fieldset": {
        borderColor: "#267cc1"
      }
    }
  }
})(TextField)

export default InputText;
