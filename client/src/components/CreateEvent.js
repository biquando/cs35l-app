import React from "react";
import "../styles/createevent.css";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class CreateEventForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventname: "",
      eventdate: new Date(),
      msg: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    console.log(name);
    console.log(value);
    this.setState({
      [name]: value,
    });
    console.log("change");
  }

  handleSubmit(e) {
    console.log("submit");
    console.log(this.state.eventname, this.state.eventdate);

    const { eventname, eventdate } = this.state;
    const event = {
      eventname,
      eventdate
    };
    console.log(this.state.eventname);
  }

  render() {
    return (
      <div className="center text-center">
        <div className="inner-container">
            <form onSubmit={this.handleSubmit} className="form-event">
              <div className="eventname-input ">
                <input
                  name="eventname"
                  type="text"
                  value={this.state.eventname}
                  onChange={this.handleChange}
                  placeholder="New Event"
                  autoFocus
                  className="form-control"
                />
              </div>

              <div className="date-time-picker">
                <DatePicker
                  name="eventdate"
                  selected={this.state.eventdate}
                  onChange={this.handleChange}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  timeCaption="time"
                  dateFormat="MMMM d, yyyy h:mm aa"
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
