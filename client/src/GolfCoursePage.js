import React, { useEffect, useState } from "react";
import CourseItem from "./CourseItem";

function GolfCoursePage (){
    const [courses, setCourses] = useState([])

    

    useEffect(() => {
        // console.log(userId)
        fetch(`/golf_courses`)
        .then((r) => r.json())
        .then((coursesRes) => {
          setCourses(coursesRes)
          console.log(courses)
          console.log(courses.name)          
        })
        .catch((error) => console.log(error))
      }, [])

const courseData = courses.map((element) => (
    <CourseItem key={element.id} id={element.id} name={element.name} />    
))

    return (
        <div>
        <h1>Find Courses in your area to see the caddies nearby!</h1>
        <div>
            {courseData}
        </div>
        </div>
    )
}

export default GolfCoursePage