import React from "react";
import { Link } from "react-router-dom";
import "../styles/profile.css";

function AddGroupCard(props) {
  return (
    <div className="profile-card">
      <Link to="/create-group" className="username link-dark">
        <button className="logout-btn">
          <div className="logout-text">Log Out</div>
        </button>
      </Link>
      <Link to="/join-group" className="username link-dark">
        <button className="logout-btn">
          <div className="logout-text">Log Out</div>
        </button>
      </Link>
    </div>
  );
}

export default AddGroupCard;
