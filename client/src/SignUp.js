import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function SignUp ({ setCurrentUser }) {
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [role, setRole] = useState('')
    const [errors, setErrors] = useState ([])
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        const user = {
            name,
            password,
            role
        }
        fetch('/users', {
            method: "POST",
            headers: {'Content-Type':'application/json'},
            body:JSON.stringify(user)
        })
        .then(res => {
            if(res.ok){
                res.json().then((returnedUser) => {
                  setCurrentUser(returnedUser)
                  console.log(returnedUser)
                  navigate(`/user/${returnedUser.id}`)
                })
                
            } else {
                res.json().then((err) => {
                  throw err
                })
            }
        }).catch((e) => {
          console.error(e)
          setErrors(e.error)
      })        
        console.log(user)
        setName("")
        setPassword("")
        setPasswordConfirmation("")
    }

    return (   
        
        <form onSubmit={handleSubmit}>
          {errors.map((error) => {
                return <p>{error}</p>
            })}
          <div className="form-box1">
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            id="username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          </div>
          <div className="form-box2">
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          </div>
          <div className="form-box3">
          <label htmlFor="password_confirmation">Confirm Password: </label>
          <input
            type="password"
            id="password_confirmation"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
          <label>
          Role:
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="">Select Role</option>
            <option value="caddie">Caddie</option>
            <option value="player">Player</option>
            </select>
            </label>
          </div>
          <button type="submit">Sign up</button>
        </form>
      );

}

export default SignUp



 

