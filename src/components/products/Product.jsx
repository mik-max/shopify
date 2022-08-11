import React, {useContext, useState} from 'react';
import Context from '../context';
import {Card, CardMedia, CardActions, Typography, IconButton, CardContent, Snackbar, Alert} from '@mui/material';
import {AddShoppingCart} from '@mui/icons-material';
import classes from './styles.module.css';
function Product({product, onAddToCart}) {
     const {darkMode} = useContext(Context);
     const [snackBar, setSnackBar,] = useState({
          open: false,
          vertical: 'top',
          horizontal: 'center',
     });
     const { vertical, horizontal, open } = snackBar;
     const openSnackbar = (newState) => {
          setSnackBar({ open: true, ...newState });
          console.log('changed state')
     };
     const handleClose = () => {
          setSnackBar({ ...snackBar, open: false });
     };
     function truncate(str, n){
          return str?.length > n ? str.substr(0, n-1) + "..." : str;
     }
  return (
    <Card className = {darkMode ? classes.rootDark :classes.root} >
          <CardMedia className = {darkMode ? classes.mediaDark :classes.media}  image={product.image.url} title = {product.name} />
          <CardContent className={darkMode ? classes.cardContentDivDark :classes.cardContentDiv}>
               <div className={classes.cardContent}>
                    <Typography variant = 'h5' gutterBottom >
                         {product.name}
                    </Typography>
                    <Typography variant = 'h5'  >
                         {product.price.formatted_with_symbol}
                    </Typography>
               </div>
               <Typography dangerouslySetInnerHTML = {{ __html: truncate(product.description, 40)}} variant = 'body2' color ='GrayText'  />
          </CardContent>
          <CardActions disableSpacing className={classes.cardActions}>
                <IconButton className = {darkMode && classes.addToCartDark} arial-label = 'Add to cart' onClick ={ () => {onAddToCart(product.id, 1); openSnackbar({vertical: 'top',
                horizontal: 'right',})}}>
                    <AddShoppingCart/>
                </IconButton>
          </CardActions>
     
          <Snackbar anchorOrigin={{ vertical, horizontal }} open={open} autoHideDuration={6000} onClose={handleClose} key={vertical + horizontal}>
               <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Item has sucessfully been added to cart!
               </Alert>
          </Snackbar>
          
    </Card>
  )
}

export default Product;