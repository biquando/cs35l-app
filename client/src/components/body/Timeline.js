// import "./App.css";
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/timeline.css";
import "../../styles/body.css";
import { format, isSameDay } from "date-fns";
import { useAuth } from "../../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faPen } from "@fortawesome/free-solid-svg-icons";

function Day(props) {
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
                {props.isEditable ? (
                  <Link
                    to={`/group/${props.selectedGroup._id}/event/${event._id}/edit`}
                  >
                    <FontAwesomeIcon
                      style={{
                        fontSize: "12px",
                        fontWeight: "bold",
                        cursor: "pointer",
                        position: "absolute",
                        top: "13px",
                        right: "13px",
                        color: "rgba(0,0,0,0.5)",
                      }}
                      icon={faPen}
                    />
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
  const { user } = useAuth();
  const isEditable = selectedGroup?.owner_id === user?._id;

  async function handleCopyToClipboard() {
    await navigator.clipboard.writeText(
      `${window.location.origin}/?join=${selectedGroup?._id}`
    );
    alert("Sharable link copied to clipboard");
  }

  const [showAddGroupCard, setShowAddGroupCard] = useState(false);

  const handleShowCard = () => {
    setShowAddGroupCard(!showAddGroupCard);
  };

  return (
    <div className="parent-container">
      <div
        className="right-timeline-border content-container"
        style={{ width: "350px" }}
      >
        {selectedGroup && (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h5 style={{ marginBottom: "0" }}>{selectedGroup.name}</h5>
              <span
                style={{
                  cursor: "pointer",
                  opacity: "0.8",
                }}
                onClick={handleCopyToClipboard}
              >
                <FontAwesomeIcon
                  style={{ color: "rgba(0,0,0,0.5)" }}
                  icon={faCopy}
                />
              </span>
            </div>
            <hr className="divider" />
          </>
        )}

        {days?.length ? (
          days.map((day) => (
            <Day
              key={day.date.toString()}
              date={day.date}
              events={day.events}
              selectedGroup={selectedGroup}
              onChangeEvent={onChangeEvent}
              isEditable={isEditable}
            />
          ))
        ) : (
          <p style={{ color: "rgba(0,0,0,0.5)" }}>
            {loading ? "Loading..." : "Create an event!"}
          </p>
        )}
      </div>
      <div className="sticky-bot right-timeline-border">
        {selectedGroup && isEditable ? (
          <Link to={`/group/${selectedGroup._id}/create-event`}>
            <button
              className="button btn btn-md btn-primary btn-block"
              onClick={handleShowCard}
            >
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
