import React from 'react'
import {Grid, Typography, Button} from '@mui/material';
import {Instagram, FacebookRounded, Twitter, YouTube} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import classes from './Footer.module.css';
function Footer() {
     const navigate = useNavigate();
  return (
    <div className= {classes.footer}>
          <div className={classes.subFooter}>
               <Grid container justify = 'center' spacing={3}>
                    <Grid classsName = {classes.item} item  xs = {12} sm = {6} md ={4} lg = {4}>
                         <Typography onClick = { () => {navigate('/')}}  variant = 'h6' className={classes.title} color = 'inherit'>
                              Etolie
                              
                              <img src = '/images/Etolie-Logo.png' alt ='Etolie Esquisite' height='25px' className={classes.image}  />
                         </Typography>
                    </Grid>
                    <Grid classsName = {classes.item} item  xs = {12} sm = {6} md ={4} lg = {4}>
                         <div className={classes.newsLetter}>
                              <Typography variant = 'h5'>New to Etolie ?</Typography>
                              <Typography variant = 'h6'>Subscribe to our newsletter to get updates on our latest offers!</Typography>
                              <form action="">
                                   <input className={classes.emailInput} type="email" name="email" id="email" />
                                   <input className={classes.submitInput} type="submit" name="submit" value="Let's Start" />
                              </form>
                              
                         </div>
                    </Grid>
                    <Grid classsName = {classes.item} item  xs = {12} sm = {6} md ={4} lg = {4}>
                         <div className={classes.socialMedia}>
                              <Typography variant = 'h4' align='center'>Follow us on</Typography>
                              <div>
                                   <ul className={classes.socialIconsDiv}>
                                        <li><a href="#"><FacebookRounded/></a></li>
                                        <li><a href="#"><Instagram/></a></li>
                                        <li><a href="#"><Twitter/></a></li>
                                        <li><a href=""><YouTube/></a></li>
                                   </ul>
                              </div>
                         </div>
                    </Grid>
               </Grid>
          </div>
          <Grid mt= {5} container justify = 'center' spacing={4}>
               <Grid item  xs = {12} sm = {6} md ={4} lg = {4}>
                    <div className={classes.footerMenu}>
                         <Typography variant = 'h5'>Help Center</Typography>
                         <ul>
                              <li><a href="#">How to shop on Etolie</a></li>
                              <li><a href="#">Dilivery options</a></li>
                              <li><a href="#">Available Outlets</a></li>
                              <li><a href="">Report a product</a></li>
                         </ul>
                    </div>
               </Grid>
               <Grid item  xs = {12} sm = {6} md ={4} lg = {4}>
                    <div className={classes.footerMenu}>
                         <Typography variant = 'h5'>About Etolie</Typography>
                         <ul>
                              <li><a href="#">About Us</a></li>
                              <li><a href="#">Products</a></li>
                              <li><a href="#">Terms and Conditions</a></li>
                              <li><a href="">Privacy Policy</a></li>
                         </ul>
                    </div>
               </Grid>
               <Grid item  xs = {12} sm = {6} md ={4} lg = {4}>
                    <div className={classes.footerMenu}>
                         <Typography variant = 'h5'>Contact Us</Typography>
                         <ul >
                              <li><a href="tel:07087509689">07087509689</a></li>
                              <li><a href="mailto:etolieworld@gmail.com">etolieworld@gmail.com</a></li>
                              <li><a href="#terms">Terms and Conditions</a></li>
                              <li><a href="#privacy">Privacy Policy</a></li>
                         </ul>
                    </div>
               </Grid>
          </Grid>
    </div>
  )
}

export default Footer;