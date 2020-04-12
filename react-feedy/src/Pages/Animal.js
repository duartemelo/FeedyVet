import React, { Component } from "react";
import "../styles/global/Main.css";
import "../styles/independent/Animal.css";
import app from "../firebase";
import moment from "moment";

const prestate = {
  eventsID: [],
  eventsAnimal: [],
  eventsDateTime: [],
  eventsType: [],
  eventsUserID: [],
  eventsUserName: [],
  timeSelectPastClasses: "time-select-left-btn",
  timeSelectTodayClasses: "time-select-middle-btn time-select-active",
  timeSelectFutureClasses: "time-select-right-btn",
};

class Animal extends Component {
  constructor(props) {
    super(props);
    this.state = prestate;
  }

  resetState() {
    this.setState({
      eventsID: [],
      eventsAnimal: [],
      eventsDateTime: [],
      eventsType: [],
      eventsUserID: [],
      eventsUserName: [],
    });
  }

  testResetState() {
    alert("test");
  }

  componentDidMount() {
    let currentComponent = this;
    setTimeout(function () {
      currentComponent.getEvents("today");
    }, 10);
  }

  getEvents(timeSelected) {
    const db = app.database();
    const ref = db.ref("events");
    let currentComponent = this;

    if (timeSelected === "past") {
      ref.orderByChild("datetime").on("child_added", function (snapshot) {
        if (snapshot.val().userID === app.auth().currentUser.uid) {
          var eventDate = moment(snapshot.val().datetime);
          eventDate.toDate();
          var today = moment();
          var todayFormated = today.format("DD-MM-YYYY");

          if (eventDate.format("DD-MM-YYYY") < todayFormated) {
            currentComponent.setState({
              eventsID: currentComponent.state.eventsID.concat(snapshot.key),
              eventsAnimal: currentComponent.state.eventsAnimal.concat(
                snapshot.val().animal
              ),
              eventsDateTime: currentComponent.state.eventsDateTime.concat(
                eventDate.format("DD-MM-YYYY, H:mm")
              ),
              eventsType: currentComponent.state.eventsType.concat(
                snapshot.val().type
              ),
              eventsUserID: currentComponent.state.eventsUserID.concat(
                snapshot.val().userID
              ),
              eventsUserName: currentComponent.state.eventsUserName.concat(
                snapshot.val().userName
              ),
            });
          }
        }
      });
    }
    if (timeSelected === "today") {
      ref.orderByChild("datetime").on("child_added", function (snapshot) {
        if (snapshot.val().userID === app.auth().currentUser.uid) {
          var eventDate = moment(snapshot.val().datetime);
          eventDate.toDate();
          var today = moment();
          var todayFormated = today.format("DD-MM-YYYY");

          if (eventDate.format("DD-MM-YYYY") === todayFormated) {
            currentComponent.setState({
              eventsID: currentComponent.state.eventsID.concat(snapshot.key),
              eventsAnimal: currentComponent.state.eventsAnimal.concat(
                snapshot.val().animal
              ),
              eventsDateTime: currentComponent.state.eventsDateTime.concat(
                eventDate.format("DD-MM-YYYY, H:mm")
              ),
              eventsType: currentComponent.state.eventsType.concat(
                snapshot.val().type
              ),
              eventsUserID: currentComponent.state.eventsUserID.concat(
                snapshot.val().userID
              ),
              eventsUserName: currentComponent.state.eventsUserName.concat(
                snapshot.val().userName
              ),
            });
          }
        }
      });
    }
    if (timeSelected === "future") {
      ref.orderByChild("datetime").on("child_added", function (snapshot) {
        if (snapshot.val().userID === app.auth().currentUser.uid) {
          var eventDate = moment(snapshot.val().datetime);
          eventDate.toDate();
          var today = moment();
          var todayFormated = today.format("DD-MM-YYYY");

          if (eventDate.format("DD-MM-YYYY") > todayFormated) {
            currentComponent.setState({
              eventsID: currentComponent.state.eventsID.concat(snapshot.key),
              eventsAnimal: currentComponent.state.eventsAnimal.concat(
                snapshot.val().animal
              ),
              eventsDateTime: currentComponent.state.eventsDateTime.concat(
                eventDate.format("DD-MM-YYYY, H:mm")
              ),
              eventsType: currentComponent.state.eventsType.concat(
                snapshot.val().type
              ),
              eventsUserID: currentComponent.state.eventsUserID.concat(
                snapshot.val().userID
              ),
              eventsUserName: currentComponent.state.eventsUserName.concat(
                snapshot.val().userName
              ),
            });
          }
        }
      });
    }
  }

  render() {
    return (
      <div>
        <h1 className="events-container-title">Eventos</h1>
        <div className="time-select-container">
          <button
            className={this.state.timeSelectPastClasses}
            onClick={this.pastClick}
          >
            Passado
          </button>
          <button
            className={this.state.timeSelectTodayClasses}
            onClick={this.todayClick}
          >
            Hoje
          </button>
          <button
            className={this.state.timeSelectFutureClasses}
            onClick={this.futureClick}
          >
            Futuro
          </button>
        </div>
        <div>
          {this.state.eventsID.map((id, index) => (
            <div key={id} className="event-container">
              <div>
                {this.state.eventsDateTime[index]} |{" "}
                {this.state.eventsType[index]} |{" "}
                {this.state.eventsUserID[index]} |{" "}
                {this.state.eventsUserName[index]}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  pastClick = () => {
    if (this.state.timeSelectTodayClasses.includes("time-select-active")) {
      this.setState({
        timeSelectTodayClasses: "time-select-middle-btn",
      });
    }

    if (this.state.timeSelectFutureClasses.includes("time-select-active")) {
      this.setState({
        timeSelectFutureClasses: "time-select-right-btn",
      });
    }

    this.setState({
      timeSelectPastClasses:
        this.state.timeSelectPastClasses + " time-select-active",
    });
    this.resetState();
    this.getEvents("past");
  };

  todayClick = () => {
    if (this.state.timeSelectPastClasses.includes("time-select-active")) {
      this.setState({
        timeSelectPastClasses: "time-select-left-btn",
      });
    }

    if (this.state.timeSelectFutureClasses.includes("time-select-active")) {
      this.setState({
        timeSelectFutureClasses: "time-select-right-btn",
      });
    }

    this.setState({
      timeSelectTodayClasses:
        this.state.timeSelectTodayClasses + " time-select-active",
    });
    this.resetState();
    this.getEvents("today");
  };

  futureClick = () => {
    if (this.state.timeSelectPastClasses.includes("time-select-active")) {
      this.setState({
        timeSelectPastClasses: "time-select-left-btn",
      });
    }

    if (this.state.timeSelectTodayClasses.includes("time-select-active")) {
      this.setState({
        timeSelectTodayClasses: "time-select-middle-btn",
      });
    }

    this.setState({
      timeSelectFutureClasses:
        this.state.timeSelectFutureClasses + " time-select-active",
    });
    this.resetState();
    this.getEvents("future");
  };
}

export default Animal;
