import React from 'react'
import {Typography, List, ListItem, ListItemText } from '@mui/material'
function Review({checkoutToken}) {
     function truncate(str, n){
          return str?.length > n ? str.substr(0, n-1) + "..." : str;
     }
     if(checkoutToken)
  return (
    <>
          <Typography  variant = 'h6' gutterBottom>Order Summary</Typography>
          <List disablePadding>
               {checkoutToken.line_items.map((product) => (
                    <ListItem style={{ padding: '10px 0px' }} key={product.name}>
                         <ListItemText primary={truncate(product.name, 18)} secondary={`Quantity: ${product.quantity}`} />
                         <Typography variant="body2">{product.line_total.formatted_with_symbol}</Typography>
                  </ListItem>
               ))}
               <ListItem style={{ padding: '10px 0px' }}>
                    <ListItemText primary="Total" />
                    <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
                         {checkoutToken.subtotal.formatted_with_symbol}
                    </Typography>
               </ListItem>
          </List>
    </>
  )
}

export default Review;