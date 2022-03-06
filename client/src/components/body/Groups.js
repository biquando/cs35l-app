import React from "react";
import { Link } from "react-router-dom";
import "../../styles/groups.css";
import "../../styles/body.css";

function Groups({ groups, onChangeGroup }) {
  return (
    <div className="parent-container">
      <div className="content-container">
        {groups?.map((group) => (
          <span
            className="btn-secondary group-box"
            style={{ cursor: "pointer" }}
            onClick={() => onChangeGroup(group)}
          >
            <span className="group-title text-light">group</span>
          </span>
        ))}
      </div>
      <div className="sticky-bot">
        <button className="add-group-btn button btn btn-md btn-primary">
          +
        </button>
      </div>
    </div>
  );
}

export default Groups;
