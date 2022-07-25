import React from "react";
import { Link } from "react-router-dom";
import './Welcome.css'

const Welcome = props =>
{
    return (
        <div className="main">
            <span>Welcome To Expense Tracker...!</span>
            <span className="profile">Complete Your Profile..! <Link to='/profile' className="complete">Complete Now?</Link></span>
        </div>
    )
};
export default Welcome;