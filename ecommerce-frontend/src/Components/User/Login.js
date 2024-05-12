import React, { useState } from 'react';
import { Button, TextField, Typography, Container, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh', // Set minimum height to fill the entire viewport
    },
    form: {
        width: '100%',
        maxWidth: '400px', // Adjust as needed
        padding: theme.spacing(3),
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[3],
    },
    customMargin: {
        margin: theme.spacing(1), // Equivalent to 16px
    },
}));

const Login = () => {
    const classes = useStyles();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add code to handle form submission (e.g., send data to backend)
        console.log(formData);
    };

    return (
        <Container className={classes.container}>

            <form className={classes.form} onSubmit={handleSubmit}>
                <Typography variant="h4" align="center" gutterBottom>
                    LOGIN
                </Typography>
                <TextField
                    variant="outlined"
                    label="Email"
                    fullWidth
                    margin="normal"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <TextField
                    variant="outlined"
                    label="Password"
                    fullWidth
                    margin="normal"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Login
                </Button>
            </form>
        </Container>
    );
};

export default Login;
