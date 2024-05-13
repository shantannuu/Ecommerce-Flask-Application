import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid, makeStyles, Button } from '@material-ui/core';
import { Link, Link as RouterLink } from 'react-router-dom';
import img1 from 'C:/Users/spatil/Documents/Ecommerce-Flask-Application/ecommerce-frontend/src/media/image1.jpg'

// import img3 from `C:/Users/spatil/Documents/Ecommerce-Flask-Application/ecommerce-frontend/public/image (3).jpg`
// import img4 from `C:/Users/spatil/Documents/Ecommerce-Flask-Application/ecommerce-frontend/public/image (4).jpg`
// import img5 from `C:/Users/spatil/Documents/Ecommerce-Flask-Application/ecommerce-frontend/public/image (5).jpg`
// import img6 from `C:/Users/spatil/Documents/Ecommerce-Flask-Application/ecommerce-frontend/public/image (6).jpg`
// import img7 from `C:/Users/spatil/Documents/Ecommerce-Flask-Application/ecommerce-frontend/public/image (7).jpg`
// import img8 from `C:/Users/spatil/Documents/Ecommerce-Flask-Application/ecommerce-frontend/public/image (8).jpg`
// import img9 from `C:/Users/spatil/Documents/Ecommerce-Flask-Application/ecommerce-frontend/public/image (9).jpg`
// import img10 from `C:/Users/spatil/Documents/Ecommerce-Flask-Application/ecommerce-frontend/public/image (10).jpg`
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: theme.spacing(2),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardContent: {
        flexGrow: 3,
    },
    pagination: {
        marginTop: theme.spacing(2),
        textAlign: 'center',
    },
    productImage: {
        width: '100%',
        height: 'auto',
    },
}));

const ProductCards = () => {
    const classes = useStyles();
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const productsPerPage = 10;

    useEffect(() => {
        // Fetch product data from your backend API
        // Update setProducts and setTotalPages based on the fetched data
        // For demonstration, I'm initializing products with dummy data
        const dummyProducts = Array.from({ length: 50 }, (_, index) => ({
            id: index + 1,
            name: `Product ${index + 1}`,
            image: img1,
            description: `Description of Product ${index + 1}`,
            price: (index + 1) * 10,
            quantity: index + 1,
        }));
        setProducts(dummyProducts);
        setTotalPages(Math.ceil(dummyProducts.length / productsPerPage));
    }, []);

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const renderProductCards = () => {
        const startIndex = (page - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        return products.slice(startIndex, endIndex).map((product) => (
            <Grid item key={product.id} xs={15} sm={6} md={4} lg={3}>
                <Link component={RouterLink} to={`/product/${product.id}`} color="inherit" underline="none">
                    <Card className={classes.card}>
                        <CardContent className={classes.cardContent}>
                            <img src={product.image} alt={product.name} className={classes.productImage} />
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
                        </CardContent>
                    </Card>
                </Link>
            </Grid>
        ));
    };

    const renderPagination = () => (
        <div className={classes.pagination}>
            <Button
                variant="outlined"
                disabled={page === 1}
                onClick={() => handlePageChange(page - 1)}
            >
                Previous
            </Button>
            <Typography variant="body1" component="span" style={{ margin: '0 10px' }}>
                Page {page} of {totalPages}
            </Typography>
            <Button
                variant="outlined"
                disabled={page === totalPages}
                onClick={() => handlePageChange(page + 1)}
            >
                Next
            </Button>
        </div>
    );

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                {renderProductCards()}
            </Grid>
            {renderPagination()}
        </div>
    );
};

export default ProductCards;
