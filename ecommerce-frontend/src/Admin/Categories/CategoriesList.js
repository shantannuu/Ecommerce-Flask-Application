import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid, Button, makeStyles } from '@material-ui/core';
import { GetAllCategories } from '../../Components/AxioApi/CategoryApi';

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
}));

const CategoriesList = () => {
  const classes = useStyles();
  const [categories, setCategories] = useState([]);

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

  useEffect(() => {
    // Fetch categories data from your backend API
    // Update setCategories based on the fetched data
    // For demonstration, I'm initializing categories with dummy data
    // const dummyCategories = Array.from({ length: 10 }, (_, index) => ({
    //   id: index + 1,
    //   name: `Category ${index + 1}`,
    //   description: `Description of Category ${index + 1}`,
    // }));
    // setCategories(dummyCategories);
    getCategories();

  }, []);

  const handleEdit = (id) => {
    // Implement edit functionality
    console.log('Edit category with ID:', id);
  };

  const handleDelete = (id) => {
    // Implement delete functionality
    console.log('Delete category with ID:', id);
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
                    onClick={() => handleEdit(category.id)}
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
    </div>
  );
};

export default CategoriesList;
