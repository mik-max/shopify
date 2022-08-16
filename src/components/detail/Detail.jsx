import React, {useState, useEffect} from 'react';
import { commerce } from '../../lib/commerce';
import { Container , CircularProgress, Typography, Button, Divider,Snackbar, Alert} from '@mui/material';
import { useParams } from 'react-router-dom';
import {AddShoppingCart} from '@mui/icons-material';
import classes from './Detail.module.css';


function Detail({onAddToCart}) {
     const {id} = useParams();
     const [product, setproduct] = useState({})
     const [snackBar, setSnackBar,] = useState({
          open: false,
          vertical: 'top',
          horizontal: 'center',
     });
     const { vertical, horizontal, open } = snackBar;
     const openSnackbar = (newState) => {
          setSnackBar({ open: true, ...newState });
          console.log('changed state')
     };
     const handleClose = () => {
          setSnackBar({ ...snackBar, open: false });
     };
     useEffect(() => {
          const getProduct = async() => {
               setproduct((await commerce.products.retrieve(id)));
               console.log((await commerce.products.retrieve(id)))
          }
          getProduct();
     }, [id])
     

     let slideIndex = 1;
     
     function plusSlides(n) {
       showSlides(slideIndex += n);
     }
     
     function currentSlide(n) {
       showSlides(slideIndex = n);
     }
     // showSlides(slideIndex);
     function showSlides(n) {
       let i;
       let slides = document.getElementsByClassName("mySlides");
       let dots = document.getElementsByClassName("demo");
       let captionText = document.getElementById("caption");
       if (n > slides.length) {slideIndex = 1}
       if (n < 1) {slideIndex = slides.length}
       for (i = 0; i < slides.length; i++) {
         slides[i].style.display = "none";
       }
       for (i = 0; i < dots.length; i++) {
         dots[i].className = dots[i].className.replace(" active", "");
       }

       if(slides[slideIndex-1] === undefined){
          console.log('something entered here')
       }else{
          slides[slideIndex-1].style.display = "block";
          dots[slideIndex-1].className += " active";
          captionText.innerHTML = dots[slideIndex-1].alt;
       }
     }
     useEffect(() => {
          
          showSlides(slideIndex);
     }, )
     
     if(product.assets === undefined) {
          console.log('cart is undefined')
          return (
               <div className={classes.spinner}>
                    <div className={classes.spinnerDiv}>
                         <CircularProgress fontSize = 'large'/>  
                    </div>
               </div>
          )
     }  
  return (
    <Container className={classes.Container}>
          <div className = {classes.photoGallery}>
               <div className='container'>
                    {
                         product.assets.map((asset, index) => (
                              <div className='mySlides' key = {index}>
                                   <div className='numbertext'>{index + 1} / {product.assets.length}</div>
                                   <img src={asset.url} alt = 'gallery'/>
                              </div>
                         ))
                    }
                    
                    <a className='prev' onClick={() => {plusSlides(-1);}}>❮</a>
                    <a className='next' onClick={() => {plusSlides(1);}}>❯</a>

                    <div className='captionContainer'>
                    <p id="caption"></p>
                    </div>

                    <div className='row'>
                         {
                              product.assets.map((asset, index) => (
                                   <div className='column' key = {asset.id}>
                                        <img className="demo cursor" src={asset.url} onClick={() => {currentSlide(index + 1);}} alt="Available Variants"/>
                                   </div>
                              ))
                         }
                    
                    </div>
               </div>
          </div>
          <div className = {classes.description}>
               <Typography className = {classes.title} variant = 'h3' align = 'center'>
                    Etolie Online Stores
                    <img src = '/images/Etolie-Logo.png' alt ='Etolie Esquisite' height='25px' className={classes.image}  />
               </Typography>
               <Typography variant = 'h5' dangerouslySetInnerHTML = {{ __html: product.description}} />
               <Divider/>
               <Typography variant = 'h4'>Current Price: {product.price.formatted_with_symbol}</Typography>
               <Button className = {classes.checkoutButton} onClick = {() => {onAddToCart(id, 1); openSnackbar({vertical: 'top',
                horizontal: 'right',});}} variant = 'contained'> Add to cart <AddShoppingCart/></Button>
          </div>
          <Snackbar anchorOrigin={{ vertical, horizontal }} open={open} autoHideDuration={6000} onClose={handleClose} key={vertical + horizontal}>
               <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Item has sucessfully been added to cart!
               </Alert>
          </Snackbar>
    </Container>
    
  )
}

export default Detail;