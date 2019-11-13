import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import {
  Grid,
  Divider,
  Typography
} from '@material-ui/core';




const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#fff',
    color: '#000',
    width: '100%',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  divider: {
    backgroundColor: '#000',
    height: 1,
    width: '98%',
    alignSelf: 'center',
  },
  content: {
    minHeight: 100
  },
  class: {
    color: "#000",
    fontSize: 30,
    fontFamily: 'Asap Condensed'
  },
  period: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  }
}

const ClassContent = (props) => {
  const {
    classes
  } = props;

  return (
    <Grid container className={classes.root} justify="center">
      <Grid item className={classes.header}>
        <Grid container direction="row" justify="space-around">
          <Typography>
            Turma
          </Typography>
          <Typography>
            Turno
          </Typography>
          <Typography>
            Horário
          </Typography>
          <Typography>
            Professor
          </Typography>
        </Grid>
        <Divider className={classes.divider} />
      </Grid>
      <Grid container className={classes.content}
        direction="row" justify="space-around">
        <Typography className={classes.class}>
          AA
        </Typography>
        <Typography classname={classes.period}>
          Turno
        </Typography>
        <Typography>
          Horário
        </Typography>
        <Typography>
          Professor
        </Typography>
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(ClassContent);