import React, { useState } from "react";
import "../styles/userpage.css";
import { useParams } from "react-router-dom";
import { useUser, useGroups } from "../utils/swr";
import { useAuth } from "../contexts/AuthContext";
import { leaveGroup, deleteGroup } from "../utils/group";
import NavBar from "./NavBar";
import { updateUser } from "../utils/user";

function UserPage(props) {
  const userId = useParams().user_id;
  const { data: user, mutate: mutateUser } = useUser({ userId });
  const {
    data: groups,
    isValidating: isValidatingGroups,
    mutate: mutateGroups,
  } = useGroups({ userIds: [user?._id] }, !!user);
  const isGroupsLoading = !groups && isValidatingGroups;

  const { user: currentUser } = useAuth();

  async function handleLeaveGroup(groupId) {
    await leaveGroup({ groupId });
    mutateGroups();
  }

  async function handleDeleteGroup(groupId) {
    await deleteGroup({ groupId });
    mutateGroups();
  }

  const [isEditing, setEditing] = useState(false);
  const [newText, setNewText] = useState("");

  async function confirmEdit() {
    await updateUser({ userId, updates: { new_description: newText } });
    setEditing(false);
    mutateUser();
  }

  return (
    <div className="page-wrapper">
      <NavBar />
      <div className="body-wrapper">
        <div className="user-page">
          <div className="parent-container expand">
            <div className="content-container">
              <h1>{user?.username}</h1>
              {isEditing ? (
                <div>
                  <textarea
                    className="form-control"
                    rows="5"
                    defaultValue={newText}
                    onChange={(e) => setNewText(e.target.value)}
                  ></textarea>
                  <button
                    className="badge bg-secondary rounded-pill"
                    onClick={() => {
                      setEditing(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="badge bg-success rounded-pill"
                    onClick={confirmEdit}
                  >
                    Confirm
                  </button>
                  <br />
                  <br />
                </div>
              ) : (
                <p>
                  {user?.description}{" "}
                  {user?._id == currentUser?._id && (
                    <button
                      className="badge bg-light rounded-pill text-dark"
                      onClick={() => {
                        setNewText(user?.description);
                        setEditing(true);
                      }}
                    >
                      Edit
                    </button>
                  )}
                </p>
              )}
              {groups?.length > 0 && <h4>Groups:</h4>}
              {isGroupsLoading ? null : (
                <ul className="list-group">
                  {groups?.map((group) => (
                    <li className="list-group-item d-flex justify-content-between align-items-start">
                      <div>{group.name}</div>
                      {user?._id == currentUser?._id &&
                        (user?._id != group.owner_id ? (
                          <button
                            className="leave-group-button"
                            onClick={() => handleLeaveGroup(group._id)}
                          >
                            Leave
                          </button>
                        ) : (
                          <button
                            className="leave-group-button"
                            onClick={() => handleDeleteGroup(group._id)}
                          >
                            <div className="leave-group-text">Leave Group</div>
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
    </div>
  );
}

export default UserPage;
