import React, { Children, useEffect, useState } from 'react';
import { CssBaseline, makeStyles, Typography } from '@material-ui/core';
import Navbar from './NavBar';
import Sidebar from './SideBar';
import { SetUser } from '../../Components/redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { GetLoggedInUserDetails } from '../../Components/AxioApi/UserApi';
import { useNavigate } from 'react-router-dom';

import { jwtDecode } from 'jwt-decode';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 50,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(8) + 1,
    },
  },
}));

const AdminDashboard = ({ children }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const validateUserToken = async () => {
    try {

      const response = await GetLoggedInUserDetails();
      console.log(response)
      if (response.success) {
        dispatch(SetUser(response.user));
        console.log(response.user)
      } else {
        localStorage.removeItem("token");
        navigate("/Login");
        console.log(response.message)
      }
    } catch (error) {
      localStorage.removeItem("token");
      navigate("/Login");
      console.log(error.message)

    }
  }

  useEffect(() => {

    const token = localStorage.getItem("token");
    
    if (!token) {
      navigate('/Login');
    } else {
      const decoded = jwtDecode(token);
      console.log(decoded.role)
      if (decoded.role === 'admin') {
        validateUserToken();
      } else {
        navigate('/')
      }
    }


  }, []);


  return (
    <div className={classes.root}>
      <CssBaseline />
      <Navbar toggleDrawer={toggleDrawer}/>
      <Sidebar open={open} toggleDrawer={toggleDrawer} />
      <main className={`${classes.content} ${!open && classes.contentShift}`}>
        <div className={classes.appBarSpacer} />
        <Typography variant="h4" gutterBottom>
          Product Management
        </Typography>
        {children}
      </main>
    </div>
  );
};

export default AdminDashboard;
