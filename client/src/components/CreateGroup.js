import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import "../styles/creategroup.css";
import "../styles/body.css";
import { createGroup } from "../utils/group.js";
import { useAuth } from "../contexts/AuthContext";

function CreateGroup(props) {
  const [state, setState] = useState({
    name: "",
    description: "",
    msg: null,
  });

  const { loading } = useAuth();
  let navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    console.log(name);
    console.log(value);
    setState((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    console.log("submit");
    //console.log(this.state.groupname);
    e.preventDefault();

    const { name, description } = state;
    await createGroup({ name, description });
    // Since this is rendered both in App.js and the modal
    props.refreshGroups?.();
    props.onCreateGroupCard?.();
    navigate("/");
  }

  return (
    <div className="create-group-parent-container">
      <div className="create-group-page-container">
        <div
          className="create-group-content-container"
          style={{ opacity: "100%" }}
        >
          <h1 className="group-header">{"Create Group"}</h1>
          <form onSubmit={handleSubmit}>
            <div className="group-input">
              <div className="group-descrip">
                <input
                  name="name"
                  type="text"
                  value={state.name}
                  onChange={handleChange}
                  placeholder="Enter a name..."
                  className="form-control"
                  autoFocus
                />
              </div>
              <div className="group-descrip">
                <textarea
                  name="description"
                  rows="5"
                  value={state.description}
                  onChange={handleChange}
                  placeholder="Enter a description..."
                  className="form-control"
                />
              </div>
            </div>

            <div>
              <button
                className="button btn btn-lg btn-primary btn-block"
                disabled={loading}
                onClick={handleSubmit}
              >
                Create
              </button>
              <button
                className="cancel-button-padding button btn btn-lg btn-primary btn-block"
                disabled={loading}
                onClick={() => props.onCreateGroupCard()}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateGroup;
