import React, {useContext} from 'react';
import Context from './context';
import {Grid, Typography, Button} from '@mui/material';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import Product from './products/Product';
import classes from './Products.module.css';

function Products({products, onAddToCart}) {
     const {darkMode} = useContext(Context);
  return (
     <div>
          <div className = {darkMode ? classes.jumbotronDark :classes.jumbotron}>
               <div className={ darkMode ? classes.captionDark :classes.caption}>
                    <Typography variant = 'h2'>Etolie Online Stores</Typography>
                    <Typography variant = 'h5'>Shop Elegantly form a wide range of goods and services available at an affordable price</Typography>
                    <div className = {classes.buttons}>
                         <Button variant='contained' className ={darkMode ? classes.startShoppingDark :classes.startShopping}>Start Shopping <ShoppingCartCheckoutIcon/></Button>
                         <Button variant = 'contained' className = {darkMode ? classes.knowMoreDark : classes.knowMore}>Know More <QuestionMarkIcon/></Button>
                    </div>
               </div>
               <div className={classes.imageDiv}>
                    <img src = '/images/landing2.png' alt = 'Caption img' />
               </div>
          </div>
          <main className= {darkMode ? classes.mainDark : classes.main}>
               <Grid container justifyContent='center' alignItems='center' spacing={4}>
                    {
                         products.map((item) => (
                              <Grid item key={item.id} xs = {12} sm = {6} md ={4} lg = {3} xl = {3} >
                                   <Product product={item} onAddToCart ={onAddToCart} />
                              </Grid>
                         ))
                    }
               </Grid>
          </main>
     </div>
    
  )
}

export default Products;

 