import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Button, makeStyles } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: 'grey',
  },
  logo: {
    marginRight: 'auto',
    fontSize: '2rem',
    color: 'white',
  },
  title: {
    flexGrow: 1,
    color: 'white',
  },
  menuItem: {
    color: 'white',
  },
  subMenuItem: {
    color: 'black',
  },
  cartButton: {
    color: 'white',
  },
  cartMenu: {
    marginTop: theme.spacing(7), // Adjust as needed
  },
}));

const NavigationBar = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [categoryAnchorEl, setCategoryAnchorEl] = React.useState(null);
  const [cartAnchorEl, setCartAnchorEl] = React.useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCategoryMenuClick = (event) => {
    setCategoryAnchorEl(event.currentTarget);
  };

  const handleCategoryMenuClose = () => {
    setCategoryAnchorEl(null);
  };

  const handleCartClick = (event) => {
    setCartAnchorEl(event.currentTarget);
  };

  const handleCartClose = () => {
    setCartAnchorEl(null);
  };

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" className={classes.logo}>
          Logo
        </Typography>
        <Button color="inherit" className={classes.menuItem}>Home</Button>
        <Button
          aria-controls="category-menu"
          aria-haspopup="true"
          onClick={handleCategoryMenuClick}
          color="inherit"
          className={classes.menuItem}
        >
          Category
        </Button>
        <Menu
          id="category-menu"
          anchorEl={categoryAnchorEl}
          keepMounted
          open={Boolean(categoryAnchorEl)}
          onClose={handleCategoryMenuClose}
          className={classes.cartMenu}
        >
          <MenuItem onClick={handleCategoryMenuClose} className={classes.subMenuItem}>Submenu 1</MenuItem>
          <MenuItem onClick={handleCategoryMenuClose} className={classes.subMenuItem}>Submenu 2</MenuItem>
        </Menu>
        <Button color="inherit" className={classes.menuItem}>About Us</Button>
        <Button color="inherit" className={classes.menuItem}>Contact</Button>
        <IconButton
          aria-label="shopping cart"
          aria-controls="cart-menu"
          aria-haspopup="true"
          onClick={handleCartClick}
          className={classes.cartButton}
        >
          <ShoppingCartIcon />
        </IconButton>
        <Menu
          id="cart-menu"
          anchorEl={cartAnchorEl}
          keepMounted
          open={Boolean(cartAnchorEl)}
          onClose={handleCartClose}
          className={classes.cartMenu}
        >
          <MenuItem>Item 1</MenuItem>
          <MenuItem>Item 2</MenuItem>
        </Menu>
        <IconButton
          edge="end"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenuClick}
          color="inherit"
        >
          <AccountCircleIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          className={classes.cartMenu}
        >
          <MenuItem onClick={handleMenuClose} className={classes.subMenuItem}>Profile</MenuItem>
          <MenuItem onClick={handleMenuClose} className={classes.subMenuItem}>My account</MenuItem>
          <MenuItem onClick={handleMenuClose} className={classes.subMenuItem}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
