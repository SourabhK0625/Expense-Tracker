import React, {useRef, useState} from "react";
import { Link } from "react-router-dom";
import './Welcome.css'

const Welcome = props =>
{
    const [arrayDetails , setArrayDetails] = useState([]);

    const amountRef = useRef();
    const descriptionRef = useRef();
    const expenseRef = useRef();

    const submitHandler = item =>
    {
        item.preventDefault();
        const enteredAmount = amountRef.current.value;
        const enteredDescription = descriptionRef.current.value;
        const enteredExpense = expenseRef.current.value;
        setArrayDetails([...arrayDetails ,{amount:enteredAmount , description: enteredDescription, expenses: enteredExpense}]);
        console.log(arrayDetails)

    }
    return (
        <div>
            <div className="main">
                <span>Welcome To Expense Tracker...!</span>
                <span className="profile">Complete Your Profile..! <Link to='/profile' className="complete">Complete Now?</Link></span>
            </div>
            <form onSubmit={submitHandler}>
                <span>
                    <label htmlFor='amount'>Amount Spent Rs :</label>
                    <input type='number' min='0' id='amount' ref={amountRef}/>
                </span>
                <span>
                    <label htmlFor='description'>Description :</label>
                    <input type='text' id='description' ref={descriptionRef}/>
                </span>
                <span>
                    <label htmlFor='category'>Category :</label>
                    <select id="Expesnse" name="Expense" ref={expenseRef}>
                        <option value="Food">Food</option>
                        <option value="Movie">Movie</option>
                        <option value="Petrol">Petrol</option>
                        <option value="Shopping">Shopping</option>
                        <option value="Personal">Personal</option>
                        <option value="Other">Other</option>
                    </select>
                </span>
                <span>
                    <button type="submit">Submit Expense</button>
                </span>
            </form>
            <ul>
                {arrayDetails.map(item=>{return(
                    <li>Rs{item.amount}  {item.description}  {item.expenses}</li>
                )})}
            </ul>
            {console.log(arrayDetails)}
        </div>
    )
};
export default Welcome;