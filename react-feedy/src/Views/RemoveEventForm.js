import React, { useCallback } from "react";
import app from "../firebase";
import * as firebase from "firebase";
import "../styles/independent/AddEventForm.css";
import { faBorderNone } from "@fortawesome/free-solid-svg-icons";

const RemoveEventForm = (props) => {
  //funcao de remover evento, obtem o id a partir das props que são passadas pelo outro componente que chama este (admin)
  const RemoveEventHandler = useCallback(async (event) => {
    try {
      await firebase
        .database()
        .ref("/events/" + props.eventBeingRemoved)
        .remove();
      document.getElementById("cancelbutton").click();
    } catch (error) {
      alert(error);
    }
  });

  return (
    <div className="remove-event-container">
      <h3 style={{ marginTop: "40px" }}>Apagar evento</h3>
      <p className="remove-event-text">
        Tem a certeza que quer apagar evento com id: {props.eventBeingRemoved}?
      </p>
      <button
        className="form-login-button"
        onClick={RemoveEventHandler}
        style={{ marginTop: "40px", backgroundColor: "#910000" }}
      >
        Apagar
      </button>
      <button
        className="form-login-button"
        onClick={props.turnOffViewState}
        style={{ marginBottom: "80px" }}
        id="cancelbutton"
      >
        Cancelar
      </button>
    </div>
  );
};

export default RemoveEventForm;
