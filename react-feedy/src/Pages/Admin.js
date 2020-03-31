import React, { Component, useCallback } from "react";
import "../styles/global/Main.css";
import "../styles/independent/Admin.css";
import app from "../firebase";
import moment from "moment";
import AddEventForm from "../Views/AddEventForm";
import RemoveEventForm from "../Views/RemoveEventForm";
import Loader from "react-loader-spinner";

const prestate = {
  eventsID: [],
  eventsAnimal: [],
  eventsDateTime: [],
  eventsType: [],
  eventsUserID: [],
  eventsUserName: [],
  addEventView: false,
  addEventButtonText: "Adicionar evento",
  removeEventView: false,
  eventBeingRemoved: null,
  buttonRemove: true
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
      var momentDate = moment(snapshot.val().datetime);
      momentDate.toDate();

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
          {this.state.eventsID.length === 0 ? (
            <div className="eventsLoadingContainer">
              <Loader type="TailSpin" color="#3680C1" width={50} height={50} />
            </div>
          ) : (
            this.state.eventsID.map((id, index) => (
              <div className="event-container" key={id}>
                <div className="event-name-img-sub-container">
                  <span>{this.state.eventsAnimal[index]}</span>
                </div>
                <div className="event-info-sub-container">
                  {this.state.eventsDateTime[index]} |{" "}
                  {this.state.eventsType[index]} |{" "}
                  {this.state.eventsUserID[index]} |{" "}
                  {this.state.eventsUserName[index]}
                  {this.state.buttonRemove === true ? (
                    <button
                      className="button-delete-event"
                      onClick={() => this.changeRemoveEventViewState(id)}
                    >
                      Eliminar
                    </button>
                  ) : null}
                </div>
              </div>
            ))
          )}

          <div className="admin-buttons-div">
            <button
              className="button addEvent"
              onClick={this.changeAddEventViewState}
            >
              {this.state.addEventButtonText}
            </button>
          </div>

          {this.state.addEventView === true ? (
            <AddEventForm
              getState={this.state.addEventView}
              eventsID={this.state.eventsID}
              eventsLength={this.state.eventsID.length}
            />
          ) : null}
          {this.state.removeEventView === true ? (
            <RemoveEventForm
              eventBeingRemoved={this.state.eventBeingRemoved}
              turnOffViewState={this.turnOffViewState}
            />
          ) : null}
        </div>
      </div>
    );
  }

  changeAddEventViewState = () => {
    let viewState = this.state.addEventView;
    viewState = !viewState;
    let textButton = null;
    if (viewState === true) {
      textButton = "Fechar janela";
    } else {
      textButton = prestate.addEventButtonText;
    }
    this.setState({
      addEventView: viewState,
      addEventButtonText: textButton
    });
  };
  changeRemoveEventViewState = id => {
    let viewState = this.state.removeEventView;
    viewState = true;
    this.setState({
      removeEventView: viewState,
      eventBeingRemoved: id,
      buttonRemove: false
    });
  };
  turnOffViewState = () => {
    let viewState = false;
    this.setState({
      removeEventView: viewState,
      buttonRemove: true
    });
  };
}

export default Admin;
