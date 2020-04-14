import React, { Component } from "react";
import "../styles/global/Main.css";
import "../styles/independent/Animal.css";
import app from "../firebase";
import moment from "moment";

const prestate = {
  pasteventsID: [],
  pasteventsAnimal: [],
  pasteventsComment: [],
  pasteventsDateTime: [],
  pasteventsType: [],
  pasteventsUserID: [],
  pasteventsUserName: [],

  presenteventsID: [],
  presenteventsAnimal: [],
  presenteventsComment: [],
  presenteventsDateTime: [],
  presenteventsType: [],
  presenteventsUserID: [],
  presenteventsUserName: [],

  futureeventsID: [],
  futureeventsAnimal: [],
  futureeventsComment: [],
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
            pasteventsComment: currentComponent.state.pasteventsComment.concat(
              snapshot.val().comment
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
            presenteventsComment: currentComponent.state.presenteventsComment.concat(
              snapshot.val().comment
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
            futureeventsComment: currentComponent.state.futureeventsComment.concat(
              snapshot.val().comment
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
        <button
          className="button signout-btn"
          onClick={() => app.auth().signOut()}
          style={{ position: "absolute", right: "0", top: "0" }}
        >
          Sair
        </button>
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
                        {this.state.pasteventsType[index]}
                      </div>
                      <div
                        style={{
                          width: "max-content",
                          float: "right",
                          fontSize: "16px",
                          paddingRight: "20px",
                        }}
                      >
                        {this.state.pasteventsDateTime[index]}h
                      </div>
                    </div>
                    <div
                      style={{
                        clear: "both",
                        paddingLeft: "20px",
                      }}
                    >
                      {this.state.pasteventsComment[index]}
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
                      {this.state.pasteventsAnimal[index]}
                    </div>
                    <button className="event-delete-btn"></button>
                  </div>
                </div>
              ))
            : null}
          {this.state.timeSelectTodayClasses.includes("time-select-active")
            ? this.state.presenteventsID.map((id, index) => (
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
                        {this.state.presenteventsType[index]}
                      </div>
                      <div
                        style={{
                          width: "max-content",
                          float: "right",
                          fontSize: "16px",
                          paddingRight: "20px",
                        }}
                      >
                        {this.state.presenteventsDateTime[index]}h
                      </div>
                    </div>
                    <div
                      style={{
                        clear: "both",
                        paddingLeft: "20px",
                      }}
                    >
                      {this.state.presenteventsComment[index]}
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
                      {this.state.presenteventsAnimal[index]}
                    </div>
                    <button className="event-delete-btn"></button>
                  </div>
                </div>
              ))
            : null}
          {this.state.timeSelectFutureClasses.includes("time-select-active")
            ? this.state.futureeventsID.map((id, index) => (
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
                        {this.state.futureeventsType[index]}
                      </div>
                      <div
                        style={{
                          width: "max-content",
                          float: "right",
                          fontSize: "16px",
                          paddingRight: "20px",
                        }}
                      >
                        {this.state.futureeventsDateTime[index]}h
                      </div>
                    </div>
                    <div
                      style={{
                        clear: "both",
                        paddingLeft: "20px",
                      }}
                    >
                      {this.state.futureeventsComment[index]}
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
                      {this.state.futureeventsAnimal[index]}
                    </div>
                    <button className="event-delete-btn"></button>
                  </div>
                </div>
              ))
            : null}
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
    
  };
}

export default Animal;
