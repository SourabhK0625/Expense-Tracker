import React from "react";
import { Link } from "react-router-dom";
import './Welcome.css'

const Welcome = props =>
{
    return (
        <div className="main">
            <div>Welcome To Expense Tracker...!</div>
            <div className="profile">Complete Your Profile..! <Link to='/profile' className="complete">Complete Now?</Link></div>
        </div>
    )
};
export default Welcome;