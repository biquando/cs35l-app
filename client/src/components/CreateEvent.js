import React from "react";
import "../styles/createevent.css";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "./NavBar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createEvent } from "../utils/event";
import { useGroup } from "../utils/swr";
import { useAuth } from "../contexts/AuthContext";
import "../styles/creategroup.css";

function CreateEvent(props) {
  const [name, setName] = React.useState("");
  const [eventdate, setEventdate] = React.useState(false);
  const [description, setDescription] = React.useState("");
  const { token } = useAuth();

  const params = useParams();
  const currentGroupId = params.groupId;
  const { data: group } = useGroup({ groupId: params.groupId }, !!token);

  let navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;

      case "eventdate":
        setEventdate(value);
        break;

      case "description":
        setDescription(value);
        break;
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("submit");
    const event = {
      name,
      description,
      currentGroupId,
      eventdate,
    };
    await createEvent({
      name,
      description,
      endDate: eventdate,
      groupId: currentGroupId,
    });
    navigate("/");
  }

  return (
    <div className="create-group-parent-container">
      <div className="create-group-page-container">
        <div
          className="create-group-content-container"
          style={{ opacity: "100%" }}
        >
          <h1 className="group-header">Create Event</h1>
          <div className="name-date-input-container">
            <div className="group-input">
              <input
                name="name"
                type="text"
                value={name}
                onChange={handleChange}
                placeholder="Event Name"
                autoFocus
                className="form-control"
              />
            </div>

            <div className="group-descrip">
              <DatePicker
                name="eventdate"
                placeholderText="MM/DD/YYYY"
                selected={eventdate}
                onChange={(date) => {
                  setEventdate(date);
                }}
                className="form-control"
              />
            </div>
          </div>

          <div className="description-size">
            <textarea
              name="description"
              rows="5"
              value={description}
              onChange={handleChange}
              placeholder="Enter description..."
              className="form-control"
            />
          </div>

          <div className="event-button-container">
            <button
              className="button button-size btn btn-lg btn-primary btn-block"
              onClick={() => {
                navigate("/");
              }}
            >
              Cancel
            </button>
            <button
              className="button button-size btn btn-lg btn-primary btn-block"
              onClick={handleSubmit}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateEvent;
