import React from "react";
import { Link } from "react-router-dom";
import "../../styles/groups.css";
import "../../styles/body.css";
import { useAuth } from "../../contexts/AuthContext";

function Groups({ groups, onChangeGroup }) {
  const groupInitials = groups?.map((group) => {
    const wordList = group?.name.split(" ");
    let initials = "";
    let i = 0;
    while (i < 5 && i < wordList.length) {
      initials += wordList[i][0];
      ++i;
    }
    return initials;
  });
  //console.log(groupInitials);

  return (
    <div className="parent-container">
      <div className="content-container">
        {groups?.map((group, index) => (
          <span
            className="btn-secondary group-box"
            style={{ cursor: "pointer" }}
            onClick={() => onChangeGroup(group)}
          >
            <span className="group-title text-light">
              {groupInitials[index]}
            </span>
          </span>
        ))}
      </div>
      <div className="sticky-bot">
        <Link to="/create-group" className="">
          <button className="add-group-btn button btn btn-md btn-primary">
            <span className="add-group-text">+</span>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Groups;
