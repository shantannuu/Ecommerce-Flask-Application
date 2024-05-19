import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  makeStyles,
} from '@material-ui/core';
import { GetAllOrders } from '../../Components/AxioApi/OrderApi';
import { GetAllUsers } from '../../Components/AxioApi/UserApi';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(3),
  },
  table: {
    minWidth: 650,
  },
  detailsButton: {
    textDecoration: 'none',
  },
}));

const OrderList = () => {
  const classes = useStyles();
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
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

  const getOrders = async () => {
    try {
      const response = await GetAllOrders();
      if (response.success) {
        setOrders(response.data)
      } else {
        console.log(response.message)
      }
    } catch (error) {
      console.log(error.message);
    }

  }

  useEffect(() => {
    getOrders();
    getUsers();
  }, []);

  const getUserNameById = (id) => {
    const user = users.find((user) => user.id === id);
    return user ? user.username : 'Unknown Category';
  };

  return (
    <Container className={classes.container}>
      <Paper className={classes.paper}>
        <Typography variant="h4" gutterBottom>
          Order List
        </Typography>
        <TableContainer>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{ getUserNameById(order.user_id)}</TableCell>
                  <TableCell>${order.total_price}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>{order.created_at}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.detailsButton}
                      component={RouterLink}
                      to={`/admin/order/${order.id}`}
                    >
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default OrderList;
