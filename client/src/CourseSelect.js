import React, { useState, useEffect } from "react";
import ChooseCourseItem from "./ChooseCourseItem";

function CourseSelect(){
    const [courses, setCourses] = useState([])
    const [selectedCourses, setSelectedCourses] = useState([])
    const [coursesSubmitted, setCoursesSubmitted] = useState(false)

    useEffect(() => {
        fetch(`/golf_courses`)
        .then((r) => r.json())
        .then((coursesRes) => {
          setCourses(coursesRes)
          console.log(courses)
          console.log(courses.name)          
        })
        .catch((error) => console.log(error))
      }, [])

      const handleCourseChange = (event) => {
        const { value, checked } = event.target;  
        if (checked) {
          setSelectedCourses([...selectedCourses, value]);
        } else {
          setSelectedCourses(selectedCourses.filter((course) => course !== value));
        }
      };

      const handleSubmit = (event) => {
        console.log("the before hit!")
  
          console.log("the if statement hit!")
          fetch(`/golf_courses_users`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
            //   user_id: userId,
              name: selectedCourses,
            })
            
            }).then((r) => {
              console.log("selectedSkills")
              setSelectedCourses([])
              setCoursesSubmitted(true)
          }).catch((e) => {
            console.error(e)
            // setErrors(e.errors)
        })
  
        console.log(`Selected courses`, selectedCourses)
        
      }

      const courseData = courses.map((element) => (
        <ChooseCourseItem key={element.id} id={element.id} name={element.name} handleCourseChange={handleCourseChange} handleSubmit={handleSubmit} checked={selectedCourses.includes(element.name)} />    
    ))

    return(
        <div className="course-select-div">
        <h1 className="course-select-header">Select which courses you would like to caddie at</h1>
        <div>
            {courseData}
        </div>
        <button onClick={handleSubmit} disabled={coursesSubmitted}>
        {coursesSubmitted ? 'Submitted' : 'Submit'}
      </button>
        <p>Selected Skills: {selectedCourses.join(', ')}</p>
        </div>
    )
}
export default CourseSelect