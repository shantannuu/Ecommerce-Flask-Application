import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, makeStyles } from '@material-ui/core';
import { ChevronLeft, ChevronRight, Inbox, Mail, People } from '@material-ui/icons';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 240,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: 240,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: theme.mixins.toolbar,
  toggleButton: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: theme.spacing(1),
  },
}));

const Sidebar = ({ open, toggleDrawer }) => {
  const classes = useStyles();
  return (
    <Drawer
      variant="permanent"
      className={open ? classes.drawerOpen : classes.drawerClose}
      classes={{
        paper: open ? classes.drawerOpen : classes.drawerClose,
      }}
    >
      <div className={classes.toggleButton}>
        <IconButton onClick={toggleDrawer}>
          {open ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </div>
      <List>

        <ListItem button component={RouterLink} to="/admin/AddCategory">
          <ListItemIcon><Inbox /></ListItemIcon>
          <ListItemText primary="Add Category" />
        </ListItem>
        <ListItem button component={RouterLink} to="/admin/Categories">
          <ListItemIcon><Inbox /></ListItemIcon>
          <ListItemText primary="Categories" />
        </ListItem>
        <ListItem button component={RouterLink} to="/admin/AddProduct">
          <ListItemIcon><Mail /></ListItemIcon>
          <ListItemText primary="Add Product" />
        </ListItem>
        <ListItem button component={RouterLink} to="/admin/product">
          <ListItemIcon><Inbox /></ListItemIcon>
          <ListItemText primary="Products" />
        </ListItem>
        <ListItem button component={RouterLink} to="/admin/User">
          <ListItemIcon><People /></ListItemIcon>
          <ListItemText primary="Users" />
        </ListItem>
        <ListItem button component={RouterLink} to="/admin/Order">
          <ListItemIcon><People /></ListItemIcon>
          <ListItemText primary="Orders" />
        </ListItem>
        {/* Add other sidebar items as needed */}
      </List>
    </Drawer>
  );
};

export default Sidebar;
