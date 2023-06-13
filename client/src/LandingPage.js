import React, { useState } from "react";
import SignUp from "./SignUp";
import Login from "./Login.js"

function LandingPage({setCurrentUser}) {
    const [isShown, setIsShown] = useState(false)

    const handleClick = event => {
        setIsShown(current => !current)
    }

    return (
        <div className="landing-body">
            <h1>Find a caddie</h1>
            <h2>Please create an account to continue</h2>
            <SignUp setCurrentUser={setCurrentUser} />
            {isShown?
                <Login setCurrentUser={setCurrentUser} />:''
            }
            <button onClick={handleClick}>Already have an account?</button>
        </div>
    )
}

export default LandingPage