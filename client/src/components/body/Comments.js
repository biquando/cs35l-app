import React from "react";
import { Link } from "react-router-dom";
import "../../styles/comments.css";

function Comment(props) {
  return (
    <div>
      <div className="card">
        <div className="card-body">
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
  ];
  return (
    <div className="comments-wrapper">
      {comments.map((comment) => (
        <Comment username={comment.username} text={comment.text} />
      ))}
    </div>
  );
}

export default Comments;

// class Comments extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       comments: [
//         {
//           username: "Assignment 1",
//           comment: "This is the first assignment.",
//         },
//         {
//           username: "Assignment 2",
//           comment: "This is the second assignment.",
//         },
//       ],
//     };
//   }

//   render() {
//     return (
//       <div className="comments-wrapper">
//         {this.state.list.map((comment) => (
//           <Comment username={comment.username} />
//         ))}
//       </div>
//     );
//   }
// }
