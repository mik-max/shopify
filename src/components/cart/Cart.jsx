import React ,{useState, useContext}from 'react';
import Context from '../context';
import {Container, Typography, Button, Grid, CircularProgress} from '@mui/material';
import {ShoppingCartCheckout, RemoveShoppingCart, ShoppingCart} from '@mui/icons-material';
import CartItem from './CartItem';
import {Link , useNavigate} from 'react-router-dom';
import classes from './Cart.module.css';
function Cart({cart, update, remove, empty}) {
     const navigate = useNavigate()
     // const isEmpty = !cart.line_items.length;
     const {darkMode} = useContext(Context);
     console.log(cart)
     if(cart.line_items == undefined) {
          console.log('cart is undefined')
          return (
               <div className={classes.spinner}>
                    <CircularProgress fontSize = 'large'/>
               </div>
          )
     }  else{
          console.log('cart is confused')
     }
     let EmptyCart = () => (
          <>
               <div className={classes.emptyCartContainer}>
                    <div className={classes.imgDiv}>
                         <img src = '/images/empty-cart.png' alt = 'empty cart' />
                    </div>
                    <div className={classes.emptyCartDetails}>
                         <Typography variant = 'h4'>You have no items in your shopping cart</ Typography>
                         <Button onClick={() => {navigate('/')}} variant = 'contained'>start adding some!</Button>
                    </div>
               </div>
          </>
     )
  return (
    <Container className={darkMode ? classes.containerDark :classes.container}>
          <div className={classes.toolBar}></div>
          <Typography gutterBottom variant = 'h4' className  = {darkMode ? classes.titleDark :classes.title }>Your Shopping Cart <ShoppingCart fontSize='large' /> </Typography>
          {!cart.line_items.length ? <EmptyCart/> :
           <>
               <Grid container justify = 'center' spacing = {3}>
                    {cart?.line_items.map((item) => (
                         <Grid item xs = {12} sm = {6} md ={4} lg = {3} key = {item.id}>
                              <CartItem item = {item} onUpdate = {update} onRemove = {remove} />
                         </Grid>
                    ))}
               </Grid>
               <div className={classes.cardDetails}>
                    <Typography variant = 'h4' className = {classes.subtotal}>
                         Subtotal: {cart?.subtotal.formatted_with_symbol}
                    </Typography>
                    <div className= {classes.buttons}>
                         <Button onClick={ () => {empty()}} className={darkMode ? classes.emptyButtonDark :classes.emptyButton} size = 'large' type = 'button' variant = 'contained'>Empty Cart <RemoveShoppingCart /></Button>
                         <Button className={darkMode ? classes.checkoutButtonDark : classes.checkoutButton} onClick = {() => {navigate('/checkout')}} size = 'large' type = 'button' variant = 'contained'>Checkout <ShoppingCartCheckout/></Button>
                         
                    </div>
               </div>
          </>}
    </Container>
  )
}

export default Cart;