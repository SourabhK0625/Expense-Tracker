import React from "react";

const CartContext = React.createContext(
    {
        items:'',
        isLoggedIn: false,
        addToken: ()=>{},
        removeToken: ()=> {},
    }
);

export default CartContext;