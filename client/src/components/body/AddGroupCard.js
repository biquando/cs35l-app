import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/addgroupcard.css";
import CreateGroupCard from "../CreateGroup";

function AddGroupCard(props) {
  const [showCreateGroupCard, setShowCreateGroupCard] = useState(false);

  const toggleCreateGroupCard = () => {
    setShowCreateGroupCard(!showCreateGroupCard);
  };

  const [showJoinGroupCard, setJoinCreateGroupCard] = useState(false);

  const toggleJoinGroupCard = () => {
    setJoinCreateGroupCard(!showJoinGroupCard);
  };

  return (
    <div>
      <div className="add-group-card">
        <button className="logout-btn" onClick={toggleCreateGroupCard}>
          <div className="logout-text">Create Group</div>
        </button>
        <button className="logout-btn" onClick={toggleJoinGroupCard}>
          <div className="logout-text">Join Group</div>
        </button>
      </div>
      {showCreateGroupCard ? (
        <CreateGroupCard
          onCreateGroupCard={toggleCreateGroupCard}
          refreshGroups={props.refreshGroups}
        />
      ) : null}
      {showJoinGroupCard ? (
        <CreateGroupCard
          onCreateGroupCard={toggleJoinGroupCard}
          refreshGroups={props.refreshGroups}
        />
      ) : null}
    </div>
  );
}

export default AddGroupCard;
