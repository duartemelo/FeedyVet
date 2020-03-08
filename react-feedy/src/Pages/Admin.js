import React, { Component } from "react";
import "../styles/global/Main.css";
import "../styles/independent/Admin.css";
import app from "../firebase";
import TestAdminPage from "./TestAdminPage";

const prestate = {
  eventsID: [],
  eventsAnimal: [],
  eventsDateTime: [],
  eventsType: [],
  eventsUserID: [],
  eventsUserName: []
};

class Admin extends Component {
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

    ref.orderByChild("datetime").on("child_added", function(snapshot) {
      currentComponent.setState({
        eventsID: currentComponent.state.eventsID.concat(snapshot.key),
        eventsAnimal: currentComponent.state.eventsAnimal.concat(
          snapshot.val().animal
        ),
        eventsDateTime: currentComponent.state.eventsDateTime.concat(
          snapshot.val().datetime
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
    });

    ref.orderByChild("datetime").on("child_removed", function(snapshot) {
      const removedIndex = currentComponent.state.eventsID.indexOf(
        snapshot.key
      );

      let copiedeventsID = [...currentComponent.state.eventsID];
      let copiedeventsAnimal = [...currentComponent.state.eventsAnimal];
      let copiedeventsDateTime = [...currentComponent.state.eventsDateTime];
      let copiedeventsType = [...currentComponent.state.eventsType];
      let copiedeventsUserID = [...currentComponent.state.eventsUserID];
      let copiedeventsUserName = [...currentComponent.state.eventsUserName];

      copiedeventsID.splice(removedIndex, 1);
      copiedeventsAnimal.splice(removedIndex, 1);
      copiedeventsDateTime.splice(removedIndex, 1);
      copiedeventsType.splice(removedIndex, 1);
      copiedeventsUserID.splice(removedIndex, 1);
      copiedeventsUserName.splice(removedIndex, 1);

      currentComponent.setState({
        eventsID: copiedeventsID,
        eventsAnimal: copiedeventsAnimal,
        eventsDateTime: copiedeventsDateTime,
        eventsType: copiedeventsType,
        eventsUserID: copiedeventsUserID,
        eventsUserName: copiedeventsUserName
      });
    });
  }

  render() {
    return (
      <div>
        <h1>Admin Panel</h1>
        <div>
          {this.state.eventsID.map((id, index) => (
            <div className="event-container" key={id}>
              <div className="event-name-img-sub-container">
                <img></img>
                <a>{this.state.eventsAnimal[index]}</a>
              </div>
              <div className="event-info-sub-container">
                {this.state.eventsDateTime[index]} |{" "}
                {this.state.eventsType[index]} |{" "}
                {this.state.eventsUserID[index]} |{" "}
                {this.state.eventsUserName[index]}
              </div>

              <p></p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Admin;
