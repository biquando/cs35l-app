import React from "react";
import "../styles/editevent.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import NavBar from "./NavBar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createEvent, deleteEvent, updateEvent } from "../utils/event";
import { useGroup, useEvent } from "../utils/swr";
import { useAuth } from "../contexts/AuthContext";

function EditEvent(props) {
  const params = useParams()
  const {token} = useAuth()
  const currentGroupId =  params.groupId
  const currentEventId =  params.eventId
  const {data: group} = useGroup({groupId: params.groupId})
  const {data: event, mutate: mutateEvent, isValidating} = useEvent({groupId:currentGroupId, eventId:currentEventId}, !!token)

  const [newName, setNewName] = React.useState(event?.name)
  const [newEventdate, setNewEventdate] = React.useState(new Date(event?.end_date))
  const [newDescription, setNewDescription] = React.useState(event?.description)

  const [initialized, setInitialized] = React.useState(false)
  let navigate = useNavigate()

  async function handleDeleteEvent(currentGroupId, currentEventId) {
      await deleteEvent({ groupId:currentGroupId, eventId:currentEventId});
      mutateEvent();
  }

  async function confirmEdit() {
    await updateEvent({ groupId:currentGroupId, eventId:currentEventId, updates: { name: newName, end_date: newEventdate, description: newDescription} });
    mutateEvent();
  }

  function handleChange(e) {
    const { name, value } = e.target;
    switch(name) {
      case "newName":
        setNewName(value)
        break;

      case "newEventdate":
        setNewEventdate(value)
        break;
        
      case "newDescription":
        setNewDescription(value)
        break;
    }
  }

  React.useEffect(() => {
      if (!event || isValidating || initialized) return
    setNewName(event.name)
    setNewEventdate(new Date(event.end_date))
    setNewDescription(event.description)
    setInitialized(true)
  }, [!!event, isValidating])

  if (!initialized) return <p>Loading...</p>

    return (
      <div>
        <NavBar />
        <div className="text-center">
          <div className="inner-container, form-event">
            <h1 className="header"> <b>Update Event : </b>{group?.name} {event?.name}</h1>
            <div className="eventname-input">
                <input
                name="newName"
                type="text"
                value={newName}
                onChange={handleChange}
                className="form-control"
                />
            </div>

            <div className="date-time-picker">
                <DatePicker 
                name="newEventdate"
                placeholderText="Click to change the due date"
                selected={newEventdate}
                onChange={(date) => {
                    setNewEventdate(date)
                }}
                className="form-control"
                />
            </div>

            <div className="event-description">
                <textarea
                name="newDescription"
                rows="5"
                value={newDescription}
                onChange={handleChange}
                className="form-control"
                />
            </div>

            <div className="cancel-button">
                  <button
                    className="button btn btn-lg btn-secondary btn-block"
                    onClick={() => {
                        navigate("/");
                    }}
                  >
                    Cancel
                  </button>
                </div>

            <div className="delete-button">
                <button
                className="button btn btn-lg btn-danger btn-block"
                onClick={() => {
                    handleDeleteEvent(currentGroupId, currentEventId)
                    navigate("/");
                    }}
                >
                Delete Event
                </button>
            </div>

            <div className="update-button">
                <button
                className="button btn btn-lg btn-primary btn-block"
                onClick={() => {
                    confirmEdit();
                    navigate("/");
                }}
                >
                Update
                </button>
            </div>
          </div>
        </div>
      </div>
    );
}

export default EditEvent;
