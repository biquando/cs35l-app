import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function LoginForm() {
  // return (
  //   <div>
  //     <form>
  //       <div className="form-inner">
  //         <h2>Login</h2>
  //         <div className="form-group">
  //           <label htmlFor="name">Name:</label>
  //           <input type="text" name="name" />
  //         </div>
  //       </div>
  //     </form>
  //     <Button>Submit</Button>
  //   </div>
  // );

  const [user, setUser] = useState({ name: "", email: "" });
  const [error, setError] = useState("");

  const Login = (details) => {
    console.log(details);
  };

  const Logout = () => {
    console.log("Logout");
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col
          lg={4}
          md={6}
          sm={12}
          className="text-center p-5 shadow-sm rounded-lg"
        >
          <Form>
            <h1 className="text-center">Login</h1>
            <Form.Group className="p-1" controlId="emailInput">
              <Form.Control type="email" placeholder="Email" />
            </Form.Group>
            <Form.Group className="p-1" controlId="paswordInput">
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button type="submit">Login</Button>
          </Form>
        </Col>
        {/* <Col lg={8} md={6} sm={12}></Col> */}
      </Row>
    </Container>
  );
}

export default LoginForm;
