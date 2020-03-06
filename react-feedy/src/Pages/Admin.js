import React, { Component } from "react";
import "../styles/global/Main.css";
import "../styles/independent/Admin.css";
import app from "../firebase";
import TestAdminPage from "./TestAdminPage";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventsID: [],
      eventsAnimal: [],
      eventsDateTime: [],
      eventsType: [],
      eventsUserID: []
    };
  }

  componentDidMount() {
    this.getEvents();
  }

  getEvents() {
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
        )
      });
    });

    ref.orderByChild("datetime").on("child_removed", function(snapshot) {
      const eventID = snapshot.key;
      /* const index = */

      /* obter index do eventid no array eventsid do state, e remover com esse index os elementos dos restantes arrays */
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
                {this.state.eventsUserID[index]}
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
