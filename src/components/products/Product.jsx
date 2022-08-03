import React from 'react'
import {Card, CardMedia, CardActions, Typography, IconButton, CardContent} from '@mui/material';
import {AddShoppingCart} from '@mui/icons-material';
import classes from './styles.module.css';
function Product({product, onAddToCart}) {
     
  return (
    <Card className = {classes.root} >
          <CardMedia className = {classes.media}  image={product.image.url} title = {product.name} />
          <CardContent>
               <div className={classes.cardContent}>
                    <Typography variant = 'h5' gutterBottom >
                         {product.name}
                    </Typography>
                    <Typography variant = 'h5'  >
                         {product.price.formatted_with_symbol}
                    </Typography>
               </div>
               <Typography dangerouslySetInnerHTML = {{ __html: product.description}} variant = 'body2' color ='GrayText' />
          </CardContent>
          <CardActions disableSpacing className={classes.cardActions}>
                <IconButton arial-label = 'Add to cart' onClick ={ () => {onAddToCart(product.id, 1);}}>
                    <AddShoppingCart/>
                </IconButton>
          </CardActions>
          
    </Card>
  )
}

export default Product;