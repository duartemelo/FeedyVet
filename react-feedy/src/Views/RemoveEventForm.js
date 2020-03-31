import React, { useCallback } from "react";
import app from "../firebase";
import * as firebase from "firebase";
import "../styles/independent/AddEventForm.css";
import { faBorderNone } from "@fortawesome/free-solid-svg-icons";

const RemoveEventForm = props => {
  const RemoveEventHandler = useCallback(async event => {
    try {
      await firebase
        .database()
        .ref("/events/" + props.eventBeingRemoved)
        .remove();
    } catch (error) {
      alert(error);
    }
  });
  return (
    <div className="add-event-container">
      <h3>Apagar evento</h3>
      <p>
        Tem a certeza que quer apagar evento com id: {props.eventBeingRemoved}?
      </p>
      <button onClick={RemoveEventHandler}>Apagar</button>
      <button onClick={props.turnOffViewState}>Cancelar</button>
    </div>
  );
};

export default RemoveEventForm;
