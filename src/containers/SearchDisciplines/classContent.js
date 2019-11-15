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

const ClassContent = ({
  classes, classroom, period, meetings, professors,
  onPress, discipline
}) => {

  const textSuccessSubscribe = () => {
    return `Você foi inscrito na seleção para a monitoria de
    ${discipline} tuma ${classroom}`;
  }

  const textWarningSubscribe = () => {
    return `Você não tem os requisitos necessários para se
      increver nessa monitoria. `;
  }

  const handleEventModal = () => {
    onPress('Aviso', textWarningSubscribe(), 'success')
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
                    {professor.name}
                  </Typography>
                ))
              }
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Box className={classes.buttonBox} >
        <Box className={classes.buttonBoxRow}>
          <CardButton
            titleButton="Inscrever-se para a Monitoria"
            buttonColor="secondary"
            onClickSubmitButton={handleEventModal}
          />
        </Box>
      </Box>
    </Grid >
  );
}

export default withStyles(styles)(ClassContent);