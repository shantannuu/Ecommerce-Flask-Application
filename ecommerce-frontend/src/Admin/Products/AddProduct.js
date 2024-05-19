import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Button,
  TextField,
  Grid,
  Typography,
  makeStyles,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core';
import { GetAllCategories } from '../../Components/AxioApi/CategoryApi';
import { AddProductData } from '../../Components/AxioApi/ProductApi';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    marginTop: theme.spacing(3),
    maxWidth: 600,
    margin: 'auto',
  },
  formControl: {
    marginBottom: theme.spacing(2),
    width: '100%',
  },
  uploadButton: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const AddProduct = () => {
  const classes = useStyles();
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    category: '',
    image: null,
  });
  const [categories, setCategories] = useState([]);

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
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleFileChange = (e) => {
    setProduct({ ...product, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const publicId = `${product.name.replace(/\s+/g, '_')}_${Date.now()}`;
      // Upload image to Cloudinary
      const formData = new FormData();
      formData.append('file', product.image);
      formData.append('upload_preset', 'shantanuP');
      formData.append('public_id', publicId);
      const cloudinaryResponse = await axios.post('https://api.cloudinary.com/v1_1/dvwcfmgo3/image/upload', formData); // Replace with your Cloudinary details
      const imageUrl = cloudinaryResponse.data.secure_url;
      const productData = { ...product, image: imageUrl };
      const response = await AddProductData(productData);
      if (response.success) {
        console.log(response.product);
        showMessage(response.message, response.success); 
        setProduct({
          name: '',
          description: '',
          price: '',
          quantity: '',
          category: '',
          image: null,
        });
      } else {
        console.log(response.message);
        showMessage(response.message, response.success);
      }
    } catch (error) {
      console.error(error.message);
      showMessage(error.message, error.success);
    }
    console.log(product);
  };

  useEffect(() => {

    getCategories();

  }, []);

  return (
    <Paper className={classes.root}>
      <Typography variant="h5" gutterBottom>
        Add New Product
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Product Name"
          name="name"
          variant="outlined"
          className={classes.formControl}
          value={product.name}
          onChange={handleInputChange}
        />
        <TextField
          label="Description"
          name="description"
          variant="outlined"
          multiline
          rows={4}
          className={classes.formControl}
          value={product.description}
          onChange={handleInputChange}
        />
        <TextField
          label="Price"
          name="price"
          type="number"
          variant="outlined"
          className={classes.formControl}
          value={product.price}
          onChange={handleInputChange}
        />
        <TextField
          label="Quantity"
          name="quantity"
          type="number"
          variant="outlined"
          className={classes.formControl}
          value={product.quantity}
          onChange={handleInputChange}
        />
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel>Category</InputLabel>
          <Select
            name="category"
            value={product.category}
            onChange={handleInputChange}
            label="Category"
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <input
          accept="image/*"
          className={classes.input}
          style={{ display: 'none' }}
          id="upload-image"
          type="file"
          onChange={handleFileChange}
        />
        <label htmlFor="upload-image">
          <Button
            variant="contained"
            color="primary"
            component="span"
            className={classes.uploadButton}
          >
            Upload Image
          </Button>
        </label>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.formControl}
        >
          Add Product
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
    </Paper>
  );
};

export default AddProduct;
