import React ,{useState}from 'react';
import {Container, Typography, Button, Grid} from '@mui/material';
import CartItem from './CartItem';
import {Link , useNavigate} from 'react-router-dom';
import classes from './Cart.module.css';
function Cart({cart, update, remove, empty}) {
     const navigate = useNavigate()
     const isEmpty = !cart.line_items.length;
     console.log(isEmpty)
     
     console.log(cart)
     
  return (
    <Container className={classes.container}>
          <div className={classes.toolBar}></div>
          <Typography gutterBottom variant = 'h4' className  = {classes.title}>Your Shopping Cart</Typography>
          {isEmpty ? <Typography variant = 'h3'>You have no items in your shopping cart, 
          <Link to = '/'>start adding some!</Link>
          </ Typography> :
           <>
               <Grid container spacing = {3}>
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
                         <Button onClick={ () => {empty()}} className={classes.emptyButton} size = 'large' type = 'button' variant = 'contained' color = 'secondary'>Empty Cart</Button>
                         <Button className={classes.checkoutButton} onClick = {() => {navigate('/checkout')}} size = 'large' type = 'button' variant = 'contained' color = 'primary'>Checkout</Button>
                         
                    </div>
               </div>
          </>}
    </Container>
  )
}

export default Cart;