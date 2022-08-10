import React, {useContext} from 'react';
import Context from '../context';
import { AppBar, Toolbar, IconButton, Badge, Typography } from '@mui/material';
import {ShoppingCart} from '@mui/icons-material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import {useNavigate, useLocation} from 'react-router-dom'
import classes from './styles.module.css';
function Navbar({totalItems}) {
     const navigate = useNavigate();
     const location = useLocation();
     const {darkMode, setDarkMode} = useContext(Context);

  return (
    <AppBar position = 'fixed' className = {darkMode ? classes.appBarDark : classes.appBar} color = 'inherit'>
          <Toolbar>
               <Typography onClick = { () => {navigate('/')}}  variant = 'h6' className={classes.title} color = 'inherit'>
                    <img src = '/images/Etolie-Logo.png' alt ='Etolie Esquisite' height='25px' className={classes.image}  />
                    Etolie
               </Typography>
               <div className={classes.grow}></div>
               <div className = {classes.toggleDiv}>
                    <input type="checkbox" className={classes.checkbox} id="chk" onChange={() => {setDarkMode(!darkMode)}} />
                    <label className={classes.label} htmlFor="chk">
                         <DarkModeIcon className="moon" fontSize='small'/>
                         <LightModeIcon className="sun" fontSize='small' aria-hidden="true"/>
                         <div className={classes.ball}></div>
                    </label>
               </div>
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