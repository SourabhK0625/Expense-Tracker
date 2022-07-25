import React, {useContext} from "react";
import CartProvider from "./components/Cart/CartProvider";
import Login from './components/Pages/Login';
import {Redirect, Route , Switch} from 'react-router-dom'
import CartContext from "./components/Cart/CartContext";
import Welcome from "./components/Pages/Welcome";
import Profile from "./components/Pages/Profile";
function App() 
{
  const crtctx = useContext(CartContext);
  return (
    <CartProvider>
      <Switch>
       <Route path='/login'><Login /></Route>
       <Route path='/' exact><Redirect to='/login' /></Route>
        <Route path='/welcome'><Welcome /></Route>
        <Route path='/profile'><Profile /></Route>
      </Switch>
    </CartProvider>
  );
}

export default App;
