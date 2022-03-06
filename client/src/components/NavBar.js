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
    <nav className="topbar">
      <Link to="/" className="navbar-brand">
        <span className="logo text-dark">bubble</span>
      </Link>
      <Link to="/"> Login </Link>
      <Link to="/about"> SignUp </Link>
      <button
        className="profile button btn btn-md btn-primary btn-block"
        onClick={handleClick}
      >
        Profile
      </button>
      {showProfile && <Profile />}
    </nav>
  );
}

export default NavBar;
