import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, makeStyles, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { DeleteProductData, GetAllProducts } from '../../Components/AxioApi/ProductApi';
import { GetAllCategories } from '../../Components/AxioApi/CategoryApi';
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
  productImage: {
    width: '100%',
    height: 'auto',
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

const ProductList = () => {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
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

  const handleDelete = async (productId) => {
    try {
      const response = await DeleteProductData(productId);
      if (response.success) {
        console.log(response.message)
        getProducts();
        showMessage(response.message, response.success);
      } else {
        showMessage(response.message, response.success);
      }
    } catch (error) {
      console.log(error.message);
      showMessage(error.message, error.success);
    }
  };

  const handleEdit = (product) => {
    
    product = { ...product, category : getCategoryNameById(product.category_id) , image : product.image_url };
    // console.log(product)
    const {  image_url  , ...updatedProduct} = product
    // Handle edit functionality here
    // console.log(updatedProduct)
    navigate('/admin/AddProduct', { state: { updatedProduct } })
  };

  useEffect(() => {

    getProducts();
    getCategories();
  }, []);

  const getCategoryNameById = (id) => {
    const category = categories.find((category) => category.id === id);
    return category ? category.name : 'Unknown Category';
  };

  return (
    <div className={classes.root}>
      <Typography variant="h5" gutterBottom>
        Product List
      </Typography>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <img src={product.image_url} alt={product.name} className={classes.productImage} />
                <Typography gutterBottom variant="h5" component="h2">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {product.description}
                </Typography>
                <Typography variant="body2" color="textPrimary" component="p">
                  Price: ${product.price}
                </Typography>
                <Typography variant="body2" color="textPrimary" component="p">
                  Quantity: {product.quantity}
                </Typography>
                <Typography variant="body2" color="textPrimary" component="p">
                  Category : {getCategoryNameById(product.category_id)}
                </Typography>
                <div className={classes.buttonGroup}>
                  <IconButton aria-label="delete" onClick={() => handleDelete(product.id)}>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton aria-label="edit" onClick={() => handleEdit(product)}>
                    <EditIcon />
                  </IconButton>
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

export default ProductList;
