import React, {useRef, useState , useEffect , useContext } from "react";
import expenses from '../../Assets/expenses.jpg';
import CartContext from "../Cart/CartContext";
import './Welcome.css';
import './Expenses.css';
import { CSVLink } from 'react-csv';
const Expense = props =>
{


    const crtctx = useContext(CartContext)
    const [arrayDetails , setArrayDetails] = useState([]);
    const [showPremium , setShowPremium] = useState(false);
    const [theme , setTheme] = useState(false);
    const amountRef = useRef();
    const descriptionRef = useRef();
    const expenseRef = useRef();
    const loggedEmail = localStorage.getItem('email');
    const totalExpense = arrayDetails.reduce((accumulator,curValue)=>parseInt(curValue.amount) + accumulator,0); 
    console.log(totalExpense);

    const headers = [
        {label: 'Amount' ,key: 'amount'},
        {label: 'Description' ,key: 'description'},
        {label: 'Category' ,key: 'expenses'}
    ];

    const csvReport = {
        filename: 'Expense_Report.csv',
        headers: headers,
        data: arrayDetails
    };

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
                    
                    for(let [key,val] of Object.entries(data)){
                        initialData.push(val)
                        setArrayDetails(arrayDetails => [...arrayDetails, {name:key ,amount: val.Amount, description: val.Description, expenses: val.Category}])
                    }
                })
                
        },[loggedEmail]);

        function premiumFeatures(){
            setShowPremium(true)

      
          }
          function toggleTheme(){
            const wholeBody  = document.getElementsByTagName('body')
            if(theme){
                wholeBody[0].style.backgroundColor = 'white'
                setTheme(previousState=>!previousState)
            }else{
                wholeBody[0].style.backgroundColor = 'darkslategrey'
                setTheme(previousState=>!previousState)
    
            }
        
        }
        
    
        const submitHandler = item =>
        {
            item.preventDefault();
            const enteredAmount = amountRef.current.value;
            const enteredDescription = descriptionRef.current.value;
            const enteredExpense = expenseRef.current.value;
            if((totalExpense+enteredAmount) <5000)
            {
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
                    // console.log(data)
                    alert('Data is sent to Backend successfully!!!')
                    setArrayDetails([...arrayDetails, {name:data.name,amount:enteredAmount, description: enteredDescription, category: enteredExpense}])
                }).catch(err =>{
                    alert(err.errorMessage)
                })
            }
            else
            {
                console.log("Amount exceeded")
                alert("Amount exceeded Rs 5000 Buy Premium")
                setShowPremium(true);
            }
            
        };
    
        const updateHandler = item =>
        {
            let NewAmount = prompt('Enter the New Amount: ',item.amount)
            let NewDescriptioin = prompt(' Enter the New Desription: ', item.description)
            let NewCategory = prompt(' Enter the New Category: ', item.category)
            
            console.log(item)
            fetch(`https://expense-tracker-3135a-default-rtdb.firebaseio.com/${loggedEmail}/${item.name}.json`, {
                method:"GET"
            }).then(res => {
                if(res.ok){
                    return res.json()
                }else{
                    return res.json().then((data => {
                        let errorMessage = 'Get Request Failed';
                        throw new Error(errorMessage)
                    }))
                }
            }).then((data) =>{
                console.log(data)
                reqPATCH(item.name, NewAmount, NewCategory, NewDescriptioin)
                
            }).catch(err =>{
                alert(err.errorMessage)
            })
    
            // Request for PATCH function 
            function reqPATCH( id, NewAmount, NewCategory, NewDescription){
               fetch(`https://expense-tracker-3135a-default-rtdb.firebaseio.com/${loggedEmail}/${id}.json`,
                {
                    method:"PATCH",
                    body:JSON.stringify({
                        amount: NewAmount,
                        category: NewCategory,
                        description: NewDescription,
                    })
                }).then(res => {
                    return res.json()
                }).then(data => {
                    console.log(data)
                    window.location.reload(false)
                })
            }
        };
    
        const deleteHandler = id =>{
            // console.log(id.name)
            fetch(`https://expense-tracker-3135a-default-rtdb.firebaseio.com/${loggedEmail}/${id.name}.json`, 
            {
                method:"DELETE",
            }).then(res =>{
                return res.json()
            }).then(data =>{
                console.log(data)
                alert('Are you sure ?')
                window.location.reload(false)
            })
        };
        

    return(
        
        <div>
            
            <form className="form" onSubmit={submitHandler}>
            <img alt="" className="image-expenses" src={expenses}></img>
            <h1>Enter Details Here</h1>
                <span className="form-span">
                    <label className="form-lable" htmlFor='amount'>Amount Spent Rs :</label>
                    <input className="form-input-AE" type='number' min='0' id='amount' ref={amountRef}/>
                </span><br></br>
                <span className="form-span">
                    <label className="form-lable" htmlFor='description'>Description :</label>
                    <input className="form-input-description" type='text' id='description' ref={descriptionRef}/>
                </span><br></br>
                <span className="form-span">
                    <label className="form-lable" htmlFor='category'>Category :</label>
                    <select className="form-input-AE" id="Expesnse" name="Expense" ref={expenseRef}>
                        <option className="form-option" value="Food">Food</option>
                        <option className="form-option" value="Movie">Movie</option>
                        <option className="form-option" value="Petrol">Petrol</option>
                        <option className="form-option" value="Shopping">Shopping</option>
                        <option className="form-option" value="Personal">Personal</option>
                        <option className="form-option" value="Other">Other</option>
                    </select>
                </span><br></br>
                <section>
                    <div class="scrolling">
                        <p>Manage Expenses Upto Rs 5k For Free</p>
                    </div>
                </section>
                <span>
                    <button className="submit-expense" type="submit">Submit Expense</button>
                    <button className="submit-expense" onClick={crtctx.removeToken}>Logout</button>
                    {showPremium &&<button className="submit-expense" type="submit" onClick={premiumFeatures}>Buy Premium</button>}
                    {showPremium &&<button className="submit-expense" type="submit" onClick={toggleTheme}>Toggle Theme</button>}
                    {showPremium &&<button className="submit-expense" type="submit" onClick={premiumFeatures}><CSVLink {...csvReport}>Download_Expense</CSVLink></button>}
                </span><br></br>
            </form>
            
            <ul className="app-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Amount In Rs</th>
                                <th>Description</th>
                                <th>Category</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                {arrayDetails.map(item=>{
                    console.log(item);
                    return(                    
                        <tbody key={Math.random().toString()}>
                            <tr>
                                <td>{item.amount}</td>
                                <td>{item.description}</td>
                                <td>{item.expenses}</td>
                                <td>
                                    <button className="delete_button" onClick={()=>{deleteHandler({name:item.name})}}>Delete</button>
                                    <button className="update_button" onClick={()=>{updateHandler({name:item.name ,amount:item.amount , description:item.description , expenses: item.expenses})}}>Update</button>
                                </td>
                            </tr>
                        </tbody>
                )})}</table>
            </ul>
            {console.log(arrayDetails)}
        </div>
    )
};
export default Expense;