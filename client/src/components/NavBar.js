import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";

import Profile from "./Profile";

function NavBar(props) {
  const [showProfile, setShowProfile] = useState(false);

  const handleClick = () => {
    setShowProfile(!showProfile);
  };

  return (
    // navbar sticky-top
    <nav className="topbar navbar">
      <Link to="/" className="navbar-brand">
        <span className="logo text-dark">bubble</span>
      </Link>
      <Link to="/" className="">
        <button className="profile" onClick={handleClick}>
          username
        </button>
      </Link>
      {showProfile && <Profile />}
    </nav>
  );
}

export default NavBar;
