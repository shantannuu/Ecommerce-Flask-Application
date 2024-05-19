import React, { Children, useState } from 'react';
import { CssBaseline, makeStyles, Typography} from '@material-ui/core';
import Navbar from './NavBar';
import Sidebar from './SideBar';

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

const AdminDashboard = ({children}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Navbar toggleDrawer={toggleDrawer} />
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
