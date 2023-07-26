import React from "react";

function ChooseCourseItem({ key, id, name, handleCourseChange, handleSubmit, checked }){

    return(
        <div>      
        <label key={id}>
          <input
            type="checkbox"
            value={name}
            checked={checked}
            onChange={handleCourseChange}
          />
          {name}
        </label>
      </div>
    )
}
export default ChooseCourseItem