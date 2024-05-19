import React, { useState } from 'react';
import { TextField, Button, Container, Typography, makeStyles } from '@material-ui/core';
import { AddCategoryData } from '../../Components/AxioApi/CategoryApi';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));



const AddCategory = () => {
    const classes = useStyles();
    const [category, setCategory] = useState({
        name: '',
        description: '',
    });

    
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    const showMessage = (message, status) => {

        if (status) {
            setSuccessMessage(message);

            // Clear the success message after 3 seconds
            setTimeout(() => {
                setSuccessMessage('');
            }, 10000); // 3000 milliseconds = 3 seconds

        } else {
            setErrorMessage(message)

            // Clear the success message after 3 seconds
            setTimeout(() => {
                setErrorMessage('');
            }, 10000); // 3000 milliseconds = 3 seconds
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCategory({ ...category, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await AddCategoryData(category); 
            console.log(response.category); 
            showMessage(response.message, response.success); 
            setCategory({
                name: '',
                description: '',
                
            });
        } catch (error) {
            console.error(error);
            showMessage(error.message, error.success);
        }

        console.log(category);
    };

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.root}>
                <Typography component="h1" variant="h5">
                    Add Category
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="categoryName"
                        label="Category Name"
                        name="name"
                        autoComplete="categoryName"
                        autoFocus
                        value={category.name}
                        onChange={handleInputChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="description"
                        label="Description"
                        id="description"
                        autoComplete="description"
                        value={category.description}
                        onChange={handleInputChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Add Category
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
            </div>
        </Container>
    );
};

export default AddCategory;
