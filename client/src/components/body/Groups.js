import React, { useState } from "react";
import { Link } from "react-router-dom";
import AddGroupCard from "./AddGroupCard";
import "../../styles/groups.css";
import "../../styles/body.css";
import { useAuth } from "../../contexts/AuthContext";

function Groups({ groups, onChangeGroup, selectedGroup, refreshGroups }) {
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

  const [showAddGroupCard, setShowAddGroupCard] = useState(false);

  const handleShowCard = () => {
    setShowAddGroupCard(!showAddGroupCard);
  };

  return (
    <div className="parent-container">
      <div className="content-container group-content-container">
        {groups?.map((group, index) => (
          <span
            className="btn-secondary group-box"
            style={{
              cursor: "pointer",
              backgroundColor:
                group._id === selectedGroup?._id ? "#0e6dfd" : undefined,
            }}
            onClick={() => onChangeGroup(group)}
          >
            <span className="group-title text-light">
              {groupInitials[index]}
            </span>
          </span>
        ))}
      </div>
      {showAddGroupCard && <AddGroupCard refreshGroups={refreshGroups} />}
      <div className="sticky-bot">
        <button
          className="add-group-btn button btn btn-md btn-primary"
          onClick={handleShowCard}
        >
          <div className="add-group-text">+</div>
        </button>
      </div>
    </div>
  );
}

export default Groups;
