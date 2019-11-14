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


const styles = {
  root: {
    backgroundColor: "#267CC1",
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

const DisciplineCard = (props) => {
  const {
    classes, discipline
  } = props;

  return (
    <Paper className={classes.root}>
      <Card className={classes.card}>
        <CardContent className={classes.header}>
          <Typography>
            {"Nome: " + (discipline.title ? discipline.title : "Disciplina")}
          </Typography>
          <Typography>
            {"Código: " + (discipline.code ? discipline.code : "000")}
          </Typography>
        </CardContent>
        <Divider className={classes.divider} />
        <CardContent className={classes.content}>
          {discipline.classrooms.map((classroom, index) => (
            <ClassContent key={index}
              classroom={classroom.title}
              period={classroom.period}
              shedules={classroom.shedules}
              professors={classroom.professors}
            />
          ))}
        </CardContent>
      </Card>
    </Paper>
  );
}

export default withStyles(styles)(DisciplineCard);
