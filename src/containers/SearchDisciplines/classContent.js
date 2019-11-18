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
import CardButton from '../components/CardButton/cardButton';


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
  meeting: {
    fontSize: 12
  },
  cardFooterColumn: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: 40,
    width: "100%"
  },
  cardFooterRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  buttonBox: {
    marginRight: 10,
    width: 300
  }
}


const ClassContent = ({
  classes, classroom, period, meetings, professors,
  discipline, labelButtonAction, action, needActionArgs
}) => {

  function dispatchAction() {

    if (needActionArgs)
      action(discipline, classroom);
    else
      action();

  }

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
              {
                meetings && meetings.map((meeting, index) => (
                  < Typography key={index} className={classes.meeting}>
                    {`${meeting.day}-${meeting.init_hour}/${meeting.final_hour} 
                      (${meeting.room})`}
                  </Typography>
                ))
              }
            </TableCell>
            <TableCell>
              {
                professors && professors.map((professor, index) => (
                  <Typography key={index} variant="subtitle2">
                    {professor}
                  </Typography>
                ))
              }
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Box className={classes.cardFooterColumn} >
        <Box className={classes.cardFooterRow}>
          <Box className={classes.buttonBox}>
            <CardButton
              titleButton={labelButtonAction}
              buttonColor="secondary"
              onClickSubmitButton={dispatchAction}
            />
          </Box>
        </Box>
      </Box>
    </Grid >
  );
}

export default withStyles(styles)(ClassContent);