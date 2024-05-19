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
import { GetAllOrdersById,GetAllOrders, GetOrderById } from '../../Components/AxioApi/OrderApi';
import { GetAllUsers } from '../../Components/AxioApi/UserApi';
import { GetAllProducts } from '../../Components/AxioApi/ProductApi';

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
  // const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [products , setProducts ] = useState([]);
  
  const getUsers = async () => {
    try {
      const response = await GetAllUsers();
      if (response.success) {
        setUsers(response.data)
      } else {
        console.log(response.message)
      }
    } catch (error) {
      console.log(error.message);
    }

  }

  const getOrderById = async () => {
    try {
      console.log(orderId)
      const response = await GetOrderById(orderId);
      if (response.success) {
        setOrder(response.order)
      } else {
        console.log(response.message)
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  

  const getProducts = async () => {
    try {
      const response = await GetAllProducts();
      if (response.success) {
        setProducts(response.data)
      } else {
        console.log(response.message)
      }
    } catch (error) {
      console.log(error.message);
    }

  }

  useEffect(() => {
    getOrderById();
    getProducts();
    getUsers();
  }, [orderId]);

  const getUserNameById = (id) => {
    const user = users.find((user) => user.id === id);
    return user ? user.username : 'Unknown Category';
  };

  const getProductsById = (id) => {
    const product = products.find((product) => product.id === id);
    return product ? product.name : 'Unknown Category';
  };

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
          Customer: {getUserNameById(order.user_id)}
        </Typography>
        <Typography variant="h6" className={classes.detailItem}>
          Total: ${order.total_price}
        </Typography>
        <Typography variant="h6" className={classes.detailItem}>
          Status: {order.status}
        </Typography>
        <Typography variant="h6" className={classes.detailItem}>
          Date: {order.created_at}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Items:
        </Typography>
        {order.order_items.map((item, index) => (
          <Typography variant="body1" className={classes.detailItem} key={index}>
            {getProductsById(item.product_id)} - Quantity: {item.quantity} - Price: ${item.unit_price}
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
