import React, { useState } from "react";
// import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "../../styles/signup.css";
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
            <h1 className="font">Bubble</h1>
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
            <p>Register</p>
          </div>
        </div>
      </div>
    );
  }
  /*
  <div className="text-center">
      <h1>Log in</h1>
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

          {this.state.msg ? (
              <div className="alert alert-danger">
                  {this.state.msg}
              </div>
          ) : null}

          <button
              className="btn btn-lg btn-primary btn-block"
              disabled={this.props.loadingSubmit}
          >
              {this.props.loadingSubmit ? (
                  <span className="spinner-border spinner-border-sm" />
              ) : (
                  "Submit"
              )}
          </button>
      </form>

      <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
  </div>
    */
  // <Container>
  //   <Row>
  //     <Col
  //       lg={4}
  //       md={6}
  //       sm={12}
  //       className="text-center p-5 shadow-sm rounded-lg"
  //     >
  //       <Form>
  //         <h1 className="text-center">Login</h1>
  //         <Form.Group className="p-2" controlId="emailInput">
  //           <Form.Control type="email" placeholder="Email" />
  //         </Form.Group>
  //         <Form.Group className="p-2" controlId="paswordInput">
  //           <Form.Control type="password" placeholder="Password" />
  //         </Form.Group>
  //         <Button type="submit">Login</Button>
  //       </Form>
  //     </Col>
  //     {/* <Col lg={8} md={6} sm={12}></Col> */}
  //   </Row>
  // </Container>
}

export default LoginForm;
