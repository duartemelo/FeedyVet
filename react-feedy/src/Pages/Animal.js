import React, { Component } from "react";
import "../styles/global/Main.css";
import "../styles/independent/Animal.css";
import app from "../firebase";
import moment from "moment";

const prestate = {
  pasteventsID: [],
  pasteventsAnimal: [],
  pasteventsDateTime: [],
  pasteventsType: [],
  pasteventsUserID: [],
  pasteventsUserName: [],

  presenteventsID: [],
  presenteventsAnimal: [],
  presenteventsDateTime: [],
  presenteventsType: [],
  presenteventsUserID: [],
  presenteventsUserName: [],

  futureeventsID: [],
  futureeventsAnimal: [],
  futureeventsDateTime: [],
  futureeventsType: [],
  futureeventsUserID: [],
  futureeventsUserName: [],

  timeSelectPastClasses: "time-select-left-btn",
  timeSelectTodayClasses: "time-select-middle-btn time-select-active",
  timeSelectFutureClasses: "time-select-right-btn",
};

class Animal extends Component {
  constructor(props) {
    super(props);
    this.state = prestate;
  }

  //resetState precisa de update
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
      currentComponent.getEvents();
    }, 10);
  }

  getEvents() {
    const db = app.database();
    const ref = db.ref("events");
    let currentComponent = this;
    var today = moment();
    var todayFormated = today.format("DD-MM-YYYY");

    ref.orderByChild("datetime").on("child_added", function (snapshot) {
      if (snapshot.val().userID === app.auth().currentUser.uid) {
        var eventDate = moment(snapshot.val().datetime);
        eventDate.toDate();
        if (eventDate.format("DD-MM-YYYY") < todayFormated) {
          //adiciona a array passado
          currentComponent.setState({
            pasteventsID: currentComponent.state.pasteventsID.concat(
              snapshot.key
            ),
            pasteventsAnimal: currentComponent.state.pasteventsAnimal.concat(
              snapshot.val().animal
            ),
            pasteventsDateTime: currentComponent.state.pasteventsDateTime.concat(
              eventDate.format("DD-MM-YYYY, H:mm")
            ),
            pasteventsType: currentComponent.state.pasteventsType.concat(
              snapshot.val().type
            ),
            pasteventsUserID: currentComponent.state.pasteventsUserID.concat(
              snapshot.val().userID
            ),
            pasteventsUserName: currentComponent.state.pasteventsUserName.concat(
              snapshot.val().userName
            ),
          });
        } else if (eventDate.format("DD-MM-YYYY") === todayFormated) {
          //adiciona a array presente
          currentComponent.setState({
            presenteventsID: currentComponent.state.presenteventsID.concat(
              snapshot.key
            ),
            presenteventsAnimal: currentComponent.state.presenteventsAnimal.concat(
              snapshot.val().animal
            ),
            presenteventsDateTime: currentComponent.state.presenteventsDateTime.concat(
              eventDate.format("DD-MM-YYYY, H:mm")
            ),
            presenteventsType: currentComponent.state.presenteventsType.concat(
              snapshot.val().type
            ),
            presenteventsUserID: currentComponent.state.presenteventsUserID.concat(
              snapshot.val().userID
            ),
            presenteventsUserName: currentComponent.state.presenteventsUserName.concat(
              snapshot.val().userName
            ),
          });
        } else if (eventDate.format("DD-MM-YYYY") > todayFormated) {
          //adiciona a array futuro
          currentComponent.setState({
            futureeventsID: currentComponent.state.futureeventsID.concat(
              snapshot.key
            ),
            futureeventsAnimal: currentComponent.state.futureeventsAnimal.concat(
              snapshot.val().animal
            ),
            futureeventsDateTime: currentComponent.state.futureeventsDateTime.concat(
              eventDate.format("DD-MM-YYYY, H:mm")
            ),
            futureeventsType: currentComponent.state.futureeventsType.concat(
              snapshot.val().type
            ),
            futureeventsUserID: currentComponent.state.futureeventsUserID.concat(
              snapshot.val().userID
            ),
            futureeventsUserName: currentComponent.state.futureeventsUserName.concat(
              snapshot.val().userName
            ),
          });
        }
      }
    });
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
          {this.state.timeSelectPastClasses.includes("time-select-active")
            ? this.state.pasteventsID.map((id, index) => (
                <div key={id} className="event-container">
                  <div>
                    {this.state.pasteventsDateTime[index]} |{" "}
                    {this.state.pasteventsType[index]} |{" "}
                    {this.state.pasteventsUserID[index]} |{" "}
                    {this.state.pasteventsUserName[index]}
                  </div>
                </div>
              ))
            : null}
          {this.state.timeSelectTodayClasses.includes("time-select-active")
            ? this.state.presenteventsID.map((id, index) => (
                <div key={id} className="event-container">
                  <div>
                    {this.state.presenteventsDateTime[index]} |{" "}
                    {this.state.presenteventsType[index]} |{" "}
                    {this.state.presenteventsUserID[index]} |{" "}
                    {this.state.presenteventsUserName[index]}
                  </div>
                </div>
              ))
            : null}
          {this.state.timeSelectFutureClasses.includes("time-select-active")
            ? this.state.futureeventsID.map((id, index) => (
                <div key={id} className="event-container">
                  <div>
                    {this.state.futureeventsDateTime[index]} |{" "}
                    {this.state.futureeventsType[index]} |{" "}
                    {this.state.futureeventsUserID[index]} |{" "}
                    {this.state.futureeventsUserName[index]}
                  </div>
                </div>
              ))
            : null}
          <div className="event-container">
            <div className="event-container-top-child">
              <div>
                <div
                  style={{
                    width: "max-content",
                    float: "left",
                    fontSize: "19px",
                    paddingLeft: "20px",
                  }}
                >
                  Consulta
                </div>
                <div
                  style={{
                    width: "max-content",
                    float: "right",
                    fontSize: "16px",
                    paddingRight: "20px",
                  }}
                >
                  19:00h
                </div>
              </div>
              <div
                style={{
                  clear: "both",
                  paddingLeft: "20px",
                }}
              >
                Consulta de rotina
              </div>
            </div>
            <div className="event-container-bottom-child">
              <div
                style={{
                  width: "max-content",
                  float: "left",
                  fontSize: "15px",
                  paddingLeft: "20px",
                  marginTop: "10px",
                  bottom: "0",
                }}
              >
                Fenix
              </div>
              <div
                style={{
                  width: "max-content",
                  float: "right",
                  paddingRight: "20px",
                }}
              >
                Close
              </div>
            </div>
          </div>
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
  };
}

export default Animal;
