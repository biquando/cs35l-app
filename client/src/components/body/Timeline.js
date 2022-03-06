// import "./App.css";
import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import "../../styles/timeline.css";
import "../../styles/body.css";
import { format, isSameDay } from "date-fns";

function Day(props) {
  return (
    <div>
      <div>
        <div>
          <h6 className="">{format(props.date, "d LLLL, y")}</h6>
          <ul className="list-group">
            {props.events.map((event) => (
              <li className="list-group-item shadow-realm">
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

function Timeline({ events, loading, selectedGroup }) {
  const days = useMemo(() => getDays(events), [events]);
  return (
    <div className="parent-container">
      <div className="content-container">
        {days?.length ? (
          days.map((day) => (
            <Day
              key={day.date.toString()}
              date={day.date}
              events={day.events}
            />
          ))
        ) : (
          <ul className="list-group">
            <li className="list-group-item shadow-realm">
              <b>{loading ? "Loading..." : "No events created"}</b>
            </li>
          </ul>
        )}
      </div>
      <div className="sticky-bot">
        {selectedGroup ? (
          <Link to={`/group/${selectedGroup._id}/create-event`}>
            <button className="button btn btn-md btn-primary btn-block">
              Create Event
            </button>
          </Link>
        ) : (
          <button disabled className="button btn btn-md btn-primary btn-block">
            Create Event
          </button>
        )}
      </div>
    </div>
  );
}

export default Timeline;

function getDays(events) {
  if (!events?.length) return [];
  const days = [];
  events = [...events].sort(
    (a, b) => new Date(a.end_date).getTime() - new Date(b.end_date).getTime()
  );
  events.forEach((event, i) => {
    if (
      i > 0 &&
      isSameDay(new Date(event.end_date), new Date(events[i - 1].end_date))
    ) {
      days[days.length - 1].events.push(event);
    } else {
      days.push({ date: new Date(event.end_date), events: [event] });
    }
  });
}
