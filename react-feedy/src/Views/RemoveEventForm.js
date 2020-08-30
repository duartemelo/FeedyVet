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
        .doc(props.eventBeingRemoved[0])
        .update({
          state: "archived",
        });
      document.getElementById("cancelbutton").click();
      window.location.reload();
    } catch (error) {
      alert(error);
    }
  });

  return (
    <div className="remove-event-container">
      <h3 style={{ marginTop: "40px" }}>Arquivar evento</h3>
      <p className="remove-event-text">
        Tem a certeza que quer arquivar evento com <b>id:</b>{" "}
        {props.eventBeingRemoved[0]}
        <br />
        <b>Utilizador: </b>
        {props.eventBeingRemoved[1]}
        <br />
        <b>Animal: </b>
        {props.eventBeingRemoved[2]}
        <br />
        <b>Tipo: </b>
        {props.eventBeingRemoved[3]}
        <br />
        <b>Comentário: </b>
        {props.eventBeingRemoved[4]}
        <br />
        <b>Data: </b>
        {props.eventBeingRemoved[5]}
        <br />
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
