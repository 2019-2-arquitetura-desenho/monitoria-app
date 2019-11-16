import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
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
    '&$cssFocused $notchedOutline': {
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
  }

  handleChange = (event) => {
    const { onChange } = this.props;
    this.setState({
      ['value']: event.target.value,
    });
    onChange(this.state.value);
  };

  render() {
    const { classes, onPress } = this.props;
    let icon = <SearchIcon fill="#42a0ed" width="20" height="20" onClick={onPress} />;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="input-search"
          placeholder="Insira o nome ou código da disciplina"
          className={classes.textField}
          value={this.state.value}
          onChange={this.handleChange}
          margin="normal"
          variant="outlined"
          InputProps={{
            classes: {
              root: classes.cssOutlinedInput,
              focused: classes.cssFocused,
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
