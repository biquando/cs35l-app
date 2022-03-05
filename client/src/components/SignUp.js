import React, { useState } from "react";
// import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "../styles/signup.css";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Redirect } from "react-router";

function SignUp(props) {
  const [state, setState] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    passwordsDifferent: false,
  });

  const { handleSignUp, errorMessage } = useAuth();

  function handleChange(e) {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setState((prev) => ({ ...prev, passwordsDifferent: false }));
    if (state.password !== state.confirmPassword) {
      // alert("Passwords are different!");
      setState((prev) => ({ ...prev, passwordsDifferent: true }));
      return;
    }
    const { username, password } = state;
    handleSignUp({ username, password });
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
              disabled={true}
            >
              {true ? (
                <span className="spinner-border spinner-border-sm" />
              ) : (
                "Sign Up"
              )}
            </button>
          </form>
          <p>
            <Link to="/login">Login</Link>
          </p>
          <div style={{ marginTop: "5px", color: "red" }}>
            {errorMessage && "Username already in use."}
          </div>
          <div style={{ marginTop: "5px", color: "red" }}>
            {state.passwordsDifferent && "Password doesn't match!"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
