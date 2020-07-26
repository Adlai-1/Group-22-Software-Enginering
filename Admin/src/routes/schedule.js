import React from "react";
import Deliveries from "../components/deliveries";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2)
  }
}));

const Schedule = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3} justify="center">
        <Grid item xs={10}>
          <Paper className={classes.paper}>
            <Typography align="center" variant="h4">
              DELIVERIES
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={10}>
          <Deliveries />
        </Grid>
      </Grid>
    </div>
  );
};

export default Schedule;
