import React, { useState } from "react";
// import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "../styles/signup.css";
import { Link } from "react-router-dom";
import { signUp } from "../utils/auth.js";
import { Redirect } from "react-router";

function SignUp(props) {
  const [state, setState] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  function handleChange(e) {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (state.password !== state.confirmPassword) {
      alert("Passwords are different!");
      return;
    }
    const { username, password } = state;
    signUp({ username, password })
      .then((result) => {
        console.log(result);
      })
      .then((error) => {
        alert(error.message);
      });
  }
  return (
    <div className="center text-center">
      <div className="inner-container">
        <div className="signup-card">
          <h1 className="font">{"bubble"}</h1>
          <form onSubmit={handleSubmit} className="form-signin">
            <input
              name="username"
              type="username"
              value={state.username}
              onChange={handleChange}
              placeholder="Username"
              autoFocus
              className="form-control"
            />
            <input
              name="password"
              type="password"
              value={state.password}
              onChange={handleChange}
              placeholder="Password"
              className="form-control"
            />
            <input
              name="confirmPassword"
              type="password"
              value={state.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="form-control"
            />
            <button
              className="button btn btn-lg btn-primary btn-block"
              disabled={props.loadingSubmit}
            >
              {props.loadingSubmit ? (
                <span className="spinner-border spinner-border-sm" />
              ) : (
                "Sign Up"
              )}
            </button>
          </form>
          <p>
            <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
