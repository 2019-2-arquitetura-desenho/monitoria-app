import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import {
  Paper,
  Card,
  CardContent,
  Typography,
  Divider
} from '@material-ui/core';
import ClassContent from './classContent';
import PageShell from '../components/PageShell/pageShell';


const styles = {
  root: {
    backgroundColor: "#267CC1",
    marginTop: 10,
    marginBottom: 20
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
    display: 'flex',
    flexDirection: "column",
    justifyContent: "space-between",
  }
};

const DisciplineCard = ({ classes, title, code, classrooms, onPress }) => {


  return (
    <Paper className={classes.root}>
      <Card className={classes.card}>
        <CardContent className={classes.header}>
          <Typography>
            {"Nome: " + (title ? title : "Disciplina")}
          </Typography>
          <Typography>
            {"Código: " + (code ? code : "000")}
          </Typography>
        </CardContent>
        <Divider className={classes.divider} />
        <CardContent className={classes.content}>
          {classrooms && classrooms.map((classroom, index) => (
            <ClassContent key={index}
              classroom={classroom.name}
              period={classroom.shift}
              meetings={classroom.meetings}
              professors={classroom.professors}
              discipline={title}
              onPress={onPress}
            />
          ))}
        </CardContent>
      </Card>
    </Paper>
  );
}

export default PageShell(withStyles(styles)(DisciplineCard), 'slideInUp');
