import React, { useContext } from "react";
import CartProvider from "./components/Cart/CartProvider";
import Login from "./components/Pages/Login";
import { Redirect, Route, Switch } from "react-router-dom";
import CartContext from "./components/Cart/CartContext";
import Welcome from "./components/Pages/Welcome";
import Profile from "./components/Pages/Profile";
import ForgotPassword from "./components/Pages/ForgotPassword";
function App() {
  const crtctx = useContext(CartContext);
  return (
    <CartProvider>
      <Switch>
          <Route path="/Welcome">
            <Welcome />
          </Route>
        {!crtctx.isLoggedIn &&<Route path="/login" exact>
          <Login />
        </Route>}
        {!crtctx.isLoggedIn &&<Route path="/" exact>
          <Redirect to="/login"/>
        </Route>}
        <Route path="/profile">
          <Profile></Profile>
        </Route>
        {crtctx.isLoggedIn &&<Redirect to="/Welcome" />}
        {!crtctx.isLoggedIn &&<Route path="/forgotpassword">
          <ForgotPassword />
        </Route>}
        {!crtctx.isLoggedIn &&<Redirect to="/login" />}
      </Switch>
    </CartProvider>
  );
}

export default App;
