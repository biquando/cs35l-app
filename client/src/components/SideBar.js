import React from "react";
import { Link } from "react-router-dom";
import "../styles/sidebar.css";

class SideBar extends React.Component {
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

  render() {
    return (
      <div className="wrapper">
        <nav className="wrapper sidebar sticky-top">
          <Link to="/" className="navbar-brand">
            <span className="logo text-dark">bubble</span>
          </Link>
          <div className="line"></div>
          <div className="group-container">
            <Link to="/" className="btn-secondary group-box">
              <span className="group-title text-light">group</span>
            </Link>
            <Link to="/" className="btn-secondary group-box">
              <span className="group-title text-light">group</span>
            </Link>
            <Link to="/" className="btn-secondary group-box">
              <span className="group-title text-light">group</span>
            </Link>
            <Link to="/" className="btn-secondary group-box">
              <span className="group-title text-light">group</span>
            </Link>
            <Link to="/" className="btn-secondary group-box">
              <span className="group-title text-light">group</span>
            </Link>
          </div>
        </nav>
      </div>
    );
  }
}

export default SideBar;
