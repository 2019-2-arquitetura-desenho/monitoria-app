import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  Box,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
} from '@material-ui/core';

import { ReactComponent as SunIcon } from '../assets/sun.svg';
import SubscribeButton from '../components/SubscribeButton/subscribeButton';


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
  },
  buttonBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: 40,
    width: "100%"
  },
  buttonBoxRow: {
    marginRight: 10,
    width: 300
  },
}

const ClassContent = (props) => {
  const {
    classes, classroom, period, shedules, professors, onPress
  } = props;

  return (
    <Grid container className={classes.root} justify="center">
      <Table>
        <colgroup>
          <col style={{ width: '20%' }} />
          <col style={{ width: '20%' }} />
          <col style={{ width: '30%' }} />
          <col style={{ width: '30%' }} />
        </colgroup>
        <TableHead>
          <TableRow>
            <TableCell>
              <Box fontWeight="fontWeightBold">
                Turma
            </Box>
            </TableCell>
            <TableCell>
              <Box fontWeight="fontWeightBold">
                Turno
            </Box>
            </TableCell>
            <TableCell>
              <Box fontWeight="fontWeightBold">
                Turno
            </Box>
            </TableCell>
            <TableCell>
              <Box fontWeight="fontWeightBold">
                Professor
            </Box>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell >
              <Box fontFamily="Asap" fontSize={30} fontWeight="">
                {classroom ? classroom : 'INEXISTENTE'}
              </Box>
            </TableCell>
            <TableCell >
              <Typography>
                <SunIcon width="50" height="50" />
              </Typography>
              <Typography>
                {period ? period : 'INDEFINIDO'}
              </Typography>
            </TableCell>
            <TableCell >
              {shedules.map((shedule, index) => (
                < Typography key={index} >
                  {shedule}
                </Typography>
              ))}
            </TableCell>
            <TableCell>
              {
                professors.map((professor, index) => (
                  <Typography key={index}>
                    {professor}
                  </Typography>
                ))
              }
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Box className={classes.buttonBox} >
        <Box className={classes.buttonBoxRow}>
          <SubscribeButton
            titleButton="Inscrever-se para a Monitoria"
            buttonColor="secondary"
            onClickSubmitButton={onPress}
          />
        </Box>
      </Box>
    </Grid >
  );
}

export default withStyles(styles)(ClassContent);