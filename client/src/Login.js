import React, { useState } from "react";
// import {useNavigate} from "react-router-dom"

function LogIn ({ setCurrentUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  // const navigate = useNavigate()

   const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((r) => {
      if (r.ok) {
        return r.json();
      } else {
        return r.json().then((err) => {
          throw err;
        });
      }
    })
    .then((user) => {
      console.log(this)
      setCurrentUser(user);
      // navigate("/mountains");
      setUsername("");
      setPassword("");
      setErrors("");
    })
    .catch((e) => {
      console.error(e);
      setErrors("Incorrect username or password");
      console.log(errors)
      setUsername("");
      setPassword("");
    });
  }
  
  
    return (
      <form>
        {errors && <div className="error-div">{errors}</div>}
        <div className="login-box1">
        <label htmlFor="username">Username: </label>
        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="login-box2">
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button onClick={handleSubmit}>Login</button>
      </form>
    )
        
}
export default LogIn