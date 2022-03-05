import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import "../styles/creategroup.css";




class CreateGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groupname: "",
      groupdescrip: "",
      msg: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    console.log(name);
    console.log(value);
    this.setState({
      [name]: value,
    });
    console.log("change");
  }

  handleSubmit(e) {
    console.log("submit");
    console.log(this.state.groupname);

    const { groupname} = this.state;
    const group = {
      groupname
    };
    console.log(this.state.groupname);
  }

  render() {
    return (
        <div>
            <NavBar />
            <div className="text-center">
                    <div className="inner-container">
                        <form onSubmit={this.handleSubmit} className="form-event">
                          <div className="group-input ">
                            <input
                              name="groupname"
                              type="text"
                              value={this.state.groupname}
                              onChange={this.handleChange}
                              placeholder="Enter Group Name"
                              autoFocus
                              className="form-control"
                            />
                            <div className = "group-descrip">
                            <input
                              name="groupdescrip"
                              type="text"
                              value={this.state.groupdescrip}
                              onChange={this.handleChange}
                              placeholder="Description"
                              className="form-control"
                            />
                            </div>

                          </div>
            <div className = "group-owner">
                <p>created by </p>
                         </div>

                          <div className="add">
                            <button
                              className="button btn btn-lg btn-primary btn-block"
                              disabled={this.props.loadingSubmit}
                            >
                              {this.props.loadingSubmit ? (
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
}

export default CreateGroup;
