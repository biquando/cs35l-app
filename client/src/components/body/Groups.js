import React from "react";
import { Link } from "react-router-dom";
import "../../styles/groups.css";
import "../../styles/body.css";
import { useAuth } from "../../contexts/AuthContext";

function Groups({ groups, onChangeGroup }) {
  // const groupData = getGroups({ userIds: [] })
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
        <Link to="/create-group" className="">
          <button className="add-group-btn button btn btn-md btn-primary">
            +
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Groups;
