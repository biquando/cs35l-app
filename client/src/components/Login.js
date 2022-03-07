import React, { useState } from "react";
// import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "../styles/login.css";
import { Link } from "react-router-dom";
import { signUp } from "../utils/auth.js";
import { useAuth } from "../contexts/AuthContext";
import { Redirect } from "react-router-dom";

function Login(props) {
  const [state, setState] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const { handleLogIn, errorMessage, loading } = useAuth();

  function handleChange(e) {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    console.log("pressed login");
    e.preventDefault();
    const { username, password } = state;
    handleLogIn({ username, password });
  }

  return (
    <div className="center text-center">
      <div className="inner-container">
        <div className="login-card">
          <h1 className="font">{"bubble"}</h1>
          <form onSubmit={handleSubmit} className="form-login">
            <input
              name="username"
              type="text"
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
            <button
              className="button btn btn-lg btn-primary btn-block"
              disabled={loading}
            >
              Login
            </button>
          </form>
          <p>
            <Link to="/signup">Sign Up</Link>
          </p>
          <div style={{ marginTop: "5px", color: "red" }}>
            {errorMessage ? "Incorrect login!" : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
