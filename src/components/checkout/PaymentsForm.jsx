import React, {useContext} from 'react';
import Context from '../context';
import {Typography, Button, Divider} from '@mui/material';
import {Elements, CardElement, ElementsConsumer} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import Review from './Review';
import classes from './PaymentsForm.module.css'
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)
function PaymentsForm({checkoutToken, backStep, shippingData, nextStep, onCaptureCheckout}) {
     const {darkMode} = useContext(Context);
     const handleSubmit = async (event, elements, stripe) => {
          event.preventDefault();
          if(!stripe || !elements) return ;

          const cardElement = elements.getElement(CardElement)
          const {error, paymentMethod} =  await stripe.createPaymentMethod({type: 'card', card: cardElement})
          console.log(paymentMethod)
          if(error){
               console.log(error)
          }else{
               const orderData = {
                    line_items: checkoutToken.line_items,
                    customer: {id: shippingData.id, firstname: shippingData.firstName, lastname: shippingData.lastName, email: shippingData.email},
                    shipping: { name: 'Primary', street: shippingData.address, town_city: shippingData.city, county_state: shippingData.shippingSubdivision, postal_zip_code: shippingData.zip, country: shippingData.shippingCountry },
                    fulfillment: { shipping_method: shippingData.shippingOption },
                    payment: {
                         gateway: 'gway_X5ngvm6vGLR8lp',
                         stripe: {
                              payment_method_id: paymentMethod.id,
                              action: 'authorize'
                         },
                    },
               }
               onCaptureCheckout(checkoutToken.id, orderData);
               nextStep();
          }
     }
  return (
    <div>
          {checkoutToken && <Review  checkoutToken = {checkoutToken} />}
          <Divider/>
          <Typography variant = 'h6' gutterBottom style = {{margin: '20px 0px'}}>Payment Method</Typography>
          <Elements stripe={stripePromise}>
               <ElementsConsumer>
                    { ({elements, stripe}) => (
                         <form onSubmit={(e) => {handleSubmit(e, elements, stripe)}}>
                              <CardElement/>
                              <br/><br/>
                              <div style = {{ display : 'flex', justifyContent: 'space-between'}}>
                                   <Button onClick={backStep} variant = 'outlined' className = {darkMode ? classes.backButtonDark :classes.backButton}>Back</Button>
                                   <Button className = {darkMode ? classes.nextButtonDark :classes.nextButton}  type = 'submit' variant='contained' disabled = {!stripe} >
                                        Pay {checkoutToken.subtotal.formatted_with_symbol}
                                   </Button>
                              </div>
                         </form>
                    )}
               </ElementsConsumer>
          </Elements>
    </div>
  )
}

export default PaymentsForm