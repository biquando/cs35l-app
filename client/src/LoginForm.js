import React from "react";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
    };

    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }

  handleEmail(event) {}
  handlePassword(event) {}

  render() {
    return (
      <form>
        <label>
          Email:
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleEmail}
          />
          Password:
          <input
            type="text"
            value={this.state.value}
            onChange={this.handlePassword}
          />
        </label>
      </form>
    );
  }
}

export default LoginForm;
