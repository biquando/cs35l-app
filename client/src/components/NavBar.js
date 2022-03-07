import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";

import ProfileCard from "./ProfileCard";

function NavBar(props) {
  const [showProfile, setShowProfile] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleClick = () => {
    setShowProfile(!showProfile);
  };

  return (
    // navbar sticky-top
    <nav className="topbar">
      <Link to="/" className="navbar-brand">
        <span className="logo text-dark">bubble</span>
      </Link>
      <div class="input-group nav-search-bar-container">
        <input
          type="text"
          class="form-control"
          placeholder="Search for a keyword"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        {searchText ? (
          <Link to={`/search?query=${searchText}`}>
            <div class="input-group-append">
              <button class="btn btn-outline-secondary" type="button">
                Button
              </button>
            </div>
          </Link>
        ) : (
          <div class="input-group-append">
            <button disabled class="btn btn-outline-secondary" type="button">
              Button
            </button>
          </div>
        )}
      </div>
      <button
        className="profile button btn btn-md btn-primary btn-block"
        onClick={handleClick}
      >
        Profile
      </button>
      {showProfile && <ProfileCard />}
    </nav>
  );
}

export default NavBar;
