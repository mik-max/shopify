import React, {useState, useEffect, useRef}from 'react';
import { commerce } from '../../lib/commerce';
import {useNavigate} from 'react-router-dom'
import {Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button, CssBaseline} from '@mui/material';
import AddressForm from './AddressForm';
import PaymentsForm from './PaymentsForm';
import classes from './Checkout.module.css'
const steps = ['Shipping Address', 'Payment details']
function Checkout({cart, order, onCaptureCheckout, error}) {
     const navigate = useNavigate()
     const shouldLog = useRef(true)
     const [activeStep, setActiveStep] = useState(0);
     const [checkoutToken, setCheckoutToken] = useState(null);
     const [shippingData, setShippingData] = useState({})
     console.log(cart.id)
    
     
     
     useEffect(() => {
          const generateToken = async () => {
               try {
                    const token = await commerce.checkout.generateToken(cart?.id, {type: 'cart'})
                    setCheckoutToken(token);
                    console.log(token)
               } catch (error) {
                    // navigate('/')
               }
               
          }
          generateToken();
     // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [cart])

     const nextStep = () => setActiveStep(activeStep + 1)
     const backStep = () => setActiveStep(activeStep - 1)
     const next = (data) => {
          setShippingData(data);
          nextStep();
     }


     const Form = () => activeStep === 0 ? <AddressForm checkoutToken = {checkoutToken} next = {next}/> : <PaymentsForm shippingData = {shippingData} checkoutToken = {checkoutToken} backStep = {backStep} nextStep = {nextStep} onCaptureCheckout = {onCaptureCheckout} />
     let Confirmation = () => order.customer ? (
         <>
               <cssBaseLine/>
                <div>
                    <Typography variant = 'h5'>Thank You for your purchase {order.customer.firstname} {order.customer.lastname} </Typography>
                    <Typography variant='h6'> We have also sent you a confirmation mail containing details of your purchase. </Typography>
                    <Typography variant = 'h6' className = {classes.thanks}>With ❤️ from Etolie </Typography>
                    <Divider className = {classes.divider} /> 
                    <Typography variant = 'subtitle2'>Order ref: {order.customer_reference} </Typography>
               </div>
               <br/>
               <Button variant = 'outlined' onClick = {() => {navigate('/');}}>Back to Home</Button>
         </>
     ) : (
          <div className={classes.spinner}>
               <CircularProgress/>
          </div>
     )
     if(error){
       <>
          <Typography>Error: {error}</Typography>
          <br/>
          <Button variant = 'outlined' onClick = {() => {navigate('/')}}>Back to Home</Button>
       </> 
     }

  if(cart.id === undefined) return 'Loading';
  return (
    <>
         <main className = {classes.layout}>
               <Paper className = {classes.paper}>
                    <Typography variant = 'h4' align='center'>Checkout</Typography>
                    <Stepper activeStep={activeStep} className ={classes.stepper}>
                         {steps.map((step, index) => (
                              <Step key={index}>
                                   <StepLabel>{step}</StepLabel>
                              </Step>
                         ))}
                    </Stepper>
                    {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form/>}
               </Paper>
          </main> 
    </>
  )
}


export default Checkout;