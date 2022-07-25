import React, {useRef} from "react";
import { Link } from "react-router-dom";
import './Profile.css'
const Profile = props =>
{
    const nameRef = useRef();
    const imageUrlRef = useRef();
    const submitHandler = item =>
    {
        item.preventDefault();
        const enteredName = nameRef.current.value;
        const enteredImageUrl = imageUrlRef.current.value;
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBMoCmrXulQToPQEvD8GVvnW5klI3An3Ps',
        {
            method: 'POST',
            body : JSON.stringify({
                idToken: localStorage.getItem('token'),
                displayName: enteredName,
                photoUrl:enteredImageUrl,
                returnSecureToken:true
            })
        }
        ).then(res=>{
            console.log(res.json())
        })
        
    }
    return (
        <div>
            <div>
                <span  className="main-profile">Winner Never Quits, Quitter Never Wins</span>
                <span className="profile-div">Your Profile is 35% Completed.A complete Profile has </span><br></br>
                <span className="profile-div">higher chance of landing JOBS.<Link to='/profile' className="complete-profile">Complete Now</Link></span>
            </div>
            <div>
                <form onSubmit={submitHandler}>
                    <label htmlFor='name'>Full Name :</label>
                    <input type='text' id='name' required ref={nameRef}/>

                    <label htmlFor='imageUrl'>Profile Photo Url :</label>
                    <input type='text' id='imageUrl' required ref={imageUrlRef}/>
                    <button type="submit">Update</button>

                </form>
                
            </div>
        </div>
    )
};
export default Profile;