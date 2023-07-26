import React from "react";
import { useNavigate } from 'react-router-dom';

function CourseItem({ key, name, id }){
    const navigate = useNavigate();

    const handleClick = (event) => {
        navigate(`/golfcourse/${id}`)
    }

    return (
        <div>
            <li className="course-item" key={key+"name"}>Name: {name}</li>
            <button onClick={handleClick}>Show caddies</button>
        </div>
    )
}

export default CourseItem