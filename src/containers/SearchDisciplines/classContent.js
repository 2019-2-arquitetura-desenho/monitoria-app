import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import {
  Grid,
  Divider,
  Typography,
  Box
} from '@material-ui/core';

import { ReactComponent as SunIcon } from '../assets/sun.svg';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#fff',
    color: '#000',
    width: '100%',
    marginTop: 20,
    marginBottom: 10
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
  period: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  shedules: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start'
  }
}

const ClassContent = (props) => {
  const {
    classes, classroom, period, shedules, professors
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
        <Box fontFamily="Asap" fontSize={30} >
          {classroom ? classroom : 'INEXISTENTE'}
        </Box>
        <Box className={classes.period} component="div">
          <Typography>
            <SunIcon width="50" height="50" />
          </Typography>
          <Typography>
            {period ? period : 'INDEFINIDO'}
          </Typography>
        </Box>
        <Box className={classes.shedules}>
          {
            shedules.map(shedule => (
              <Typography align="center">
                {shedule}
              </Typography>
            ))
          }
        </Box>
        <Box>
          {
            professors.map(professor => (
              <Typography >
                {professor}
              </Typography>
            ))
          }
        </Box>
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(ClassContent);