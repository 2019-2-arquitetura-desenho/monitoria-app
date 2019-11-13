import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import {
  Paper,
  createMuiTheme,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Divider
} from '@material-ui/core';
import { flexbox } from '@material-ui/system';


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

const styles = theme => ({
  root: {
    backgroundColor: "#267CC1"
  },
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#267CC1",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    color: "#fff",
  },
  divider: {
    backgroundColor: "#fff",
    width: "96%",
    alignSelf: "center",
  },
  content: {
    color: "#fff",
  }
});

const SearchDisciplines = (props) => {
  const {
    classes, title, codigo
  } = props;

  return (
    <Paper className={classes.root}>
      <Card className={classes.card}>
        <CardContent className={classes.header}>
          <Typography>
            {"Nome: " + (title ? title : "Disciplina")}
          </Typography>
          <Typography>
            {"Código: " + (codigo ? codigo : "000")}
          </Typography>
        </CardContent>
        <Divider className={classes.divider} />
        <CardContent className={classes.content}>
          a
        </CardContent>
      </Card>
    </Paper>
  );
}

export default withStyles(styles)(SearchDisciplines);
