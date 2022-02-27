import React from "react";
import { Link } from "react-router-dom";
import "../../styles/comments.css";
import "../../styles/body.css";

function Comment(props) {
  return (
    <div>
      <div className="">
        <div className="">
          <b>{props.username}</b>
          <p>{props.text}</p>
        </div>
      </div>
    </div>
  );
}

function Comments(props) {
  const comments = [
    {
      username: "Assignment 1",
      text: "This is the first assignment.",
    },
    {
      username: "Assignment 2",
      text: "This is the second assignment.",
    },
    {
      username: "Assignment 1",
      text: "This is the first assignment.",
    },
    {
      username: "Assignment 2",
      text: "This is the second assignment.",
    },
    {
      username: "Assignment 1",
      text: "This is the first assignment.",
    },
    {
      username: "Assignment 2",
      text: "This is the second assignment.",
    },
    {
      username: "Assignment 1",
      text: "This is the first assignment.",
    },
    {
      username: "Assignment 2",
      text: "This is the second assignment.",
    },
    {
      username: "Assignment 1",
      text: "This is the first assignment.",
    },
    {
      username: "Assignment 2",
      text: "This is the second assignment.",
    },
    {
      username: "Assignment 1",
      text: "This is the first assignment.",
    },
    {
      username: "Assignment 2",
      text: "This is the second assignment.",
    },
    {
      username: "Assignment 1",
      text: "This is the first assignment.",
    },
    {
      username: "Assignment 2",
      text: "This is the second assignment.",
    },
    {
      username: "Assignment 1",
      text: "This is the first assignment.",
    },
    {
      username: "Assignment 2",
      text: "This is the second assignment.",
    },
    {
      username: "Assignment 1",
      text: "This is the first assignment.",
    },
    {
      username: "Assignment 2",
      text: "This is the second assignment.",
    },
    {
      username: "Assignment 1",
      text: "This is the first assignment.",
    },
    {
      username: "Assignment 2",
      text: "This is the second assignment.",
    },
    {
      username: "Assignment 1",
      text: "This is the first assignment.",
    },
    {
      username: "Assignment 2",
      text: "This is the second assignment.",
    },
    {
      username: "Assignment 1",
      text: "This is the first assignment.",
    },
    {
      username: "Assignment 2",
      text: "This is the second assignment.",
    },
  ];
  return (
    <div className="parent-container expand">
      <div className="comments-container">
        {comments.map((comment) => (
          <Comment username={comment.username} text={comment.text} />
        ))}
      </div>
      <Link to="/" className="add-btn">
        <span className="group-title text-light">Add Group</span>
      </Link>
    </div>
  );
}

export default Comments;
