import React, { useCallback } from "react";
import * as firebase from "firebase";
import "../styles/independent/AddEventForm.css";

const EditEventForm = (props) => {
  let eventBeingEdited = props.eventBeingEdited;

  const editEventHandler = useCallback(async (event) => {
    event.preventDefault();

    const { username, animal, comment, type, datetime } = event.target.elements;

    if (username.value !== "") {
      try {
        await firebase
          .database()
          .ref("/events/" + eventBeingEdited)
          .update({
            userName: username.value,
          });
      } catch (error) {
        alert(error);
      }
    }
    if (animal.value !== "") {
      try {
        await firebase
          .database()
          .ref("/events/" + eventBeingEdited)
          .update({
            animal: animal.value,
          });
      } catch (error) {
        alert(error);
      }
    }
    if (comment.value !== "") {
      try {
        await firebase
          .database()
          .ref("/events/" + eventBeingEdited)
          .update({
            comment: comment.value,
          });
      } catch (error) {
        alert(error);
      }
    }
    if (type.value !== "") {
      try {
        await firebase
          .database()
          .ref("/events/" + eventBeingEdited)
          .update({
            type: type.value,
          });
      } catch (error) {
        alert(error);
      }
    }
    if (datetime.value !== "") {
      try {
        await firebase
          .database()
          .ref("/events/" + eventBeingEdited)
          .update({
            datetime: datetime.value,
          });
      } catch (error) {
        alert(error);
      }
    }

    document.getElementById("closebutton").click();
  }, []);

  const mt10 = {
    marginTop: 10,
  };

  return (
    <div className="add-event-container" style={{ height: 450 }}>
      <form onSubmit={editEventHandler} className="add-event-form">
        <input
          className="input"
          placeholder="Utilizador"
          name="username"
          required
        ></input>
        <input
          className="input"
          placeholder="Animal"
          name="animal"
          style={mt10}
          required
        ></input>
        <input
          className="input"
          placeholder="Tipo"
          name="type"
          style={mt10}
          required
        ></input>
        <input
          className="input"
          placeholder="Comentário"
          name="comment"
          style={mt10}
        ></input>
        <input
          className="input"
          placeholder="Data e hora"
          name="datetime"
          style={mt10}
          type="datetime-local"
          required
        ></input>

        <button className="form-login-button" type="submit">
          Enviar
        </button>
        <button
          className="form-login-button"
          style={{ marginTop: "10px", backgroundColor: "#910000" }}
          onClick={props.turnOffViewState}
          id="closebutton"
        >
          Fechar
        </button>
      </form>
    </div>
  );
};

export default EditEventForm;
