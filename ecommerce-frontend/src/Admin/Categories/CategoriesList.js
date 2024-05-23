import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid, Button, makeStyles } from '@material-ui/core';
import { DeleteCategoryData, GetAllCategories } from '../../Components/AxioApi/CategoryApi';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardContent: {
    flexGrow: 1,
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing(2),
  },
  customMargin: {
    margin: theme.spacing(1), // Equivalent to 16px
},
}));

const CategoriesList = () => {
  const classes = useStyles();
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const getCategories = async () => {
    try {
      const response = await GetAllCategories();
      if (response.success) {
        setCategories(response.data)
      } else {
        console.log(response.message)
      }
    } catch (error) {
      console.log(error.message);
    }

  }

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  const showMessage = (message, status) => {

      if (status) {
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
  }


  useEffect(() => {
    getCategories();

  }, []);

  const handleEdit = (category) => {
    // Implement edit functionality
    navigate('/admin/AddCategory', { state: { category } })
  };

  const handleDelete = async (id) => {
    try {
      const response = await DeleteCategoryData(id);
      if (response.success) {
        console.log(response.message)
        getCategories();
        showMessage(response.message, response.success);
      } else {
        showMessage(response.message, response.success);
      }
    } catch (error) {
      console.log(error.message);
      showMessage(error.message, error.success);
    }
  };

  return (
    <div className={classes.root}>
      <Typography variant="h5" gutterBottom>
        Categories List
      </Typography>
      <Grid container spacing={3}>
        {categories.map((category) => (
          <Grid item key={category.id} xs={12} sm={6} md={4} lg={3}>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  {category.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {category.description}
                </Typography>
                <div className={classes.buttonGroup}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEdit(category)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(category.id)}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
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
    </div>
  );
};

export default CategoriesList;
