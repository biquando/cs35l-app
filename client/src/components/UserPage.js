import React, { useState, useEffect } from "react";
import "../styles/userpage.css";
import { useParams } from "react-router-dom";
import { useUser, useGroups } from "../utils/swr";
import { useAuth } from "../contexts/AuthContext";
import NavBar from "./NavBar";

function UserPage(props) {
  const userId = useParams().user_id;
  const { data: user } = useUser({ userId });
  const { data: groups, isValidating: isValidatingGroups } = useGroups(
    { userIds: [user?._id] },
    !!user
  );

  const { user: currentUser } = useAuth();

  const isGroupsLoading = !groups && isValidatingGroups;

  return (
    <div>
      <NavBar />
      <div className="user-page">
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
                    {user?._id == currentUser?._id &&
                      (user?._id != group.owner_id ? (
                        <button className="badge bg-secondary rounded-pill">
                          Leave
                        </button>
                      ) : (
                        <button className="badge bg-danger rounded-pill">
                          Delete
                        </button>
                      ))}
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
