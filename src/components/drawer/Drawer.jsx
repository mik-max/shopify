import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import { Typography } from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import SpaIcon from '@mui/icons-material/Spa';
import HomeIcon from '@mui/icons-material/Home';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import BackpackIcon from '@mui/icons-material/Backpack';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';
import classes from './Drawer.module.css';
export default function TemporaryDrawer() {
     const navigate = useNavigate();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
     <Typography className={classes.title} variant = 'h5' align='center'>Select Category <CategoryIcon/></Typography>
      <List>
          <ListItem disablePadding>
               <ListItemButton>
                    <ListItemIcon>
                         < ShoppingBasketIcon className={classes.icon} /> 
                    </ListItemIcon>
                    <ListItemText primary = 'Supermarket' />
               </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
               <ListItemButton>
                    <ListItemIcon>
                         < SpaIcon className={classes.icon} />
                    </ListItemIcon>
                    <ListItemText primary = 'Health and Beauty' />
               </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
               <ListItemButton>
                    <ListItemIcon>
                         < HomeIcon className={classes.icon} /> 
                    </ListItemIcon>
                    <ListItemText primary = 'Home and office' />
               </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
               <ListItemButton>
                    <ListItemIcon>
                         < PhoneAndroidIcon className={classes.icon} /> 
                    </ListItemIcon>
                    <ListItemText primary = 'Phone and Tablets' />
               </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
               <ListItemButton>
                    <ListItemIcon>
                         < ShoppingBasketIcon className={classes.icon} /> 
                    </ListItemIcon>
                    <ListItemText primary = 'Hairs' />
               </ListItemButton>
          </ListItem>   
          <ListItem disablePadding onClick={()=> {navigate('/category/bags')}}>
               <ListItemButton>
                    <ListItemIcon>
                         < BackpackIcon className={classes.icon} /> 
                    </ListItemIcon>
                    <ListItemText primary = 'Bags' />
               </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
               <ListItemButton>
                    <ListItemIcon>
                         < ShoppingBasketIcon className={classes.icon} /> 
                    </ListItemIcon>
                    <ListItemText primary = 'Shoes' />
               </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
               <ListItemButton>
                    <ListItemIcon>
                         < DesktopWindowsIcon className={classes.icon} /> 
                    </ListItemIcon>
                    <ListItemText primary = 'Home Appliances' />
               </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
               <ListItemButton>
                    <ListItemIcon>
                         < AutoFixHighIcon className={classes.icon} /> 
                    </ListItemIcon>
                    <ListItemText primary = 'Cosmetics and Deodurants' />
               </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
               <ListItemButton>
                    <ListItemIcon>
                         < CheckroomIcon className={classes.icon} /> 
                    </ListItemIcon>
                    <ListItemText primary = 'Clothings' />
               </ListItemButton>
          </ListItem> 
               
      </List>
    </Box>
  );

  return (
    <div className={classes.drawer}>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button className={classes.drawerButton} onClick={toggleDrawer(anchor, true)}><MenuIcon/></Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
