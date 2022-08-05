import React, {useContext} from 'react';
import Context from '../context';
import {Typography, Button, Card, CardActions, CardContent, CardMedia} from '@mui/material';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import classes from './CartItem.module.css';
function CartItem({item, onUpdate, onRemove}) {
     const {darkMode} = useContext(Context);
  return (

    <div>
          <Card className = {darkMode ? classes.rootDark :classes.root}>
               <CardMedia image = {item.image.url} alt ={item.name} className = {classes.media} />
               <CardContent className = {classes.cardContent}>
                    <Typography variant = 'h5' gutterBottom>{item.name}</Typography>
                    <Typography variant = 'h6'>{item.line_total.formatted_with_symbol}</Typography>
               </CardContent>
               <CardActions className = {classes.cardActions}>
                    <div className = {classes.buttons}>
                         <Button className={darkMode ? classes.actionButtonDark :classes.actionButton} onClick = {() => {onUpdate(item.id, item.quantity - 1);}} type = 'button' size = 'small'><RemoveIcon/></Button>
                         <Typography>{item.quantity}</Typography>
                         <Button className={darkMode ? classes.actionButtonDark :classes.actionButton} onClick = {() => {onUpdate(item.id, item.quantity + 1);}} type = 'button' size = 'small'><AddIcon/></Button>
                    </div>
                    <Button className={darkMode ? classes.removeButtonDark :classes.removeButton} varant = 'contained' type = 'button' onClick = {() => onRemove(item.id)}>Remove <RemoveShoppingCartIcon/></Button>
               </CardActions>
          </Card>
    </div>
  )
}

export default CartItem