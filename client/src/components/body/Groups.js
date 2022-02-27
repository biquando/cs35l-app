import React from "react";
import { Link } from "react-router-dom";
import "../../styles/groups.css";
import "../../styles/body.css";

function Sidebar(props) {
  return (
    <div className="parent-container">
      <div className="content-container">
        <Link to="/" className="btn-secondary group-box">
          <span className="group-title text-light">group</span>
        </Link>
        <Link to="/" className="btn-secondary group-box">
          <span className="group-title text-light">group</span>
        </Link>
        <Link to="/" className="btn-secondary group-box">
          <span className="group-title text-light">group</span>
        </Link>
        <Link to="/" className="btn-secondary group-box">
          <span className="group-title text-light">group</span>
        </Link>
        <Link to="/" className="btn-secondary group-box">
          <span className="group-title text-light">group</span>
        </Link>
        <Link to="/" className="btn-secondary group-box">
          <span className="group-title text-light">group</span>
        </Link>
        <Link to="/" className="btn-secondary group-box">
          <span className="group-title text-light">group</span>
        </Link>
        <Link to="/" className="btn-secondary group-box">
          <span className="group-title text-light">group</span>
        </Link>
        <Link to="/" className="btn-secondary group-box">
          <span className="group-title text-light">group</span>
        </Link>
        <Link to="/" className="btn-secondary group-box">
          <span className="group-title text-light">group</span>
        </Link>
        <Link to="/" className="btn-secondary group-box">
          <span className="group-title text-light">group</span>
        </Link>
        <Link to="/" className="btn-secondary group-box">
          <span className="group-title text-light">group</span>
        </Link>
        <Link to="/" className="btn-secondary group-box">
          <span className="group-title text-light">group</span>
        </Link>
        <Link to="/" className="btn-secondary group-box">
          <span className="group-title text-light">group</span>
        </Link>
        <Link to="/" className="btn-secondary group-box">
          <span className="group-title text-light">group</span>
        </Link>
      </div>
      <Link to="/" className="add-btn">
        <span className="group-title text-light">Add Group</span>
      </Link>
    </div>
  );
}

export default Sidebar;
