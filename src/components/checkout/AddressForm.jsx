import React, {useState, useEffect} from 'react'
import {InputLabel, Select, MenuItem, Button, Grid, Typography, TextField} from '@mui/material';
import { commerce } from '../../lib/commerce';
import {Link , useNavigate} from 'react-router-dom';
import FormInput from './CustomTextField';
import { useForm, FormProvider } from "react-hook-form";
function AddressForm({checkoutToken, next}) {
     const [shippingCountries, setShippingCountries] = useState([])
     const [shippingCountry, setShippingCountry] = useState('')
     const [shippingSubdivisions, setShippingSubdivisions] = useState([])
     const [shippingSubdivision, setShippingSubdivision] = useState('')
     const [shippingOptions, setShippingOptions] = useState([])
     const [shippingOption, setShippingOption] = useState('')
     const [firstName, setFirstName] = useState('')
     const [lastName, setLastName] = useState('')
     const [email, setEmail] = useState('')
     const [address, setAddress] = useState('')
     const [city, setCity] = useState('')
     const [zipcode, setZipCode] = useState('')

     const methods = useForm();
     const navigate = useNavigate();
     const country = Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name }));
     const state = Object.entries(shippingSubdivisions).map(([code, name]) => ({ id: code, label: name }));
     const options = shippingOptions.map((sO) => ({id: sO.id, label: `${sO.description} -  (${sO.price.formatted_with_symbol})`}))
     const fetchShippingCountries = async (checkoutToken) => {
          const {countries} = await commerce.services.localeListShippingCountries(checkoutToken)
          setShippingCountries(countries);
          setShippingCountry(Object.keys(countries)[0])
          console.log(countries)
     }
     const fetchSubdivisions = async (countryCode) => {
          const {subdivisions} = await commerce.services.localeListSubdivisions(countryCode);
          setShippingSubdivisions(subdivisions)
          setShippingSubdivision(Object.keys(subdivisions)[0])
     }

     const fetchShippingOptions = async (checkoutTokenId, country, region = null) => {
          const options = await commerce.checkout.getShippingOptions(checkoutTokenId, {country, region});
          setShippingOptions(options);
          setShippingOption(options[0].id)

     }
     useEffect(() => {
       fetchShippingCountries(checkoutToken.id)
     }, [checkoutToken.id])
     useEffect(() => {
         if(shippingCountry) fetchSubdivisions(shippingCountry)
     }, [shippingCountry])
     useEffect(() => {
         if(shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision)
     }, [shippingSubdivision, checkoutToken.id, shippingCountry])
     
  return (
    <>
          <Typography variant='h6' gutterBottom>Shipping Address</Typography>
          <FormProvider {...methods}>
               <form onSubmit={methods.handleSubmit((data) => {next({firstName, lastName, address, email, city, zipcode, shippingCountry, shippingSubdivision, shippingOption})})}>
                    <Grid container spacing = {3}>
                         <Grid item xs = {12} sm = {6}>
                              <TextField id="firstName" value={firstName} onChange = {e => setFirstName(e.target.value)} label="First Name" required fullWidth variant="standard" type= 'text' />
                         </Grid>
                         <Grid item xs = {12} sm = {6}>
                              <TextField id="lastName" value={lastName} onChange = {e => setLastName(e.target.value)} label="Last Name" required fullWidth variant="standard" type= 'text' />
                         </Grid>
                         <Grid item xs = {12} sm = {6}>
                              <TextField id="address" value={address} onChange = {e => setAddress(e.target.value)} label="Address" required fullWidth variant="standard" type = 'text' />
                         </Grid>
                         <Grid item xs = {12} sm = {6}>
                              <TextField id="email" value={email} onChange = {e => setEmail(e.target.value)} label="Email Address" required fullWidth variant="standard" type = 'email' />
                         </Grid>
                         <Grid item xs = {12} sm = {6}>
                              <TextField id="city" value={city} onChange = {e => setCity(e.target.value)} label="City" required fullWidth variant="standard" type = 'text' />
                         </Grid>
                         <Grid item xs = {12} sm = {6}>
                              <TextField id="zipcode" value={zipcode} onChange = {e => setZipCode(e.target.value)} label="Zipcode" required fullWidth variant="standard" type = 'text' />
                         </Grid>
                         <Grid item xs = {12} sm = {6}>
                              <InputLabel>Shipping Country</InputLabel>
                              <Select value = {shippingCountry} fullWidth onChange={(e) => {setShippingCountry(e.target.value)}}>
                                   {country.map((item) => (
                                        <MenuItem key={item.id} value={item.id}>
                                             {item.label}
                                        </MenuItem>
                                   ))}
                              </Select>
                         </Grid>
                         <Grid item xs = {12} sm = {6}>
                              <InputLabel>Shipping Sub-divisions</InputLabel>
                              <Select value = {shippingSubdivision} fullWidth onChange={ (e) => {setShippingSubdivision(e.target.value)}}>
                                   {state.map((item) => (
                                        <MenuItem key={item.id} value={item.id}>
                                             {item.label}
                                        </MenuItem>
                                   ))}
                              </Select>
                         </Grid>
                         <Grid item xs = {12} sm = {6}>
                              <InputLabel>Shipping Options</InputLabel>
                              <Select value = {shippingOption} fullWidth onChange={ (e) => {setShippingOption(e.target.value)}}>
                                   {options.map((item) => (
                                        <MenuItem key={item.id} value={item.id}>
                                             {item.label}
                                        </MenuItem>
                                   ))}
                              </Select>
                         </Grid>
                         
                    </Grid>
                    <br />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button onClick={() => {navigate('/cart')}} variant="outlined" >Back to Cart</Button>
                    <Button type="submit" variant="contained" color="primary">Next</Button>
                    </div>
               </form>
          </FormProvider>
    </>
  )
}

export default AddressForm