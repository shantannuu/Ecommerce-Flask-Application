import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  makeStyles,
  Button,
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

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

const OrderDetails = () => {
  const classes = useStyles();
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    // Fetch order details from your backend API
    // For demonstration, I'm initializing order with dummy data
    const dummyOrder = {
      id: orderId,
      customer: `Customer ${orderId}`,
      total: orderId * 100,
      status: orderId % 2 === 0 ? 'Completed' : 'Pending',
      date: `2023-05-${10 + parseInt(orderId, 10)}`,
      items: [
        { name: 'Item 1', quantity: 1, price: 50 },
        { name: 'Item 2', quantity: 2, price: 75 },
      ],
    };
    setOrder(dummyOrder);
  }, [orderId]);

  if (!order) return <div>Loading...</div>;

  return (
    <Container className={classes.container}>
      <Paper className={classes.paper}>
        <Typography variant="h4" gutterBottom>
          Order Details
        </Typography>
        <Typography variant="h6" className={classes.detailItem}>
          ID: {order.id}
        </Typography>
        <Typography variant="h6" className={classes.detailItem}>
          Customer: {order.customer}
        </Typography>
        <Typography variant="h6" className={classes.detailItem}>
          Total: ${order.total}
        </Typography>
        <Typography variant="h6" className={classes.detailItem}>
          Status: {order.status}
        </Typography>
        <Typography variant="h6" className={classes.detailItem}>
          Date: {order.date}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Items:
        </Typography>
        {order.items.map((item, index) => (
          <Typography variant="body1" className={classes.detailItem} key={index}>
            {item.name} - Quantity: {item.quantity} - Price: ${item.price}
          </Typography>
        ))}
        <Button
          variant="contained"
          color="primary"
          className={classes.backButton}
          component={RouterLink}
          to="/admin/Order"
        >
          Back to Order List
        </Button>
      </Paper>
    </Container>
  );
};

export default OrderDetails;
