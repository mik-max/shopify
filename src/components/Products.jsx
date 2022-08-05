import React, {useContext} from 'react';
import Context from './context';
import {Grid} from '@mui/material'
import Product from './products/Product';
import classes from './Products.module.css';

function Products({products, onAddToCart}) {
     const {darkMode, setDarkMode} = useContext(Context);
  return (
    <main className= {darkMode ? classes.mainDark : classes.main}>
          <Grid container justify = 'center' spacing={4}>
               {
                    products.map((item) => (
                         <Grid item key={item.id} xs = {12} sm = {6} md ={4} lg = {3}>
                              <Product product={item} onAddToCart ={onAddToCart} />
                         </Grid>
                    ))
               }
          </Grid>
    </main>
  )
}

export default Products;

 