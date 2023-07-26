import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Profile() {
  const match = useParams();
  const userId = match.id;
  const [name, setName] = useState("");
  const [skills, setSkills] = useState([]);
  const [bio, setBio] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedBio, setEditedBio] = useState("");

  useEffect(() => {
    fetch(`/users/${userId}`)
      .then((r) => r.json())
      .then((userRes) => {
        setName(userRes.name);
        setBio(userRes.bio);
        setSkills(userRes.skills);
      })
      .catch((error) => console.log(error));
  }, [userId]);


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

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedBio(bio);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedBio("");
  };

  const handleSaveClick = () => {
    console.log(
        userId
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
        } else {
            return r.json().then((err) => {
                throw err
            })
        }
    })
    .then((bio) => {
        console.log(bio, "completed bio update")
        setBio(editedBio);
        setIsEditing(false);
    })
    .catch((e) => {
        console.error(e)
        // setErrors(e.errors)
    })   
  };

   

  // const handleDelete = () => {
  //   fetch(`/users/${userId}`,{
  //     method: "DELETE",
  //   })
  //   .then((r) => {
  //     if(r.ok) {
  //       return r.json()
  //     }
  //   })
    
  

  

  return (

    <div className="profile-div">
      <h1 className="profile-header">Welcome to your Profile {name}!</h1>
      {isEditing ? (
        <>
          <textarea
            value={editedBio}
            onChange={(e) => setEditedBio(e.target.value)}
          ></textarea>
          <button onClick={handleSaveClick}>Save</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </>
      ) : (
        <>
          <p>Bio: {bio}</p>
          <button onClick={handleEditClick}>Edit Bio</button>
          
        </>
      )}
      <label>Your Skills:</label>
      <ul>
        {skills.map((element) => (
          <li key={element.id}>{element.name}</li>
        ))}
      </ul>
      <button onClick={()=> {}}>Edit Skills</button>
      <button onClick={() => {}}>Delete account</button>
    </div>
  );
}


export default Profile;
