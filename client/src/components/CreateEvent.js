import React from "react";
import "../styles/createevent.css";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CreateEvent(props) {
  const [name, setName] = React.useState("")
  const [eventdate, setEventdate] = React.useState(false)
  const [description, setDescription] = React.useState("")

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

  function handleSubmit(e) {
    console.log("submit");
    const event = {
      name,
      eventdate,
      description
    };
  }

    return (
      <div className="text-center">
        <div className="inner-container">
            <form onSubmit={handleSubmit} className="form-event">
              <div className="eventname-input">
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

              <div className="date-time-picker">
                {/* <DatePicker
                  name="eventdate"
                  selected={eventdate}
                  onChange={handleChange}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  timeCaption="time"
                  dateFormat="MMMM d, yyyy h:mm aa"
                /> */}
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
                  placeholder="Event Description"
                  autoFocus
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
    );
}

export default CreateEvent;
