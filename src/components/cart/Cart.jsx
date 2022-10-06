import React ,{useContext}from 'react';
import Context from '../context';
import {Container, Typography, Button, Grid, CircularProgress} from '@mui/material';
import {ShoppingCartCheckout, RemoveShoppingCart, ShoppingCart} from '@mui/icons-material';
import CartItem from './CartItem';
import {useNavigate} from 'react-router-dom';
import classes from './Cart.module.css';
function Cart({cart, update, remove, empty}) {
     const navigate = useNavigate()
     // const isEmpty = !cart.line_items.length;
     const {darkMode} = useContext(Context);
     console.log(cart)
     if(cart.line_items === undefined) {
          console.log('cart is undefined')
          return (
               <div className={classes.spinner}>
                    <CircularProgress fontSize = 'large'/>
               </div>
          )
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
               <Grid container justifyContent='center' alignItems='center' spacing = {3}>
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
                         <button onClick={ () => {empty()}} className={darkMode ? classes.emptyButtonDark :classes.emptyButton}  type = 'button' >
                              Empty Cart <RemoveShoppingCart />
                              <span className={classes.blobBtnInner}>
                                   <span className={classes.blobBtnBlobs}>
                                        <span className={classes.blobBtnBlob}></span>
                                        <span className={classes.blobBtnBlob}></span>
                                        <span className={classes.blobBtnBlob}></span>
                                        <span className={classes.blobBtnBlob}></span>
                                   </span>
                              </span>
                         </button>
                         <Button className={darkMode ? classes.checkoutButtonDark : classes.checkoutButton} onClick = {() => {navigate('/checkout')}} size = 'large' type = 'button' variant = 'contained'>Checkout <ShoppingCartCheckout/></Button>
                         
                    </div>
                                   
               </div>
               <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
               <defs>
               <filter id="goo">
                    <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10"></feGaussianBlur>
                    <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7" result="goo"></feColorMatrix>
                    <feBlend in2="goo" in="SourceGraphic" result="mix"></feBlend>
               </filter>
               </defs>
               </svg>
          </>}
    </Container>
  )
}

export default Cart;