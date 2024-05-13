import React, { useState } from 'react';
import { Typography, List, ListItem, ListItemText, Button, makeStyles } from '@material-ui/core';
import NavigationBar from '../Smallcomponents/NavigationBar';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    list: {
        maxWidth: 600,
        margin: '0 auto',
        marginBottom: theme.spacing(2),
    },
    total: {
        textAlign: 'center',
        marginTop: theme.spacing(2),
    },
}));

const Cart = () => {
    const classes = useStyles();
    const [cart, setCart] = useState([
        { id: 1, name: 'Product 1', price: 10 },
        { id: 2, name: 'Product 2', price: 20 },
        { id: 3, name: 'Product 3', price: 30 },
    ]);

    const totalPrice = cart.reduce((acc, curr) => acc + curr.price, 0);

    const handlePurchase = () => {
        // Add logic to handle the purchase (e.g., send cart data to backend)
        console.log('Purchase clicked');
    };

    return (
        <>
        <NavigationBar/>
        <div className={classes.root}>
            <Typography variant="h4" align="center" gutterBottom>
                Shopping Cart
            </Typography>
            <List className={classes.list}>
                {cart.map((item) => (
                    <ListItem key={item.id}>
                        <ListItemText primary={item.name} secondary={`$${item.price}`} />
                    </ListItem>
                ))}
            </List>
            <Typography variant="h6" className={classes.total}>
                Total: ${totalPrice}
            </Typography>
            <Button
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                onClick={handlePurchase}
                disabled={cart.length === 0}
            >
                Purchase
            </Button>
        </div>
        </>
        
    );
};

export default Cart;
