import React, { useState } from "react";


function CaddieSkillSelector({ key, id, name, selectedSkills, handleSkillChange, checked }){
    // const [errors, setErrors] = useState("")     

    return(
        <div>
      
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

export default CaddieSkillSelector