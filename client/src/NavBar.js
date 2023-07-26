import React from "react"


function Navbar () {

  function handleDeleteSession() {
    localStorage.clear()
    return (
    window.location = `/`
    )
}
  

  function handleLogout() {
    fetch(`/logout`, {
      method: "DELETE",
  })
  .then((r) => r.json())
  .then(() => handleDeleteSession())
}

    return (

<nav className="navbar navbar-expand-lg navbar-light bg-light">
  {/* <a class="navbar-brand" href="/">Navbar</a> */}
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div className="navbar-nav">
      <a className="nav-item nav-link" href="/homepage">Home</a>
      <a className="nav-item nav-link" href="/golfcoursedisplay">Find a course</a>
      <a className="nav-item nav-link" href="/profile/:id">Profile</a>
      <a className="nav-item nav-link" onClick={handleLogout} href="/">Logout</a>
    </div>
  </div>
</nav>

    )
}

export default Navbar