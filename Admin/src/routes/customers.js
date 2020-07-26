import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import AllCustomers from "../components/allCustomers";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2)
  }
}));

const Customers = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3} justify="center">
        <Grid item xs={10}>
          <Paper className={classes.paper}>
            <Typography align="center" variant="h4">
              CUSTOMERS
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={10}>
          <AllCustomers />
        </Grid>
      </Grid>
    </div>
  );
};

export default Customers;
