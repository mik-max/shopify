import React from 'react'
import {Typography, Button, Card, CardActions, CardContent, CardMedia} from '@mui/material';
import classes from './CartItem.module.css';
function CartItem({item, onUpdate, onRemove}) {
  return (
    <div>
          <Card>
               <CardMedia image = {item.image.url} alt ={item.name} className = {classes.media} />
               <CardContent className = {classes.cardContent}>
                    <Typography variant = 'h5'>{item.name}</Typography>
                    <Typography variant = 'h5'>{item.line_total.formatted_with_symbol}</Typography>
               </CardContent>
               <CardActions className = {classes.cardActions}>
                    <div className = {classes.buttons}>
                         <Button onClick = {() => {onUpdate(item.id, item.quantity - 1);}} type = 'button' size = 'small'> -</Button>
                         <Typography>{item.quantity}</Typography>
                         <Button onClick = {() => {onUpdate(item.id, item.quantity + 1);}} type = 'button' size = 'small'> +</Button>
                    </div>
                    <Button varant = 'contained' type = 'button' onClick = {() => onRemove(item.id)}>Remove</Button>
               </CardActions>
          </Card>
    </div>
  )
}

export default CartItem