import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { request } from "graphql-request";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ReportIcon from "@material-ui/icons/Report";

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: "#f0f0f0",
    padding: theme.spacing(3, 2),
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
  status: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column"
  }
}));

const Deliveries = () => {
  const classes = useStyles();
  const [deliveries, setDeliveries] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [deliveryDetails, setDeliveryDetails] = React.useState({});

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const Pending = () => (
    <div className={classes.status}>
      <ReportIcon color="secondary" />
      <Typography variant="body2">Pending</Typography>
    </div>
  );
  const Complete = () => (
    <div className={classes.status}>
      <CheckCircleIcon style={{ color: "green" }} />
      <Typography variant="body2">Completed</Typography>
    </div>
  );

  const query = `{
    Deliveries{
      _id
      Parcel_Type
      Parcel_Description
      Pickup_Addess
      Username
      Recepient_Name
      Recepient_Contact
      Dropoff_Address
      Driver
      Pickup_Made
      On_Delivery
      Completed
      createdAt
    },
    Drivers{
      _id
      Username
      Contact
      On_Delivery
    }
  }`;

  React.useEffect(() => {
    request("https://powerful-bastion-17180.herokuapp.com/graphql", query)
      .then(data => {
        //console.log(data);
        setDeliveries(data.Deliveries);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <Container className={classes.container}>
      <List>
        {deliveries.map(item => (
          <React.Fragment key={item._id}>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <ShoppingCartIcon />
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
                    <Typography variant="button">Delivery# </Typography>
                    <Button
                      variant="outlined"
                      color="secondary"
                      size="small"
                      onClick={() => {
                        handleOpen();
                        setDeliveryDetails(item);
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
                    <div>
                      <Typography>Customer: {item.Username}</Typography>
                      <Typography>Parcel: {item.Parcel_Type} </Typography>
                    </div>
                    {item.Completed ? <Complete /> : <Pending />}
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
              <Typography variant="h5">DELIVERY DETAILS</Typography>
              <IconButton size="small" onClick={handleClose}>
                <CloseIcon fontsize="inherit" />
              </IconButton>
            </div>
            <div
              style={{
                height: "0.5px",
                backgroundColor: "grey",
                margin: "0px 0px 18px 0px"
              }}
            />
            <div>
              <div />
              <Typography variant="subtitle1">
                Delivery ID: {deliveryDetails._id}
              </Typography>
              <Typography variant="subtitle1">
                Customer: {deliveryDetails.Username}
              </Typography>

              <Typography variant="subtitle1">
                Recepient Name: {deliveryDetails.Recepient_Name}
              </Typography>
              <Typography variant="subtitle1">
                Recepient's Contact: {deliveryDetails.Recepient_Contact}
              </Typography>
              <Typography variant="subtitle1">
                Dropoff Address: {deliveryDetails.Dropoff_Address}
              </Typography>
              <Typography variant="subtitle1">
                Driver assigned: {deliveryDetails.Driver}
              </Typography>
              <Typography variant="subtitle1">
                Parcel : {deliveryDetails.Parcel_Type}
              </Typography>
              <Typography variant="subtitle1">
                Parcel Description: {deliveryDetails.Parcel_Description}
              </Typography>
            </div>
          </div>
        </Fade>
      </Modal>
    </Container>
  );
};

export default Deliveries;
