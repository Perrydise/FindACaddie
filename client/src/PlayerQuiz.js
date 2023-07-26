import React, { useEffect, useState } from "react";
import PlayerSkillSelector from "./PlayerSkillSelector";
import { useParams } from "react-router-dom"
import { useNavigate } from 'react-router-dom';

function PlayerQuiz(){
    const match = useParams()
    const userId = match.id
    const [selectedSkills, setSelectedSkills] = useState([])
    const [bio, setBio] = useState("")
    const [skillsSubmitted, setSkillsSubmitted] = useState(false);
    const [bioSubmitted, setBioSubmitted] = useState(false)
    const [user, setUsers] = useState([])
    const [errors, setErrors] = useState([])
    const [skills, setSkills] = useState([])
    const navigate = useNavigate();

    // console.log(userId)
    
    
    useEffect(() => {
      console.log(userId)
      fetch(`/users/${userId}`)
      .then((r) => r.json())
      .then((userRes) => {
        setUsers(userRes)
        
      })
      .catch((error) => console.log(error))
    }, [])

    useEffect(() => {
      console.log("this is hitting")
      fetch('/skills')
      .then((r) => r.json())
      .then((skillsRes) => {
        setSkills(skillsRes)
        console.log(skills)
      })
      .catch((error) => console.log(error))
    }, [])

    const handleSkillChange = (event) => {
      const { value, checked } = event.target;  
      if (checked) {
        setSelectedSkills([...selectedSkills, value]);
      } else {
        setSelectedSkills(selectedSkills.filter((skill) => skill !== value));
      }
    };

    const skillData = skills.map((element) => (
      <PlayerSkillSelector key={element.id} id={element.id} name={element.name} selectedSkills={selectedSkills} handleSkillChange={handleSkillChange} checked={selectedSkills.includes(element.name)}/>
    
    ))
    
    const handleBioChange = (event) => {
      setBio(event.target.value);
    }

    const handleBioSubmit = (event) => {
      console.log(
          JSON.stringify({
            user_id: userId,
              bio
          })
      )
      fetch(`/users/${userId}`, {
          method: "PATCH",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // user_id: userId,
              bio: bio
          }),
      })
      .then((r) => {
          if (r.ok) {
              return r.json()
              navigate(`/homepage`)
          } else {
              return r.json().then((err) => {
                  throw err
              })
          }
      })
      .then((bio) => {
          console.log(bio, "completed bio update")
          setBioSubmitted(true)
      })
      .catch((e) => {
          console.error(e)
          setErrors(e.errors)
      })
    }

    

    const handleSubmit = (event) => {
      console.log("the before hit!")

        console.log("the if statement hit!")
        fetch(`/skills_users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: userId,
            skill_name: selectedSkills,
          })
          
          }).then((r) => {
            console.log("selectedSkills")
            setSelectedSkills([])
            setSkillsSubmitted(true)
        }).catch((e) => {
          console.error(e)
          setErrors(e.errors)
      })

      console.log(`Selected Skills`, selectedSkills)
      
    }

    return(
        <div>
            <h1>Welcome {user.name}!</h1>
            <h2>Please fill out this brief survey to help players better understand your needs!</h2>
            <div>
      <label>Select skills that you might need help with:</label>
      <div>
      {errors.map((error) => {
                return <p>{error}</p>
            })}
        
      </div>
      <div>
        {skillData}
      </div>      

      <button onClick={handleSubmit} disabled={skillsSubmitted}>
        {skillsSubmitted ? 'Submitted' : 'Submit'}
      </button>

      <p>Selected Skills: {selectedSkills.join(', ')}</p>
        </div>
        <div className="bio-div">
        <label>Bio:</label>
      <textarea value={bio} onChange={handleBioChange}></textarea>
        <button onClick={handleBioSubmit} disabled={bioSubmitted}>
        {bioSubmitted ? 'Submitted' : 'Submit'}
        </button>
        </div>
            
        </div>
    )
}

export default PlayerQuiz