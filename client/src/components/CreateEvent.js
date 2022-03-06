import React from "react";
import "../styles/createevent.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import NavBar from "./NavBar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createEvent } from "../utils/event";
import { useGroup } from "../utils/swr";

function CreateEvent(props) {
  const [name, setName] = React.useState("")
  const [eventdate, setEventdate] = React.useState(false)
  const [description, setDescription] = React.useState("")

  const params = useParams()
  const currentGroupId =  params.groupId
  const {data: group} = useGroup({groupId: params.groupId})

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
          <div className="inner-container">
            <form onSubmit={handleSubmit} className="form-event">
                <h1 className="header"> Create Event : {group?.name}</h1>
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
                  <input
                    name="description"
                    type="text"
                    value={description}
                    onChange={handleChange}
                    placeholder="Enter Event Description"
                    className="form-control"
                  />
                </div>

                <div className="save-button">
                  <button
                    className="button btn btn-lg btn-primary btn-block"
                  >
                    Save
                  </button>
                </div>
            </form>
          </div>
        </div>
      </div>
    );
}

export default CreateEvent;
