import React from "react";
import { Link } from "react-router-dom";
import "../styles/profile.css";

function Profile(props) {
  return (
    <div className="hello">
      <div></div>
      <Link to="/login">Logout</Link>
    </div>
  );
}

export default Profile;
