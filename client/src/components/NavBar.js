import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";

import ProfileCard from "./ProfileCard";

function NavBar(props) {
  const [showProfile, setShowProfile] = useState(false);
  const [searchText, setSearchText] = useState(props.searchText || "");

  const navigate = useNavigate();

  const handleClick = () => {
    setShowProfile(!showProfile);
  };

  function handleRedirect() {
    navigate(`/search?query=${searchText}`);
  }

  function handleInputKeyDown(e) {
    if (e.key === "Enter" && searchText) handleRedirect();
  }

  return (
    // navbar sticky-top
    <nav className="topbar">
      <Link to="/" className="navbar-brand">
        <span className="logo text-dark">bubble</span>
      </Link>
      <div className="input-group nav-search-bar-container">
        <input
          type="text"
          className="form-control"
          placeholder="Search for a keyword"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={handleInputKeyDown}
          autoFocus={props.searchText ? true : false}
        />
        <div className="input-group-append">
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={handleRedirect}
            disabled={!searchText}
            style={{
              height: "100%",
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
            }}
          >
            Search
          </button>
        </div>
      </div>
      <button
        className="profile btn btn-md btn-primary btn-block"
        onClick={handleClick}
      >
        Profile
      </button>
      {showProfile && <ProfileCard />}
    </nav>
  );
}

export default NavBar;
