import React, {useState, useEffect, useContext} from 'react';
import { commerce } from '../../lib/commerce';
import classes from './Category.module.css';
import { useParams } from 'react-router-dom';
import {Grid, CircularProgress,} from '@mui/material';
import Context from '../context';
import Product from '../products/Product';
function Category({onAddToCart}) {
     const {categorySlug} = useParams()
     const [loading, setloading] = useState(false)
     const [category, setCategory] = useState([])
     const {darkMode} = useContext(Context)
     
     useEffect(() => {
          const fetchProducts = async () => {
               setloading(true)
               const {data} = await commerce.products.list({
                    category_slug: [`${categorySlug}`],
               });
               setCategory(data);
               setloading(false);
          }
          fetchProducts();
     }, [categorySlug])
     
  return (
    <div className={darkMode ?classes.ContainerDark :classes.Container}>
         {loading &&  
               <div className={classes.spinner}>
                    <div className={classes.spinnerDiv}>
                         <CircularProgress fontSize = 'large'/>  
                    </div>
               </div>
          }
          <Grid container justify = 'center' spacing={4}>
              {
                    category.map((item, index) => (
                         <Grid item key={item.id} xs = {12} sm = {6} md ={4} lg = {3}>
                              <Product product={item} onAddToCart ={onAddToCart} />
                         </Grid>
                    ))
              }
          </Grid>
    </div>
  )
}

export default Category