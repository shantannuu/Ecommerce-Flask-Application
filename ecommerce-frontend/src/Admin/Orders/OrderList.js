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

  useEffect(() => {
    // Fetch order data from your backend API
    // For demonstration, I'm initializing orders with dummy data
    const dummyOrders = Array.from({ length: 10 }, (_, index) => ({
      id: index + 1,
      customer: `Customer ${index + 1}`,
      total: (index + 1) * 100,
      status: index % 2 === 0 ? 'Completed' : 'Pending',
      date: `2023-05-${index + 10}`,
    }));
    setOrders(dummyOrders);
  }, []);

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
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>${order.total}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>{order.date}</TableCell>
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
