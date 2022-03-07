// import "./App.css";
import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import "../../styles/timeline.css";
import "../../styles/body.css";
import { format, isSameDay } from "date-fns";
import { useAuth } from "../../contexts/AuthContext";

function Day(props) {
  const { user } = useAuth();
  const isEditable = props.selectedGroup?.owner_id === user?._id;

  return (
    <div>
      <div>
        <div>
          <h6 className="">{format(props.date, "d LLLL, y")}</h6>
          <ul className="list-group">
            {props.events.map((event) => (
              <li
                className="list-group-item shadow-realm"
                style={{ position: "relative", cursor: "pointer" }}
                onClick={() => props.onChangeEvent(event)}
              >
                <b>{event.name}</b>
                {event.description && <p>{event.description}</p>}
                {isEditable ? (
                  <Link
                    to={`/group/${props.selectedGroup._id}/event/${event._id}/edit`}
                  >
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: "bold",
                        cursor: "pointer",
                        position: "absolute",
                        top: "10px",
                        right: "20px",
                      }}
                    >
                      EDIT
                    </span>
                  </Link>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <br />
    </div>
  );
}

function Timeline({ events, loading, selectedGroup, onChangeEvent }) {
  const days = useMemo(() => getDays(events), [events]);

  return (
    <div className="parent-container">
      <div className="content-container" style={{ width: "350px" }}>
        {days?.length ? (
          days.map((day) => (
            <Day
              key={day.date.toString()}
              date={day.date}
              events={day.events}
              selectedGroup={selectedGroup}
              onChangeEvent={onChangeEvent}
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
  return days;
}
