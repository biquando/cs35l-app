import React, { useState, useEffect } from "react";
import "../styles/userpage.css";
import { useParams } from "react-router-dom";
import { useUser, useGroups } from "../utils/swr";
import NavBar from "./NavBar";

function UserPage(props) {
  const userId = useParams().user_id;
  const { data: user } = useUser({ userId });
  const { data: groups, isValidating: isValidatingGroups } = useGroups(
    { userIds: [user?._id] },
    !!user
  );

  const isGroupsLoading = !groups && isValidatingGroups;

  return (
    <div className="page-wrapper">
      <NavBar />
      <div className="body-wrapper">
        <div className="parent-container expand">
          <div className="content-container">
            <h1>{user?.username}</h1>
            <p>{user?.description}</p>
            <h4>Groups:</h4>
            {isGroupsLoading ? null : (
              <ul className="list-group">
                {groups?.map((group) => (
                  <li className="list-group-item d-flex justify-content-between align-items-start">
                    <div>{group.name}</div>
                    <button className="badge bg-danger rounded-pill">X</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
