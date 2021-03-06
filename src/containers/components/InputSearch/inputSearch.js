import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { ReactComponent as SearchIcon } from '../../assets/search.svg';


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "100%",
  },

  cssOutlinedInput: {
    '&$notchedOutline': {
      borderColor: `${theme.palette.primary.main} !important`,
    }
  },

  notchedOutline: {
    borderWidth: '1px',
    borderColor: '#42a0ed !important'
  },
  inputText: {
    height: 5,
    '&::placeholder': {
      textOverflow: 'ellipsis !important',
      color: '#267cc1'
    }
  },
  iconTextField: {
    color: "#267cc1"
  }

});

class InputSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.keyPress = this.keyPress.bind(this);
  }

  handleChange = (event) => {
    const { onChange } = this.props;

    this.setState({
      value: event.target.value,
    });
    onChange(event.target.value);
  };

  keyPress(event) {
    const { onPress } = this.props
    if (event.key === "Enter") {
      event.preventDefault();
      onPress();
    }
  }

  render() {
    const { classes } = this.props;
    let icon = <SearchIcon fill="#42a0ed" width="20" height="20" />;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="input-search"
          placeholder="Insira o nome ou código da disciplina"
          className={classes.textField}
          value={this.state.value}
          onKeyDown={this.keyPress}
          onChange={this.handleChange}
          margin="normal"
          variant="outlined"
          InputProps={{
            classes: {
              root: classes.cssOutlinedInput,
              notchedOutline: classes.notchedOutline,
              input: classes.inputText,
            },
            startAdornment: icon,
          }}
        />
      </form>
    );
  }
}

InputSearch.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InputSearch);
