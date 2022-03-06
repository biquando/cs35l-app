import React, { useState } from "react";
import "../styles/userpage.css";
import { useParams } from "react-router-dom";
import { useUser, useGroups } from "../utils/swr";
import { useAuth } from "../contexts/AuthContext";
import { leaveGroup, deleteGroup } from "../utils/group";
import NavBar from "./NavBar";

function UserPage(props) {
  const userId = useParams().user_id;
  const { data: user } = useUser({ userId });
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
    setEditing(false);
  }

  return (
    <div>
      <NavBar />
      <div className="user-page">
        <div className="parent-container expand">
          <div className="content-container">
            <h1>{user?.username}</h1>
            {isEditing ? (
              <div>
                <textarea className="form-control" rows="5">
                  {newText}
                </textarea>
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
                <button
                  className="badge bg-light rounded-pill text-dark"
                  onClick={() => {
                    setNewText(user?.description);
                    setEditing(true);
                  }}
                >
                  Edit
                </button>
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
                          className="badge bg-secondary rounded-pill"
                          onClick={() => handleLeaveGroup(group._id)}
                        >
                          Leave
                        </button>
                      ) : (
                        <button
                          className="badge bg-danger rounded-pill"
                          onClick={() => handleDeleteGroup(group._id)}
                        >
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
