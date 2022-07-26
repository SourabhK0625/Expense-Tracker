import classes from "./ForgotPassword.module.css";
import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
const ForgotPassword = (props) => 
{
    const emialInputRef = useRef();
    const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  
  const submitHandler = (pswd) =>
  {
    pswd.preventDefault();
    // const emailInputRef = useRef();
    const enteredEmail = emialInputRef.current.value;
    setIsLoading(true);
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBMoCmrXulQToPQEvD8GVvnW5klI3An3Ps',
    {
        method: 'POST',
        body: JSON.stringify({
            requestType: 'PASSWORD_RESET',
            email: enteredEmail
        })
    }).then(res =>
        {
            setIsLoading(false);
            if(res.ok){
                alert("Password Reset-Link Has been sent to your mail")
                console.log(res)
                history.replace('/login');
            }
        }).catch(err=>
            {
                console.log(err)
            })
  };

  return (
    <section className={classes.auth}>
      <h1>Forgot Password</h1>

      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emialInputRef} />
        </div>
        <div className={classes.actions}>
          <button type="">Change Password</button>
          {isLoading && <p> Sending Request...!</p>}
        </div>
      </form>
    </section>
  );
};
export default ForgotPassword;
