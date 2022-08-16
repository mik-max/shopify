import React, {useContext} from 'react';
import Context from '../context';
import TemporaryDrawer from '../drawer/Drawer';
import { AppBar, Toolbar, IconButton, Badge, Typography, Button, Menu, MenuItem} from '@mui/material';
import {ShoppingCart} from '@mui/icons-material';
import CategoryIcon from '@mui/icons-material/Category';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import SpaIcon from '@mui/icons-material/Spa';
import HomeIcon from '@mui/icons-material/Home';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import BackpackIcon from '@mui/icons-material/Backpack';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';
import LightModeIcon from '@mui/icons-material/LightMode';
import {useNavigate, useLocation} from 'react-router-dom';
import classes from './styles.module.css';
function Navbar({totalItems}) {
     const navigate = useNavigate();
     const location = useLocation();
     const {darkMode, setDarkMode} = useContext(Context);
     const [anchorEl, setAnchorEl] = React.useState(null);
     const open = Boolean(anchorEl);
     const handleClick = (event) => {
          setAnchorEl(event.currentTarget);
     };
     const handleClose = () => {
          setAnchorEl(null);
     };

  return (
    <AppBar position = 'fixed' className = {darkMode ? classes.appBarDark : classes.appBar} color = 'inherit'>
          <Toolbar>
               <TemporaryDrawer/>
               <Typography onClick = { () => {navigate('/')}}  variant = 'h6' className={classes.title} color = 'inherit'>
                    <img src = '/images/Etolie-Logo.png' alt ='Etolie Esquisite' height='25px' className={classes.image}  />
                    Etolie
               </Typography>
               <div className={classes.grow}></div>
               <div className = {classes.categoryDiv}>
                    <Button className = {classes.category} id="basic-button"aria-controls={open ? 'basic-menu' : undefined}aria-haspopup="true"aria-expanded={open ? 'true' : undefined}onClick={handleClick}>
                         Select Category <CategoryIcon/>
                    </Button>
                    <Menu id="basic-menu"anchorEl={anchorEl}open={open}onClose={handleClose}
                         MenuListProps={{
                              'aria-labelledby': 'basic-button',
                         }}
                    >
                         <MenuItem onClick={handleClose}>< ShoppingBasketIcon className={classes.icon} /> Supermarket</MenuItem>
                         <MenuItem onClick={handleClose}>< SpaIcon className={classes.icon} /> Health and Beauty</MenuItem>
                         <MenuItem onClick={handleClose}>< HomeIcon className={classes.icon} /> Home and Office</MenuItem>
                         <MenuItem onClick={handleClose}>< PhoneAndroidIcon className={classes.icon} /> Phone and tablets</MenuItem>
                         <MenuItem onClick={handleClose}><ShoppingBasketIcon className={classes.icon} /> Hairs</MenuItem>
                         <MenuItem onClick={() => {handleClose(); navigate(`/category/bags`)}}>
                              < BackpackIcon className={classes.icon} />Bags
                         </MenuItem>
                         <MenuItem onClick={handleClose}>< ShoppingBasketIcon className={classes.icon} /> Shoes</MenuItem>
                         <MenuItem onClick={handleClose}>< DesktopWindowsIcon className={classes.icon} /> Home Appliances</MenuItem>
                         <MenuItem onClick={handleClose}>< AutoFixHighIcon className={classes.icon} /> Cosmetics and Deodurants</MenuItem>
                         <MenuItem onClick={handleClose}>< CheckroomIcon className={classes.icon}/> Clothings</MenuItem>
                    </Menu>
               </div>
               <div className = {classes.toggleDiv}>
                    <input type="checkbox" className={classes.checkbox} id="chk" onChange={() => {setDarkMode(!darkMode)}} />
                    <label className={classes.label} htmlFor="chk">
                         <DarkModeIcon className="moon" fontSize='small'/>
                         <LightModeIcon className="sun" fontSize='small' aria-hidden="true"/>
                         <div className={classes.ball}></div>
                    </label>
               </div>
              
               <div className={classes.button}>
                    {location.pathname === '/cart' ? <></> : <IconButton onClick = { () => {navigate('/cart')}}  arial-lable = 'show cart items' color = 'inherit'>
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