import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { request } from "graphql-request";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import FaceIcon from "@material-ui/icons/Face";
import Divider from "@material-ui/core/Divider";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: "#f0f0f0",
    padding: theme.spacing(2, 5),
    borderRadius: "10px"
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paperModal: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(6, 7, 3)
  },
  detailsText: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  detailTitle:{
    fontWeight:"bold",
    margin:"0px 14px 0px 0px"
  }
}));

const AllCustomers = () => {
  const classes = useStyles();
  const [customers, setCustomers] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [customerDetails, setCustomerDetails] = React.useState({});

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const query = `{
    Users{
      _id
      Name
      Username
      Contact
      Email
      createdAt
      Address
    }
  }`;

  React.useEffect(() => {
    request("https://powerful-bastion-17180.herokuapp.com/graphql", query)
      .then(data => {
        setCustomers(data.Users);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  return (
    <Container className={classes.container}>
      <List>
        {customers.map(item => (
          <React.Fragment key={item._id}>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <FaceIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}
                  >
                    <Typography variant="button">{item.Username} </Typography>
                    <Button
                      variant="outlined"
                      color="secondary"
                      size="small"
                      onClick={() => {
                        handleOpen();
                        setCustomerDetails(item);
                      }}
                    >
                      View Details
                    </Button>
                  </div>
                }
                secondary={
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}
                  >
                    <Typography>{item.Contact}</Typography>
                    <Typography>{item.Email} </Typography>
                  </div>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>

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
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                margin: "0px 0px 18px 0px"
              }}
            >
              <Typography style={{ margin: "0px 40px 0px 0px" }} variant="h6">
                CUSTOMER DETAILS
              </Typography>
              <IconButton size="small" onClick={handleClose}>
                <CloseIcon fontsize="inherit" />
              </IconButton>
            </div>
            <div
              style={{
                height: "1px",
                backgroundColor: "grey",
                margin: "0px 0px 18px 0px"
              }}
            />
            <div>
              <div className={classes.detailsText}>
                <Typography className={classes.detailTitle} variant="button">Customer ID: </Typography>
                <Typography variant="subtitle1">
                  {customerDetails._id}
                </Typography>
              </div>
              <div className={classes.detailsText}>
                <Typography className={classes.detailTitle} variant="button">Username:</Typography>
                <Typography variant="subtitle1">
                  {customerDetails.Username}
                </Typography>
              </div>
              <div className={classes.detailsText}>
                <Typography className={classes.detailTitle} variant="button">Full Name:</Typography>
                <Typography variant="subtitle1">
                  {customerDetails.Name}
                </Typography>
              </div>
              <div className={classes.detailsText}>
                <Typography className={classes.detailTitle} variant="button">Email:</Typography>
                <Typography variant="subtitle1">
                  {customerDetails.Email}
                </Typography>
              </div>
              <div className={classes.detailsText}>
                <Typography className={classes.detailTitle} variant="button">Contact:</Typography>
                <Typography variant="subtitle1">
                  {customerDetails.Contact}
                </Typography>
              </div>
              <div className={classes.detailsText}>
                <Typography className={classes.detailTitle} variant="button">Address:</Typography>
                <Typography variant="subtitle1">
                  {customerDetails.Address}
                </Typography>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </Container>
  );
};

export default AllCustomers;
