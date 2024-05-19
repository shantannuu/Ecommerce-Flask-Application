import React, { useEffect, useState } from 'react';
import { makeStyles, Grid, Typography, Button } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import img2 from 'C:/Users/spatil/Documents/Ecommerce-Flask-Application/ecommerce-frontend/src/media/image2.jpg'
import NavigationBar from '../Smallcomponents/NavigationBar';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(3),
        width:'100%'
    },
    productImageContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    productImage: {
        maxWidth: '100%',
        maxHeight: '100%',
    },
    productInfo: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems:'center',
        width:'100%',
        padding: theme.spacing(2),
    },
}));



const Product = () => {
    const classes = useStyles();

    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        // Fetch product data based on productId from your backend API
        // Update the product state with the fetched product data
        // For demonstration, I'm using dummy product data
        const dummyProduct = {
            id: id,
            name: `Product ${id}`,
            description: `Description of Product ${id}`,
            price: id * 10,
            quantity: id,
            image: img2,
        };
        setProduct(dummyProduct);
    }, [id]);

    const handleAddToCart = () => {
        // Add logic to handle adding the product to the cart
        console.log(`Product ${id} added to cart`);
    };

    if (!product) {
        return <Typography variant="h6">Loading...</Typography>;
    }


    return (
        <>
        <div className={classes.root}>
            <Grid container spacing={3} className={classes.productImageContainer}>
                {/* Product Image */}
                <Grid item xs={8} sm={4}  className={classes.productImageContainer}>
                    <img src={product.image} alt={product.name} className={classes.productImage} />
                </Grid>
                {/* Product Information */}
                <Grid item xs={8} sm={4} className={classes.productInfo}>
                    <Typography variant="h5" gutterBottom  align="center">
                        {product.name}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Description: {product.description}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Price: ${product.price}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Quantity: {product.quantity}
                    </Typography>
                    <Button variant="contained" color="primary" onClick={handleAddToCart}>
                        Add to Cart
                    </Button>
                    {/* Add more product information here if needed */}
                </Grid>
            </Grid>
        </div>
        </>
        
    );
};

export default Product;