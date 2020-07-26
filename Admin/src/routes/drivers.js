import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Axios from "axios";

import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

import AllDrivers from "../components/allDrivers";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paperAdd: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    padding: theme.spacing(1),
    flexDirection: "row",
    color: "white",
    backgroundColor: "grey"
  },
  paperDrivers: {
    display: "flex",
    color: "black",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2)
  },

  paperModal: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 7, 3)
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  textField: {
    margin: theme.spacing(0, 0, 2, 0)
  }
}));

const Drivers = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [contact, setContact] = React.useState("");

  // const DRIVERS_DATA = gql`
  //   query Drivers {
  //     _id
  //     Name
  //     Username
  //     createdAt
  //     Contact
  //   }
  // `;
  // const { data, loading, error } = useQuery(DRIVERS_DATA);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addDriver = () => {
    Axios.post("https://powerful-bastion-17180.herokuapp.com/Driver-Signup", {
      Name: name,
      Username: username,
      Password: password,
      Contact: contact
    })
      .then(res => {
        console.log(res.status);
        handleClose();
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <div className={classes.root}>
        <Grid container spacing={3} justify="center">
          <Grid item xs={10}>
            <Paper className={classes.paperAdd}>
              <Typography>CREATE NEW DRIVER PROFILE</Typography>
              <Fab
                size="small"
                color="secondary"
                aria-label="add"
                onClick={handleOpen}
              >
                <AddIcon />
              </Fab>
            </Paper>
          </Grid>

          <Grid item xs={10}>
            <AllDrivers />
          </Grid>
        </Grid>
      </div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div className={classes.paperModal}>
            <h2>ADD DRIVER</h2>
            <form className={classes.form} noValidate autoComplete="off">
              <TextField
                value={name}
                onChange={event => setName(event.target.value)}
                className={classes.textField}
                id="outlined-basic"
                label="Full Name"
                variant="outlined"
                size="small"
              />
              <TextField
                value={username}
                onChange={event => setUsername(event.target.value)}
                className={classes.textField}
                id="outlined-basic"
                label="Username"
                variant="outlined"
                size="small"
              />
              <TextField
                value={contact}
                onChange={event => setContact(event.target.value)}
                className={classes.textField}
                id="outlined-basic"
                label="Contact"
                variant="outlined"
                size="small"
              />
              <TextField
                value={password}
                onChange={event => setPassword(event.target.value)}
                className={classes.textField}
                id="outlined-basic"
                label="Password"
                variant="outlined"
                size="small"
              />

              <Button variant="contained" color="secondary" onClick={addDriver}>
                ADD
              </Button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default Drivers;
