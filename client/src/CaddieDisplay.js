import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import CaddieItem from "./CaddieItem";

function CaddieDisplay(){
    const match = useParams()
    const courseId = match.id
    const [caddies, setCaddies] = useState([])
    const [skills, setSkills] = useState([])

    useEffect(() => {
        fetch(`/golf_courses/${courseId}`)
        .then((r) => r.json())
        .then((caddieRes) =>{
            setCaddies(caddieRes.caddies)
            setSkills(caddies.skills)
            console.log(caddieRes.caddies)
            console.log(skills)
            // if(caddieRes && caddieRes.reviews){               
            //     setReviews(mountainRes.reviews)                
            //     console.log(caddies, caddieRes.users)                
            // }
        })        
        .catch((error) => console.log(error))
    }, [])

    // useEffect(() => {
    //     fetch(`/skills_users`)
    //     .then((r) => r.json())
    //     .then((res) => {
    //         console.log(res)
    //     })
    // }, [])

    const renderedCaddies = caddies.map((element) => (
                // console.log(element.skills)
        <CaddieItem key={element.caddy.id} id={element.caddy.id} name={element.caddy.name} bio={element.caddy.bio} skills={element.skills}/>
    ))


    return(
        <div className="caddie-list-div">
            <div>
                {renderedCaddies}
            </div>
        </div>
    )
}
export default CaddieDisplay