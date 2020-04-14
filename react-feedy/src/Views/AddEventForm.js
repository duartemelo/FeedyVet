import React, { useCallback } from "react";
import app from "../firebase";
import * as firebase from "firebase";
import "../styles/independent/AddEventForm.css";
import { faBorderNone } from "@fortawesome/free-solid-svg-icons";

const AddEventForm = (props) => {
  let nextEvent = props.eventsLength + 1;
  const addEventHandler = useCallback(async (event) => {
    event.preventDefault();
    const { username, animal, comment, type, datetime } = event.target.elements;
    console.log(
      username.value,
      animal.value,
      comment.value,
      type.value,
      datetime.value
    );

    try {
      await firebase
        .database()
        .ref("/events/" + nextEvent)
        .set({
          animal: animal.value,
          comment: comment.value,
          datetime: datetime.value,
          type: type.value,
          userName: username.value,
        });
      nextEvent += 1;
    } catch (error) {
      alert(error);
    }
  }, []);

  const mt10 = {
    marginTop: 10,
  };

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
        <button
          className="form-login-button"
          style={{ marginTop: "10px", backgroundColor: "#910000" }}
          onClick={props.turnOffHandler}
        >
          Fechar
        </button>
      </form>
    </div>
  );
};

export default AddEventForm;
