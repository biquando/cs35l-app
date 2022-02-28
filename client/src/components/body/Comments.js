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

  const handleComment = () => {
    return;
  };

  return (
    <div className="parent-container expand">
      <div className="content-container">
        {comments.map((comment) => (
          <Comment username={comment.username} text={comment.text} />
        ))}
      </div>
      <div className="sticky-bot">
        <input
          name="username"
          type="comment"
          value={comments.text}
          onChange={handleComment}
          placeholder="Add a comment..."
          autoFocus
          className="comment-input"
        />
      </div>
    </div>
  );
}

export default Comments;
