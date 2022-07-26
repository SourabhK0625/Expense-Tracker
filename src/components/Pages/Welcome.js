import React, {useRef, useState , useEffect } from "react";
import { Link } from "react-router-dom";
import './Welcome.css'

const Welcome = props =>
{
    const [arrayDetails , setArrayDetails] = useState([]);
    const amountRef = useRef();
    const descriptionRef = useRef();
    const expenseRef = useRef();
    const loggedEmail = localStorage.getItem('email');
    // On reload get all the data from the backend 
    useEffect(()=>{
        let initialData =[]
        fetch(`https://expense-tracker-3135a-default-rtdb.firebaseio.com/${loggedEmail}.json`)
            .then((res) =>{
                if(res.ok){
                    return res.json()
                }else{
                    return res.json().then((data) =>{
                        let errorMessage = 'Get Request Failed';
                        if(data && data.error && data.error.message){
                            errorMessage = data.error.message
                        }
                        throw new Error(errorMessage);
                    })
                }
            }).then((data) =>{
                
                for(let val of Object.values(data)){
                    initialData.push(val)
                    setArrayDetails(arrayDetails => [...arrayDetails, {amount: val.Amount, description: val.Description, expenses: val.Category}])
                }
                
            })
            console.log(initialData)
            
    },[loggedEmail])

    const submitHandler = item =>
    {
        item.preventDefault();
        const enteredAmount = amountRef.current.value;
        const enteredDescription = descriptionRef.current.value;
        const enteredExpense = expenseRef.current.value;
        setArrayDetails([...arrayDetails ,{amount:enteredAmount , description: enteredDescription, expenses: enteredExpense}]);
        console.log(arrayDetails)
        fetch(`https://expense-tracker-3135a-default-rtdb.firebaseio.com/${loggedEmail}.json`,{
            method:"POST",
            body:JSON.stringify({
                Amount: enteredAmount,
                Description: enteredDescription,
                Category: enteredExpense,
            })
        }).then(res =>{
            console.log(res)
            if(res.ok){
                return res.json()
            }else{
                return res.json().then(data =>{
                    let errorMessage = 'Authentication Request Failed';
                    if(data && data.error && data.error.message){
                        errorMessage = data.error.message
                    }
                    throw new Error(errorMessage);
                })
            }
        }).then((data) => {
            console.log(data)
            alert('Data is sent to Backend successfully!!!')
            setArrayDetails([...arrayDetails, {amount:enteredAmount, desciption: enteredDescription, category: enteredExpense}])
            
        }).catch(err =>{
            alert(err.errorMessage)
        })
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
                    <li key={Math.random.toString()}>Rs{item.amount}  {item.description}  {item.expenses}</li>
                )})}
            </ul>
            {console.log(arrayDetails)}
        </div>
    )
};
export default Welcome;