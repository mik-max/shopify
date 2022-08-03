import React, {useState, useEffect} from 'react'
import { AppBar, Toolbar, IconButton, Badge, Menu, MenuItem, Typography } from '@mui/material';
import {ShoppingCart} from '@mui/icons-material';
import {useNavigate, useLocation} from 'react-router-dom'
import classes from './styles.module.css';
function Navbar({totalItems}) {
     const navigate = useNavigate();
     const location = useLocation();
  return (
    <AppBar position = 'fixed' className = '' color = 'inherit'>
          <Toolbar>
               <Typography onClick = { () => {navigate('/')}}  variant = 'h6' className={classes.title} color = 'inherit'>
                    <img src = '/images/Etolie-Logo.png' alt ='Etolie Esquisite' height='25px' className={classes.image}  />
                    Etolie
               </Typography>
               <div className={classes.grow}></div>
               <div className={classes.button}>
                    {location.pathname === '/' && <IconButton onClick = { () => {navigate('/cart')}}  arial-lable = 'show cart items' color = 'inherit'>
                         <Badge badgeContent = {totalItems} color = 'warning' >
                              <ShoppingCart/>
                         </Badge>
                    </IconButton>}
                    
               </div>
          </Toolbar>
    </AppBar>
  )
}

export default Navbar