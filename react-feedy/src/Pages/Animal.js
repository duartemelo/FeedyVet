import React, { Component } from "react";
import "../styles/global/Main.css";
import app from "../firebase";
import moment from "moment";
import { auth } from "firebase";

const prestate = {
  eventsID: [],
  eventsAnimal: [],
  eventsDateTime: [],
  eventsType: [],
  eventsUserID: [],
  eventsUserName: []
};

class Animal extends Component {
  constructor(props) {
    super(props);
    this.state = prestate;
  }

  resetState() {
    this.setState(prestate);
  }

  componentDidMount() {
    let currentComponent = this;
    setTimeout(function() {
      currentComponent.getEvents();
    }, 10);
  }

  getEvents() {
    this.resetState();
    const db = app.database();
    const ref = db.ref("events");
    let currentComponent = this;
    console.log(app.auth().currentUser.uid);
    ref.orderByChild("datetime").on("child_added", function(snapshot) {
      if (snapshot.val().userID === app.auth().currentUser.uid) {
        var momentDate = moment(snapshot.val().datetime);
        momentDate.toDate();
        console.log(momentDate);

        currentComponent.setState({
          eventsID: currentComponent.state.eventsID.concat(snapshot.key),
          eventsAnimal: currentComponent.state.eventsAnimal.concat(
            snapshot.val().animal
          ),
          eventsDateTime: currentComponent.state.eventsDateTime.concat(
            momentDate.format("DD-MM-YYYY, H:mm")
          ),
          eventsType: currentComponent.state.eventsType.concat(
            snapshot.val().type
          ),
          eventsUserID: currentComponent.state.eventsUserID.concat(
            snapshot.val().userID
          ),
          eventsUserName: currentComponent.state.eventsUserName.concat(
            snapshot.val().userName
          )
        });
      }
    });
  }

  render() {
    return (
      <div>
        <h1>Animal Page Test</h1>
        <div>
          {this.state.eventsID.map((id, index) => (
            <div key={id}>
              <div></div>
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
}

export default Animal;
