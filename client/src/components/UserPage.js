import React, { useState } from "react";
import "../styles/userpage.css";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useUser, useGroups } from "../utils/swr";
import { useAuth } from "../contexts/AuthContext";
import { leaveGroup, deleteGroup, joinGroup } from "../utils/group";
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

  const { user: originalUser } = useAuth();
  const { data: currentUser, mutate: mutateCurrentUser } = useUser(
    { userId: originalUser?._id },
    !!originalUser
  );
  const navigate = useNavigate();

  async function handleLeaveGroup(groupId) {
    await leaveGroup({ groupId });
    mutateGroups();
  }

  async function handleDeleteGroup(groupId) {
    await deleteGroup({ groupId });
    mutateGroups();
  }

  async function handleJoinGroup(groupId) {
    await joinGroup({ groupId });
    mutateCurrentUser();
    mutateGroups();
    navigate(`/?open=group&group_id=${groupId}`);
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
          <div className="user-page-container">
            <div className="parent-container expand">
              <div className="user-page-content-container">
                <h1>{user?.username}</h1>
                {isEditing ? (
                  <div className="edit-user-description-container">
                    <textarea
                      className="form-control"
                      rows="5"
                      defaultValue={newText}
                      onChange={(e) => setNewText(e.target.value)}
                    ></textarea>
                    <div className="edit-user-description-btn-container">
                      <button
                        className="edit-user-description-btn"
                        onClick={() => {
                          setEditing(false);
                        }}
                      >
                        <div className="edit-user-description-text">Cancel</div>
                      </button>
                      <button
                        className="edit-user-description-btn"
                        onClick={confirmEdit}
                      >
                        <div className="edit-user-description-text">
                          Confirm
                        </div>
                      </button>
                    </div>
                    <br />
                    <br />
                  </div>
                ) : (
                  <div>
                    {user?.description}{" "}
                    {user?._id == currentUser?._id && (
                      <div>
                        <br />
                        <button
                          className="edit-user-description-btn"
                          onClick={() => {
                            setNewText(user?.description);
                            setEditing(true);
                          }}
                        >
                          <div className="edit-user-description-text">
                            Edit Description
                          </div>
                        </button>
                      </div>
                    )}
                  </div>
                )}
                <br />
                {groups?.length > 0 && <h4>Groups:</h4>}
                {isGroupsLoading ? null : (
                  <ul className="list-group">
                    {groups?.map((group) =>
                      currentUser?.group_ids.includes(group._id) ? (
                        <li
                          key={group._id}
                          className="list-group-item d-flex justify-content-between align-items-start list-group-modifier"
                        >
                          <div>
                            <Link
                              to={`/?open=group&group_id=${group._id}`}
                              className="text-dark group-link stretched-link"
                            >
                              {group.name}
                            </Link>
                          </div>
                          <div>
                            {user?._id == currentUser?._id &&
                              (user?._id != group.owner_id ? (
                                <button
                                  className="leave-group-button"
                                  onClick={() => handleLeaveGroup(group._id)}
                                >
                                  <div className="leave-group-text">Leave</div>
                                </button>
                              ) : (
                                <button
                                  className="leave-group-button"
                                  onClick={() => handleDeleteGroup(group._id)}
                                >
                                  <div className="leave-group-text">Delete</div>
                                </button>
                              ))}
                          </div>
                        </li>
                      ) : (
                        <li
                          key={group._id}
                          className="list-group-item d-flex justify-content-between align-items-start list-group-modifier"
                        >
                          <div className="">{group.name}</div>
                          <button
                            className="join-group-button"
                            onClick={() => handleJoinGroup(group._id)}
                          >
                            <div className="join-group-text">Join</div>
                          </button>
                        </li>
                      )
                    )}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
