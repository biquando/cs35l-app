import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";

function NavBar(props) {
  return (
    // navbar sticky-top
    <nav className="topbar navbar">
      <Link to="/" className="navbar-brand">
        <span className="logo text-dark">bubble</span>
      </Link>
      <Link to="/" className="">
        <span className="profile">username</span>
      </Link>
    </nav>
  );
}

export default NavBar;
