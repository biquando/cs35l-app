import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../utils/swr.js";
import { createMessage } from "../../utils/message.js";
import "../../styles/comments.css";
import "../../styles/body.css";

function Comment(props) {
  const { data: user } = useUser({ userId: props.userId });

  return (
    <div>
      <div className="">
        <div className="">
          <b>{user?.username}</b>
          <p>{props.text}</p>
        </div>
      </div>
    </div>
  );
}

function Comments(props) {
  const [state, setState] = useState({
    groupId: "",
    eventId: "",
    text: "",
  });
  const [loading, setLoading] = React.useState(false);
  const comments = [];

  const handleComment = (e) => {
    const { groupId, eventId, value: text } = e.target;
    console.log(text);
    setState((prev) => ({ ...prev, text }));
  };

  const submitCommentLine = async (e) => {
    e.preventDefault();
    const { groupId, eventId, text } = state;
    setLoading(true);
    setState((prev) => ({ ...prev, text: "" }));
    await props.onPostMessage(text);
    setLoading(false);
  };

  if (props.disabled) {
    return (
      <div className="no-comment">
        <p>no event selected</p>
      </div>
    );
  }

  return (
    <div className="parent-container expand">
      <div className="content-container">
        {props.selectedEvent && (
          <>
            <h5>{props.selectedEvent.name}</h5>
            <hr className="divider" />
          </>
        )}
        {props.messages?.map((comment) => (
          <Comment userId={comment.user_id} text={comment.text} />
        ))}
      </div>
      <div className="sticky-bot">
        <input
          disabled={props.disabled}
          name="username"
          type="comment"
          value={state.text}
          onChange={handleComment}
          placeholder="Add a comment..."
          autoFocus
          className="comment-input"
          onKeyPress={submitCommentLine}
        />
      </div>

      <button
        onClick={submitCommentLine}
        type="submit"
        className="comment-button"
        disabled={loading}
      >
        Post
      </button>
    </div>
  );
}

export default Comments;
