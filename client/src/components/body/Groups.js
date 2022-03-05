import React from "react";
import { Link } from "react-router-dom";
import "../../styles/groups.css";
import "../../styles/body.css";

function Groups(props) {
  const groupData = [
    {
      events: [
        {
          eventname: "name1",
          date: "date1",
          description: "description1",
        },
      ],
      comments: [
        {
          username: "username1",
          text: "this is a nice comment",
        },
        {
          username: "username2",
          text: "this is an ok comment",
        },
        {
          username: "username1",
          text: "this is a detailed comment",
        },
        {
          username: "username2",
          text: "this is a mean comment",
        },
        {
          username: "username3",
          text: "this is a sad comment",
        },
      ],
    },
  ];
  return (
    <div className="parent-container">
      <div className="content-container">
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
        <Link to="/" className="btn-secondary group-box">
          <span className="group-title text-light">group</span>
        </Link>
        <Link to="/" className="btn-secondary group-box">
          <span className="group-title text-light">groupasdfasdfsadf</span>
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
      <div className="sticky-bot">
        <button className="add-group-btn button btn btn-md btn-primary">
          +
        </button>
      </div>
    </div>
  );
}

export default Groups;
