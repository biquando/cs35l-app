import React from "react";
import "../styles/createevent.css";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "./NavBar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createEvent } from "../utils/event";
import { useGroup } from "../utils/swr";
import { useAuth } from "../contexts/AuthContext";

function CreateEvent(props) {
  const [name, setName] = React.useState("")
  const [eventdate, setEventdate] = React.useState(false)
  const [description, setDescription] = React.useState("")
  const {token} = useAuth()

  const params = useParams()
  const currentGroupId =  params.groupId
  const {data: group} = useGroup({groupId: params.groupId}, !!token)

  let navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    switch(name) {
      case "name":
        setName(value)
        break;

      case "eventdate":
        setEventdate(value)
        break;
        
      case "description":
        setDescription(value)
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
      eventdate
    };
    await createEvent({name, description, endDate: eventdate, groupId: currentGroupId});
    navigate("/");
  }

    return (
      <div>
        <NavBar />
        <div className="text-center">
          <div className="inner-container, form-event">
            <h1 className="header"> Create New Event : {group?.name}</h1>
            <div className="eventname-input">
              <input
                name="name"
                type="text"
                value={name}
                onChange={handleChange}
                placeholder="Enter Event Name"
                autoFocus
                className="form-control"
              />
            </div>

            <div className="date-time-picker">
              <DatePicker 
                name="eventdate"
                placeholderText="Click to select the due date"
                selected={eventdate}
                onChange={(date) => {
                  setEventdate(date)
                }}
                className="form-control"
              />
            </div>

            <div className="event-description">
              <textarea
                name="description"
                rows="5"
                value={description}
                onChange={handleChange}
                placeholder="Enter Event Description"
                className="form-control event-description-textarea"
              />
            </div>

            <div className="save-button">
              <button
                className="button btn btn-lg btn-primary btn-block"
                onClick={handleSubmit}
              >
                Create
              </button>
            </div>
            
            <div className="cancel-button2">
              <button
                className="button btn btn-lg btn-secondary btn-block"
                onClick={() => {
                    navigate("/");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
}

export default CreateEvent;
