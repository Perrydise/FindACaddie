import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

function CaddyQuiz(){
    const match = useParams()
    const userId = match.id
    const [selectedSkills, setSelectedSkills] = useState([])
    const [bio, setBio] = useState("")
    const [submitted, setSubmitted] = useState(false);
    const [user, setUsers] = useState([])
    const [errors, setErrors] = useState([])

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
    

    const handleSkillChange = (event) => {
        const { value, checked } = event.target;
    
        if (checked) {
          setSelectedSkills([...selectedSkills, value]);
        } else {
          setSelectedSkills(selectedSkills.filter((skill) => skill !== value));
        }
      };

      const handleSubmit = (event) => {
        console.log("the before hit!")

          console.log("the if statement hit!")
          fetch(`/skills`, {
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
          }).catch((e) => {
            console.error(e)
            setErrors(e.errors)
        })
  
        console.log(`Selected Skills`, selectedSkills)
        setSubmitted(true)
      }

      const handleBioChange = (event) => {
        setBio(event.target.value);
      }

      const handleBioSubmit = () => {
        console.log(
            JSON.stringify({
                bio,
            })
        )
        fetch(`/users/${userId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                bio
            }),
        })
        .then((r) => {
            if (r.ok) {
                return r.json()
            } else {
                return r.json().then((err) => {
                    throw err
                })
            }
        })
        .then((bio) => {
            console.log(bio, "completed bio update")
        })
        .catch((e) => {
            console.error(e)
            setErrors(e.errors)
        })
      }

    return(
        <div>
            <h1>Welcome name!</h1>
            <h2>Please fill out this brief survey to help players better understand your skills!</h2>
            <div>
      <label>Select Skills:</label>
      <div>
      {errors.map((error) => {
                return <p>{error}</p>
            })}
        <label>
          <input
            type="checkbox"
            value="Reading Putts"
            checked={selectedSkills.includes('Reading Putts')}
            onChange={handleSkillChange}
          />
          Reading Putts
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            value="Course Knowledge"
            checked={selectedSkills.includes('Course Knowledge')}
            onChange={handleSkillChange}
          />
          Course Knowledge
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            value="Club Selection"
            checked={selectedSkills.includes('Club Selection')}
            onChange={handleSkillChange}
          />
          Club Selection
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            value="Course Etiquette"
            checked={selectedSkills.includes('Course Etiquette')}
            onChange={handleSkillChange}
          />
          Course Etiquette
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            value="High Energy"
            checked={selectedSkills.includes('High Energy')}
            onChange={handleSkillChange}
          />
          High Energy
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            value="Here for the win"
            checked={selectedSkills.includes('Here for the win')}
            onChange={handleSkillChange}
          />
          Here for the win
        </label>
      </div>

      <button onClick={handleSubmit} disabled={submitted}>
        {submitted ? 'Submitted' : 'Submit'}
      </button>

      <p>Selected Skills: {selectedSkills.join(', ')}</p>
        </div>
        <div className="bio-div">
        <label>Bio:</label>
      <textarea value={bio} onChange={handleBioChange}></textarea>
        <button onClick={handleBioSubmit} disabled={submitted}>
        {submitted ? 'Submitted' : 'Submit'}
        </button>
        </div>
            
        </div>
    )
}

export default CaddyQuiz