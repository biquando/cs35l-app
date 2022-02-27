// import "./App.css";
import React from "react";
import { Link } from "react-router-dom";
import "../../styles/timeline.css";
import "../../styles/body.css";

function Day(props) {
  return (
    <div>
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">{props.date}</h2>
          <ul className="list-group">
            {props.events.map((event) => (
              <li className="list-group-item">
                <b>{event.title}</b>
                {event.description && <p>{event.description}</p>}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <br />
    </div>
  );
}

class Timeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        {
          date: "07 Feb Monday",
          events: [
            {
              title: "Assignment 1",
              description: "This is the first assignment.",
            },
            {
              title: "Assignment 2",
              description: "This is the second assignment.",
            },
          ],
        },
        {
          date: "08 Feb Tuesday",
          events: [
            {
              title: "Assignment 3",
              description: "This is the third assignment.",
            },
          ],
        },
        {
          date: "10 Feb Thursday",
          events: [
            {
              title: "Midterm",
            },
          ],
        },
        {
          date: "07 Feb Monday",
          events: [
            {
              title: "Assignment 1",
              description: "This is the first assignment.",
            },
            {
              title: "Assignment 2",
              description: "This is the second assignment.",
            },
          ],
        },
        {
          date: "08 Feb Tuesday",
          events: [
            {
              title: "Assignment 3",
              description: "This is the third assignment.",
            },
          ],
        },
        {
          date: "10 Feb Thursday",
          events: [
            {
              title: "Midterm",
            },
          ],
        },
      ],
    };
  }

  render() {
    return (
      <div className="parent-container">
        <div className="content-container">
          {this.state.list.map((day) => (
            <Day date={day.date} events={day.events} />
          ))}
        </div>
        <Link to="/" className="add-btn">
          <span className="group-title text-light">Add Group</span>
        </Link>
      </div>
    );
  }
}

export default Timeline;