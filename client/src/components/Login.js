import React from "react";
// import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "../styles/signup.css";
import { Link } from "react-router-dom";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      msg: null,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  Login = () => {
    console.log("login");
  };

  Logout = () => {
    console.log("Logout");
  };

  onChange = () => {
    console.log("change");
  };

  onSubmit = () => {
    console.log("submit");
  };

  render() {
    return (
      <div className="center text-center">
        <div className="inner-container">
          <div className="login-card">
            <h1 className="font">{"bubble"}</h1>
            <form onSubmit={this.onSubmit} className="form-signin">
              <input
                name="username"
                type="text"
                value={this.state.username}
                onChange={this.onChange}
                placeholder="Username"
                autoFocus
                className="form-control"
              />
              <input
                name="password"
                type="password"
                value={this.state.password}
                onChange={this.onChange}
                placeholder="Password"
                className="form-control"
              />
              <button
                className="button btn btn-lg btn-primary btn-block"
                disabled={this.props.loadingSubmit}
              >
                {this.props.loadingSubmit ? (
                  <span className="spinner-border spinner-border-sm" />
                ) : (
                  "Login"
                )}
              </button>
            </form>
            {/* TODO: register link */}
            <p>
              <Link to="/signup">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;
