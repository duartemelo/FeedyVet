import React, { useCallback } from "react";
import app from "../firebase";
import * as firebase from "firebase";
import "../styles/independent/AddEventForm.css";
import { faBorderNone } from "@fortawesome/free-solid-svg-icons";

const AddEventForm = (props) => {
  /*variavel que define o numero do proximo evento na base de dados*/
  let nextEvent = props.eventsLength + 1;

  //funçao de adicionar evento
  const addEventHandler = useCallback(async (event) => {
    event.preventDefault();
    //obtem os valores do form
    const { username, animal, comment, type, datetime } = event.target.elements;

    //adiciona o evento à BD
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
      //incrementa a variavel next event, no caso de o utilizador querer adicionar outro evento sem fechar/dar reload a pagina
      nextEvent += 1;
      document.getElementById("closebutton").click();
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
          id="closebutton"
        >
          Fechar
        </button>
      </form>
    </div>
  );
};

export default AddEventForm;
