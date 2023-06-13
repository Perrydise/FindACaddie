import './App.css';
import React, { useState, useEffect, createContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage'
import CaddyQuiz from './CaddieQuiz';
import Navbar from './NavBar';

export const UserContext = createContext(null);


function App() {
  const [currentUser, setCurrentUser] = useState("")

  useEffect(()=>{
    fetch('/auth')
    .then(res => {
      if(res.ok){
        res.json().then(user => setCurrentUser(user))
      }
      })
    .catch((e) => console.error(e))
  }, []) 

  if(!currentUser) return (<LandingPage setCurrentUser={setCurrentUser} />)

  return (

    <UserContext.Provider value={currentUser}>

    <div>
      
    <Navbar />
    
        <Routes>
          <Route exact path="/" element={<LandingPage setCurrentUser={setCurrentUser} />} />
          <Route exact path="/user/:id" element={<CaddyQuiz />} />
        </Routes>
    
    </div>
    </UserContext.Provider>
  )

}

export default App;
