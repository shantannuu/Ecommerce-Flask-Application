import React, { useState } from 'react';
import { Button, TextField, Typography, Container, makeStyles } from '@material-ui/core';
import { register } from '../AxioApi/UserApi';


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

const Register = () => {
    const classes = useStyles();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirm_password: '',
    });
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    const showMessage = (message, status) => {

        if (status === 'success') {
            setSuccessMessage(message);

            // Clear the success message after 3 seconds
            setTimeout(() => {
                setSuccessMessage('');
            }, 4000); // 3000 milliseconds = 3 seconds

        } else {
            setErrorMessage(message)

            // Clear the success message after 3 seconds
            setTimeout(() => {
                setErrorMessage('');
            }, 4000); // 3000 milliseconds = 3 seconds
        }


    };


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Clear the error message when the user starts typing
        setErrors({ ...errors, [e.target.name]: '' });
        setErrorMessage('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Add code to handle form submission (e.g., send data to backend)

        const validationErrors = validate(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // console.log(formData);

        const { confirm_password, ...newformData } = formData;

        try {
            const response = await register(newformData); // Call the register API function
            console.log(response.data); // Handle success response
            showMessage(response.message, 'success'); // Set success message
            setFormData({
                username: '',
                email: '',
                password: '',
                confirm_password: '',
            });
            setErrors({}); // Clear any validation errors
        } catch (error) {
            console.error(error); // Handle error response
            showMessage(error.message || 'An error occurred during registration.','failed');
        }

        
    };

    const validate = (data) => {
        const errors = {};
        if (!data.username) {
            errors.username = 'Username is required';
        } else if (data.username.length < 6 || data.username.length > 10) {
            errors.username = 'Username must be between 6 and 10 characters';
        }
        if (!data.email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(data.email)) {
            errors.email = 'Invalid email format';
        }
        if (!data.password) {
            errors.password = 'Password is required';
        } else if (
            !/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(data.password)
        ) {
            errors.password =
                'Password must contain at least one uppercase letter, one lowercase letter, one digit, one special character, and be at least 8 characters long';
        }
        if (!data.confirm_password) {
            errors.confirm_password = 'Confirm Password is required'
        } else if (data.password !== data.confirm_password) {
            errors.confirm_password = 'Confirm Password is not matched with Password'
        }
        return errors;
    };

    return (
        <Container className={classes.container}>

            <form className={classes.form} onSubmit={handleSubmit}>
                <Typography variant="h4" align="center" gutterBottom>
                    REGISTER
                </Typography>
                <TextField
                    variant="outlined"
                    label="Username"
                    fullWidth
                    margin="normal"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    error={!!errors.username} // Check if there's an error for the username field
                    helperText={errors.username} // Display the error message for the username field
                />
                <TextField
                    variant="outlined"
                    label="Email"
                    fullWidth
                    margin="normal"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={!!errors.email} // Check if there's an error for the email field
                    helperText={errors.email} // Display the error message for the email field
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
                    error={!!errors.password} // Check if there's an error for the password field
                    helperText={errors.password} // Display the error message for the password field
                />
                <TextField
                    variant="outlined"
                    label="Confirm Password"
                    fullWidth
                    margin="normal"
                    type="password"
                    name="confirm_password"
                    value={formData.confirm_password}
                    onChange={handleChange}
                    error={!!errors.confirm_password} // Check if there's an error for the password field
                    helperText={errors.confirm_password} // Display the error message for the password field
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Register
                </Button>
                {successMessage && (
                    <Typography variant="h6" color="primary" className={classes.customMargin}>
                        {successMessage}
                    </Typography>
                )}
                {errorMessage && (
                    <Typography variant="h6" color="error" className={classes.customMargin}>
                        {errorMessage}
                    </Typography>
                )}
            </form>

        </Container>
    );
};

export default Register;
