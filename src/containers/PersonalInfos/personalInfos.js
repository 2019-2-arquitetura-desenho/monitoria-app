import React from 'react';
import { connect } from 'react-redux';
import { updateProfile, getProfile } from '../../store/actions';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  Container,
  Divider,
  MuiThemeProvider,
  createMuiTheme,
  Box
} from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';
import Menu from '../components/NavigationMenu/navigationMenu';
import InputText from '../components/InputText/inputText';
import FormStudent from './formStudent';



class PersonalInfos extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      ira: '',
      matricula: '',

      isUploadDialogOpen: false,
      isFileSubmit: false,
      fileSubmit: [],

      inputErrors: {}
    }

    this.handleChange = this.handleChange.bind(this);
    this.setFileSubmit = this.setFileSubmit.bind(this);
    this.setStatusFileSubmit = this.setStatusFileSubmit.bind(this);
    // this.onPressSubmit = this.onPressSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  setFileSubmit(file) {
    this.setState({ fileSubmit: file });
    console.log("FILE: ", this.state.fileSubmit);
  }

  setStatusFileSubmit(status) {
    this.setState({ isFileSubmit: status })
  }

  componentWillMount() {
    this.props.getProfile(this.props.token);
    if (this.props.profileData) {
      this.setState({
        name: this.props.profileData.name,
        email: this.props.profileData.email,
        matricula: this.props.profileData.matricula,
        ira: this.props.profileData.ira
      })
    }
  }

  componentDidUpdate() {
  }

  componentWillUnmount() {
    console.log("Update Profile: ")
    const {
      name, email, ira, matricula
    } = this.state;
    this.props.updateProfile(this.props.token, name, email, ira, matricula);
  }

  inputsStudent() {


  }

  inputProfessor() {
    const {
      name, email, matricula, ira, inputErrors, fileSubmit, isFileSubmit,
      isUploadDialogOpen,
    } = this.state;
    const { classes } = this.props;
    return (
      <Grid item xs={12} sm={10} >
        <Grid>
          <InputText
            id="name"
            type="text"
            label="Nome*"
            value={name ? name : "Sem Nome"}
            onChange={this.handleChange}
            error={inputErrors.name}
          />
          <InputText
            id="email"
            type="email"
            label="Email*"
            value={email ? email : "Sem e-mail"}
            onChange={this.handleChange}
            error={inputErrors.email}
          />
        </Grid>
      </Grid>
    );
  }

  formInfos() {
    const { profileData } = this.props;
    if (profileData.user.is_superuser) {
      return (
        <Grid container justify="center"  >
          {this.inputProfessor()}
        </Grid >
      );
    } else {
      return (
        <Grid container justify="center"  >
          <FormStudent
            stateParent={this.state}
            onChange={this.handleChange}
            setStatusFileSubmit={this.setStatusFileSubmit}
            setFileSubmit={this.setFileSubmit}
          />
        </Grid >
      );
    }
  }

  render() {
    const { classes, position } = this.props
    return (
      <div className={classes.root}>
        <MuiThemeProvider theme={theme}>
          <Menu position={1} />

          <Container component="div" maxWidth="md" className={classes.container}>
            <Typography
              variant="h5" align="center"
              className={classes.title}>
              Suas Informações
            </Typography>
            <Divider className={classes.divider} />
            <Box className={classes.boxHelpLabel}>
              <Typography
                variant="subtitle1"
                className={classes.helpLabel}
              >
                <HelpIcon style={{ paddingRight: '5px' }} />
                As Informações aqui presentes não estão disponíveis para
                a visualização de outros alunos, exceto o nome
              </Typography>
            </Box>

            {this.formInfos()}

          </Container>
        </MuiThemeProvider>
      </div>
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

PersonalInfos.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

const styles = theme => ({
  root: {
    backgroundColor: '#42a0ed',
    height: '100vh'
  },
  container: {
    marginTop: theme.spacing(3),
    backgroundColor: '#fff',
    paddingBottom: 20,
  },
  title: {
    color: "#267cc1",
    paddingBottom: 15
  },
  boxHelpLabel: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  helpLabel: {
    color: "#267cc1",
    paddingBottom: 15,
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  divider: {
    size: 30,
    color: "black"
  }
});

function mapStateToProps(state) {
  return {
    isAuthenticated: state.authentication.isAuthenticated,
    token: state.authentication.userData.token,
    requisitionError: state.userProfile.requisitionError,
    profileData: state.userProfile.profileData
  }
}

export const personalInfosContainer = connect(
  mapStateToProps,
  { updateProfile, getProfile },
)(withStyles(styles, { withTheme: true })(PersonalInfos))

export default personalInfosContainer;