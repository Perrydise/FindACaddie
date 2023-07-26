import './App.css';
import React, { useState, useEffect, createContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage'
import CaddyQuiz from './CaddieQuiz';
import PlayerQuiz from './PlayerQuiz';
import Navbar from './NavBar';
import HomePage from './HomePage';
import GolfCoursePage from './GolfCoursePage';
import CaddieDisplay from './CaddieDisplay';
import CourseSelect from './CourseSelect';
import Profile from './Profile';

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
          <Route exact path="/caddiequiz/:id" element={<CaddyQuiz />} />
          <Route exact path="/playerquiz/:id" element={<PlayerQuiz />} />
          <Route exact path="/homepage" element={<HomePage />} />
          <Route exact path="/golfcoursedisplay" element={< GolfCoursePage />} />
          <Route exact path="/golfcourse/:id" element={<CaddieDisplay />} />
          <Route exact path="/courseselect" element={<CourseSelect />} />
          <Route exact path="/profile/:id" element={<Profile />} />
        </Routes>    
    </div>
    </UserContext.Provider>
  )

}

export default App;
