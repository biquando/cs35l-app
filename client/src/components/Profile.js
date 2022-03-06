import React from "react";
import { Link } from "react-router-dom";
import "../styles/profile.css";

import { useAuth } from "../contexts/AuthContext";

function Profile(props) {
  const { user, handleLogout } = useAuth();
  console.log("user object:\n");
  console.log(user);

  return (
    <div className="profile-card">
      <div className="username">{user.username}</div>
      <button className="logout-btn" onClick={handleLogout}>
        <div className="logout-text">Log Out</div>
      </button>
    </div>
  );
}

export default Profile;
