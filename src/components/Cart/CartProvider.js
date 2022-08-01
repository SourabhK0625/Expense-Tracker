import { useState  } from "react";
import CartContext from "./CartContext";
import { useHistory } from "react-router-dom";
const CartProvider = props =>
{
    const history = useHistory();
    const initialToken = localStorage.getItem('token');
    let [isToken, setIsToken] = useState(initialToken);
       
    const userIsLoggedIn = !!isToken;
    const addTokenHandler= (item)=>
    {
        setIsToken(item)
        localStorage.setItem('token' , item);
    };

    const removeTokenHandler = ()=>
    {
        setIsToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        history.replace('/login')
    };

    const cartContext = 
    {
        tokens:isToken,
        isLoggedIn: userIsLoggedIn,
        addToken: addTokenHandler,
        removeToken: removeTokenHandler,
    };
    return(
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
};
export default CartProvider;