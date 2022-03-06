import React from "react";
import "../styles/createevent.css";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class CreateEventForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      eventdate: false,
      description: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(e) {
    console.log("submit");
    console.log(this.state.name, this.state.eventdate);

    const { name, eventdate, description } = this.state;
    const event = {
      name,
      eventdate,
      description
    };
  }

  render() {
    return (
      <div className="text-center">
        <div className="inner-container">
            <form onSubmit={this.handleSubmit} className="form-event">
              <div className="eventname-input">
                <input
                  name="name"
                  type="text"
                  value={this.state.name}
                  onChange={this.handleChange}
                  placeholder="Event Name"
                  autoFocus
                  className="form-control"
                />
              </div>

              <div className="date-time-picker">
                {/* <DatePicker
                  name="eventdate"
                  selected={this.state.eventdate}
                  onChange={this.handleChange}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  timeCaption="time"
                  dateFormat="MMMM d, yyyy h:mm aa"
                /> */}
                <DatePicker 
                  name="eventdate"
                  placeholderText="Click to select the due date"
                  selected={this.state.eventdate}
                  onChange={(date) => {
                    this.setState({eventdate: date})
                  }}
                  className="form-control"
                />
              </div>

              <div className="event-description">
                <input
                  name="description"
                  type="text"
                  value={this.state.description}
                  onChange={this.handleChange}
                  placeholder="Event Description"
                  autoFocus
                  className="form-control"
                />
              </div>

              <div className="save-button">
                <button
                  className="button btn btn-lg btn-primary btn-block"
                  disabled={this.props.loadingSubmit}
                >
                  {this.props.loadingSubmit ? (
                    <span className="spinner-border spinner-border-sm" />
                  ) : (
                    "Save"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
    );
  }
}

export default CreateEventForm;
