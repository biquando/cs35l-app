import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTarget: "",
      showMenu: false,
    };
    this.onChange = this.onChange.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
  }

  onChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  submitSearch(e) {
    e.preventDefault();
    if (this.state.searchTarget.trim() === "") {
      return;
    }

    // window.location =
    //     "/blap/#/search?target=" + this.state.searchTarget.trim()
    // window.location.reload(true)
  }

  // TODO: username/profile text not right aligning
  render() {
    return (
      <nav className="spreadnav topbar navbar  sticky-top">
        <Link to="/" className="navbar-brand">
          <span className="logo text-dark">bubble</span>
        </Link>
        <Link to="/LandingPage" className="landing-page">
          <span className="landing-page">schedule</span>
        </Link>
        <Link to="/" className="">
          <span className="profile">username</span>
        </Link>
      </nav>
    );
  }
}

export default NavBar;
