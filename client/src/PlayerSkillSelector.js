import React, { useState } from "react";

function PlayerSkillSelector({ key, id, name, selectedSkills, handleSkillChange, checked }){
    const [errors, setErrors] = useState("")     

    return(
        <div>
      {/* {errors.map((error) => {
                return <p>{error}</p>
            })} */}
        <label key={id}>
          <input
            type="checkbox"
            value={name}
            checked={checked}
            onChange={handleSkillChange}
          />
          {name}
        </label>
      </div>
    )

}

export default PlayerSkillSelector