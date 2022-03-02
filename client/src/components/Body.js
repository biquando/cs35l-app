import React from "react";
import { Link } from "react-router-dom";
import "../styles/body.css";

import NavBar from "./NavBar";
import Groups from "./body/Groups";
import Timeline from "./body/Timeline";
import Comments from "./body/Comments";

function Body(props) {
  return (
    <div className="page-wrapper">
      <NavBar />
      <div className="body-wrapper">
        <Groups />
        <Timeline />
        <Comments />
      </div>
    </div>
  );
}

export default Body;
