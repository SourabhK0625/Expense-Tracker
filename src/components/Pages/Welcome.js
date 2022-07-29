import React from "react";
import Expense from "./Expenses";
import { Link } from "react-router-dom";
import './Welcome.css'

const Welcome = props =>
{
    return (
        <div>
            <div className="main">
                <span>Welcome To Expense Tracker...!</span>
                <span className="profile">Complete Your Profile..! <Link to='/profile' className="complete">Complete Now?</Link></span>
            </div>
                <Expense />
        </div>
    )
};
export default Welcome;