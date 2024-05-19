import React, { useEffect, useState } from 'react';
import { Button, TextField, Typography, Container, makeStyles } from '@material-ui/core';
import {  login } from '../AxioApi/UserApi';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Add code to handle form submission (e.g., send data to backend)

        try {

            const response = await login(formData); // Call the register API function
            // console.log(response.user_id); // Handle success response
            
            setFormData({
                email: '',
                password: '',
            });
            const decoded = jwtDecode(response.token);
            localStorage.setItem("token", response.token);

            

            if (decoded.role === 'admin') {
                window.location.href = '/admin/Product';
              } else {
                window.location.href = '/';
              }

            
        } catch (error) {
            console.error(error.message); // Handle error response
            setErrorMessage(error.message);
        }
        // console.log(formData);
    };

    useEffect(()=>{
        const token = localStorage.getItem("token");
        
        if(token){
            const decoded = jwtDecode(token);
            if(decoded.role === 'admin'){
                navigate('/admin/Product')
            }else{
                navigate("/")
            }
            
        }
    },[])

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
                {errorMessage && (
                    <Typography variant="h6" color="error" className={classes.customMargin}>
                        {errorMessage}
                    </Typography>
                )}
            </form>
        </Container>
    );
};

export default Login;
