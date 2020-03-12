import React, { useCallback } from "react";
import app from "../firebase";
import * as firebase from "firebase";
import "../styles/independent/AddEventForm.css";
import { faBorderNone } from "@fortawesome/free-solid-svg-icons";

const AddEventForm = props => {
  const addEventHandler = useCallback(async event => {
    event.preventDefault();
    const { username, animal, comment, type, datetime } = event.target.elements;

    console.log(username, animal, comment, type, datetime);

    try {
      await firebase
        .database()
        .ref("/events/" + 5)
        .set({
          animal: animal.value,
          comment: comment.value,
          datetime: datetime.value,
          type: type.value,
          userName: username.value
        });
    } catch (error) {
      alert(error);
    }
  }, []);

  const mt10 = {
    marginTop: 10
  };

  if (props.getState === true) {
    return (
      <div className="add-event-container" style={{ height: 450 }}>
        <form onSubmit={addEventHandler} className="add-event-form">
          <input
            className="input"
            placeholder="Utilizador"
            name="username"
          ></input>
          <input
            className="input"
            placeholder="Animal"
            name="animal"
            style={mt10}
          ></input>
          <input
            className="input"
            placeholder="Comentário"
            name="comment"
            style={mt10}
          ></input>
          <input
            className="input"
            placeholder="Tipo"
            name="type"
            style={mt10}
          ></input>
          <input
            className="input"
            placeholder="Data e hora"
            name="datetime"
            style={mt10}
          ></input>

          <button className="form-login-button" type="submit">
            Enviar
          </button>
        </form>
      </div>
    );
  } else {
    return null;
  }
};

export default AddEventForm;
