// import React from "react";

// function CaddieItem({ key, name, bio, skills}) {

    

//     return (
//         <div>
//             <li className="caddie-item" >Name: {name} Bio: {bio}</li>
//             <div>
//             {skills.map((element) => (
//                 <li key={element.id}>{element.name}</li>
//             ))}
//         </div>
//             <button>Schedule</button>
//             <button>leave a review</button>
//         </div>
//     )
// }
// export default CaddieItem

// import React, { useState } from "react";

// function CaddieItem({ id, name, bio, skills }) {
//   const [showForm, setShowForm] = useState(false);
//   const [date, setDate] = useState("");
//   const [time, setTime] = useState("");
//   const [location, setLocation] = useState("");

//   const handleScheduleClick = () => {
//     setShowForm(true);
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     // Perform any necessary actions with the submitted data
//     console.log("Date:", date);
//     console.log("Time:", time);
//     console.log("Location:", location);
//     // Reset form state
//     setDate("");
//     setTime("");
//     setLocation("");
//     setShowForm(false);
//   };

//   const handleCancelClick = () => {
//     setShowForm(false);
//   };

//   if (showForm) {
//     return (
//       <div>
//         <form onSubmit={handleFormSubmit}>
//           <label htmlFor="date">Date:</label>
//           <input
//             type="text"
//             id="date"
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//           />
//           <br />
//           <label htmlFor="time">Time:</label>
//           <input
//             type="text"
//             id="time"
//             value={time}
//             onChange={(e) => setTime(e.target.value)}
//           />
//           <br />
//           <label htmlFor="location">Location:</label>
//           <input
//             type="text"
//             id="location"
//             value={location}
//             onChange={(e) => setLocation(e.target.value)}
//           />
//           <br />
//           <button type="submit">Submit</button>
//           <button onClick={handleCancelClick}>Cancel</button>
//         </form>
//       </div>
//     );
//   }



//   return (
//     <div>
//       <li className="caddie-item">
//         Name: {name} Bio: {bio}
//       </li>
//       <div>
//         {skills.map((element) => (
//           <li key={element.id}>{element.name}</li>
//         ))}
//       </div>
//       <button onClick={handleScheduleClick}>Schedule</button>
//       <button>Leave a Review</button>
//     </div>
//   );
// }

// export default CaddieItem;

import React, { useState } from "react";

function CaddieItem({ id, name, bio, skills }) {
  const [showForm, setShowForm] = useState(false);
  const [dateTime, setDateTime] = useState("");
  const [location, setLocation] = useState("");

  const handleScheduleClick = () => {
    setShowForm(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetch("/schedule_events", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            event_date: dateTime,
            message: location
        })
    })
    console.log("Date and Time:", dateTime);
    console.log("Location:", location);
    // Reset form state
    setDateTime("");
    setLocation("");
    setShowForm(false);
  };

  const handleCancelClick = () => {
    setShowForm(false);
  };

  if (showForm) {
    return (
      <div>
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="datetime">Tee time:</label>
          <input
            type="datetime-local"
            id="datetime"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
          />
          <br />
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <br />
          <button type="submit">Submit</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <li className="caddie-item">
        Name: {name} Bio: {bio}
      </li>
      <div>
        {skills.map((element) => (
          <li key={element.id}>{element.name}</li>
        ))}
      </div>
      <button onClick={handleScheduleClick}>Schedule</button>
      <button>Leave a Review</button>
    </div>
  );
}

export default CaddieItem;

