import React from "react";
import { Link } from "react-router-dom";
import "../../styles/addgroupcard.css";

function AddGroupCard(props) {
  return (
    <div className="add-group-card">
      <Link to="/create-group" className="username link-dark">
        <button className="logout-btn">
          <div className="logout-text">Create Group</div>
        </button>
      </Link>
      <Link to="/join-group" className="username link-dark">
        <button className="logout-btn">
          <div className="logout-text">Join Group</div>
        </button>
      </Link>
    </div>
  );
}

export default AddGroupCard;
