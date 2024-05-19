import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, makeStyles, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useNavigate } from 'react-router-dom';

import {useSelector } from 'react-redux';
const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  profile: {
    marginRight: theme.spacing(2),
  }
}));

const NavBar = ({ toggleDrawer }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/Login")

    console.log("logout");
  }
  console.log(user)
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Admin Dashboard
        </Typography>
        <Typography variant="Subtitle 1" className={classes.profile}>
          {user ? user.username : ''}
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleLogout()}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
