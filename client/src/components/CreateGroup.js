import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import "../styles/creategroup.css";
import { createGroup } from "../utils/group.js";
import { useAuth } from "../contexts/AuthContext";




function CreateGroup(props){

    const[state,setState] = useState({
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
    setState((prev) => ({...prev, [name]:value}));
  }

 async function handleSubmit(e) {
    console.log("submit");
    //console.log(this.state.groupname);
    e.preventDefault();

    const {name, description} = state;
    await createGroup({name,description});
    navigate("/")
  }


    return (
        <div>
            <NavBar />
            <div className="text-center">
                    <div className="inner-container">
                        <form onSubmit={handleSubmit} className="form-event">
                          <h1 className="header"> Create New Group </h1>
                          <div className="group-input ">
                            <input
                              name="name"
                              type="text"
                              value={state.name}
                              onChange={handleChange}
                              placeholder="Enter Group Name"
                              className="form-control"
                            />
                            <div className = "group-descrip">
                            <input
                              name="description"
                              type="text"
                              value={state.description}
                              onChange={handleChange}
                              placeholder="Enter Group Description"
                              className="form-control"
                            />
                            </div>

                          </div>

                          <div className="add">
                            <button

                              className="button btn btn-lg btn-primary btn-block"
                              disabled={loading}
                            >
                              {loading ? (
                                <span className="spinner-border spinner-border-sm" />
                              ) : (
                                "Add"
                              )}
                            </button>
                          </div>

                        </form>
                      </div>
                    </div>


        </div>

    );

}

export default CreateGroup;
