import React from "react";
// import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "../styles/signup.css";
import { Link } from "react-router-dom";

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      msg: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //TODO: what to do when user submits
  // componentDidUpdate(prevProps) {
  //   const { error, isAuthenticated } = this.props;
  //   if (error !== prevProps.error) {
  //     // Check for a signup error
  //     if (error.id === "LOGIN_FAIL") {
  //       this.setState({ msg: error.msg.msg });
  //     } else {
  //       this.setState({ msg: null });
  //     }
  //   }

  //   if (isAuthenticated) {
  //     window.location = "/blap/#/";
  //   }
  // }

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
    console.log(this.state.username, this.state.password);
    // e.preventDefault();

    const { username, password } = this.state;
    const user = {
      username,
      password,
    };

    console.log(this.state.username, this.state.password);

    // Attempt to log in
    // this.props.login(user);
    // console.log("submit");
  }

  render() {
    return (
      <div className="center text-center">
        <div className="inner-container">
          <div className="signup-card">
            <h1 className="font">{"bubble"}</h1>
            <form onSubmit={this.handleSubmit} className="form-signin">
              <input
                name="username"
                type="text"
                value={this.state.username}
                onChange={this.handleChange}
                placeholder="Username"
                autoFocus
                className="form-control"
              />
              <input
                name="email"
                type="password"
                value={this.state.email}
                onChange={this.handleChange}
                placeholder="Email"
                autoFocus
                className="form-control sharp-corners"
              />
              <input
                name="password"
                type="text"
                value={this.state.password}
                onChange={this.handleChange}
                placeholder="Password"
                className="form-control"
              />
              <input
                name="confirm-password"
                type="password"
                value={this.state.confirmPassword}
                onChange={this.handleChange}
                placeholder="Confirm Password"
                className="form-control"
              />
              <button
                className="button btn btn-lg btn-primary btn-block"
                disabled={this.props.loadingSubmit}
              >
                {this.props.loadingSubmit ? (
                  <span className="spinner-border spinner-border-sm" />
                ) : (
                  "Sign Up"
                )}
              </button>
            </form>
            <p>
              <Link to="/">Login</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUpForm;
