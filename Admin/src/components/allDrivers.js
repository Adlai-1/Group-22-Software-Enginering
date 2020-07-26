import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import PersonIcon from "@material-ui/icons/Person";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { request } from "graphql-request";

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: "#cfe8fc",
    padding: theme.spacing(2, 5),
    borderRadius: "10px"
  }
}));

const AllDrivers = () => {
  const classes = useStyles();
  const [drivers, setDrivers] = React.useState([]);
  const query = `{
  Drivers{
    _id
    Username
    Name
    Contact
    createdAt
    On_Delivery
    
  }
}`;

  // const DRIVERS_DATA = gql`query Drivers {
  //   _id
  //   Name
  //   Username
  //   createdAt
  //   Contact
  // }`;
  // const { data, loading, error } = useQuery(DRIVERS_DATA);
  React.useEffect(() => {
    // if (!loading) {
    //   setDrivers(data.Drivers);
    // }

    request("https://powerful-bastion-17180.herokuapp.com/graphql", query)
      .then(data => {
        console.log(data);
        setDrivers(data.Drivers);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <Container className={classes.container}>
      <div>
        <h3>ALL DRIVERS</h3>
      </div>

      <Divider />
      <List>
        {drivers.map(item => (
          <React.Fragment key={item._id}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={item.Username}
                secondary={
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <Typography
                      component="span"
                      variant="body2"
                      color="textPrimary"
                    >
                      Fullname : {item.Name}
                    </Typography>
                    <Typography
                      component="span"
                      variant="body2"
                      color="textPrimary"
                    >
                      Contact : {item.Contact}
                    </Typography>
                  </div>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
    </Container>
  );
};

export default AllDrivers;
