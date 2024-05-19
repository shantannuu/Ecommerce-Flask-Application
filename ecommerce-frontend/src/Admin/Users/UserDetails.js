import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  makeStyles,
  Button
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { GetUserDetails } from '../../Components/AxioApi/UserApi';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
    marginTop: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(3),
  },
  detailItem: {
    marginBottom: theme.spacing(2),
  },
  backButton: {
    marginTop: theme.spacing(3),
  },
}));

const UserDetails = () => {
  const classes = useStyles();
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  const getUserById = async () => {
    try{
      const response = await GetUserDetails(userId);
      if(response.success){
        setUser(response.user);
      }else{
        console(response.message)
      }
    }catch(error){
      console(error.message)
    }
  }

  useEffect(() => {
    getUserById();
  }, [userId]);

  if (!user) return <div>Loading...</div>;

  return (
    <Container className={classes.container}>
      <Paper className={classes.paper}>
        <Typography variant="h4" gutterBottom>
          User Details
        </Typography>
        <Typography variant="h6" className={classes.detailItem}>
          ID: {user.id}
        </Typography>
        <Typography variant="h6" className={classes.detailItem}>
          Name: {user.username}
        </Typography>
        <Typography variant="h6" className={classes.detailItem}>
          Email: {user.email}
        </Typography>
        <Typography variant="h6" className={classes.detailItem}>
          Role: {user.role}
        </Typography>
        <Typography variant="h6" className={classes.detailItem}>
          Address: {user.address}
        </Typography>
        <Typography variant="h6" className={classes.detailItem}>
          Phone: {user.phone}
        </Typography>
        {/* Add more details as needed */}
        <Button
          variant="contained"
          color="primary"
          className={classes.backButton}
          component={RouterLink}
          to="/admin/User"
        >
          Back to User List
        </Button>
      </Paper>
    </Container>
  );
};

export default UserDetails;
