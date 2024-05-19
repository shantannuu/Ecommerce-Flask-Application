import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  makeStyles,
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  detailsButton: {
    marginLeft: theme.spacing(1),
  },
}));

const UserList = () => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch user data from your backend API
    // For demonstration, I'm initializing users with dummy data
    const dummyUsers = Array.from({ length: 10 }, (_, index) => ({
      id: index + 1,
      name: `User ${index + 1}`,
      email: `user${index + 1}@example.com`,
      role: index % 2 === 0 ? 'Admin' : 'Customer',
    }));
    setUsers(dummyUsers);
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="user table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  className={classes.detailsButton}
                  component={RouterLink}
                  to={`/admin/user/${user.id}`}
                >
                  Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserList;
