import React, { useCallback } from "react";
import * as firebase from "firebase";
import "../styles/independent/AddEventForm.css";

const RemoveEventForm = (props) => {
  //funcao de remover evento, obtem o id a partir das props que são passadas pelo outro componente que chama este (admin)
  const RemoveEventHandler = useCallback(async (event) => {
    try {
      await firebase
        .firestore()
        .collection("events")
        .doc(props.eventBeingRemoved)
        .update({
          state: "archived",
        });
      document.getElementById("cancelbutton").click();
    } catch (error) {
      alert(error);
    }
  });

  return (
    <div className="remove-event-container">
      <h3 style={{ marginTop: "40px" }}>Arquivar evento</h3>
      <p className="remove-event-text">
        Tem a certeza que quer arquivar evento com id: {props.eventBeingRemoved}
        ?
      </p>
      <button
        className="form-login-button"
        onClick={RemoveEventHandler}
        style={{ marginTop: "40px", backgroundColor: "#910000" }}
      >
        Arquivar
      </button>
      <button
        className="form-login-button"
        onClick={props.turnOffViewState}
        style={{ marginTop: "10px", marginBottom: "60px" }}
        id="cancelbutton"
      >
        Cancelar
      </button>
    </div>
  );
};

export default RemoveEventForm;
