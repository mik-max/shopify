import React, {useState, useEffect, useRef, useContext} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { commerce } from './lib/commerce';
import Context from './components/context';
import Products from './components/Products';
import Navbar from './components/Navbar/Navbar';
import Cart from './components/cart/Cart';
import Checkout from './components/checkout/Checkout';
import './App.css';

function App() {
     const shouldLog = useRef(true)
     const  [products, setProducts] = useState([])
     const [cart, setCart] = useState({})
     const [order, setOrder] = useState({})
     const[errorMessage, setErrorMessage] = useState('');
     const {darkMode} = useContext(Context)
     
     const fetchProducts = async () => {
          const {data} = await commerce.products.list();
          setProducts(data)
     }
     const fetchCart = async () => {
          setCart(await commerce.cart.retrieve())
     }
    
      const handleAddToCart = async (productId, quantity) => {
          await commerce.cart.add(productId, quantity);
          fetchCart();
          console.log(cart)
     }
     const updateCartQuantitiy = async (productId, quantity)  => {
          await commerce.cart.update(productId, {quantity});
          fetchCart();
     }

     const removeFromCart = async (productId) => {
          await commerce.cart.remove(productId)
          fetchCart();
     }
     const emptyCart = async () => {
          await commerce.cart.empty();
          fetchCart();
     }
     // const refreshCart = async () => {
     //      await commerce.cart.refresh();

     // }
     const handleCaptureCheckout = async (checkoutTokenId, newOrder) =>{
          try {
               const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
               setOrder(incomingOrder);
               console.log('capturedData')
               emptyCart();
          } catch (error) {
               console.log('could not capture data')
               setErrorMessage(error.data.error.message)
          }
     }
     useEffect(() => {
          
          if(shouldLog.current){
               shouldLog.current = false;
               console.log('mounting');
               console.log(shouldLog.current)
               fetchCart();
               fetchProducts();
          }
     
     }, [])
     
     return (
          <>
              <div className =  {darkMode ? 'AppDark' :'App'}>
                    <BrowserRouter>
                         <Navbar totalItems = {cart.total_items }/>
                         <Routes>
                              <Route path = '/' element = {<Products products = {products} onAddToCart = {handleAddToCart}/>} />
                              <Route path = '/cart' element = {<Cart cart = {cart} update = {updateCartQuantitiy} remove = {removeFromCart} empty = {emptyCart} />} />

                              {!shouldLog.current && <Route path = '/checkout' element = {<Checkout cart = {cart} order = {order} onCaptureCheckout = {handleCaptureCheckout} error = {errorMessage} />} />}
                         </Routes>
                    </BrowserRouter> 
               </div>
          </>
     );
}

export default App;

