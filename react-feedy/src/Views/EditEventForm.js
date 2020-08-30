import React, { useCallback } from "react";
import * as firebase from "firebase";
import moment from "moment";
import "../styles/independent/AddEventForm.css";

const EditEventForm   = (props) => {
  let eventBeingEdited = props.eventBeingEdited;

  const editEventHandler = useCallback(async (event) => {
    event.preventDefault();

    const { username, animal, comment, type, datetime } = event.target.elements;

    if (username.value !== "") {
      //needs stuff todo

      /*try {
        await firebase
          .firestore()
          .collection("events")
          .doc(eventBeingEdited)
          .update({
            UID: "",
          });
      } catch (error) {
        alert(error);
      }*/
    }
    if (animal.value !== "") {
      try {
        await firebase
          .firestore()
          .collection("events")
          .doc(eventBeingEdited)
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
          .firestore()
          .collection("events")
          .doc(eventBeingEdited)
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
          .firestore()
          .collection("events")
          .doc(eventBeingEdited)
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
          .firestore()
          .collection("events")
          .doc(eventBeingEdited)
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

  let formsValues = props.eventBeingEdited;

  let initialDate = formsValues[5];

  let finalDate =
    initialDate.slice(6, 10) +
    "-" +
    initialDate.slice(3, 5) +
    "-" +
    initialDate.slice(0, 2) +
    "T" +
    initialDate.slice(12, 14) +
    ":" +
    initialDate.slice(15, 17) +
    ":" +
    "00";

  /*changeValue(index) {
    event.preventDefault;
    formsValues[index] = event.target.value;
  }*/

  return (
    <div className="add-event-container" style={{ height: 450 }}>
      <form onSubmit={editEventHandler} className="add-event-form">
        <input
          className="input"
          placeholder="Utilizador"
          name="username"
          value={formsValues[1]}
          required
        ></input>
        <input
          className="input"
          placeholder="Animal"
          name="animal"
          value={formsValues[2]}
          style={mt10}
          required
        ></input>
        <input
          className="input"
          placeholder="Tipo"
          name="type"
          value={formsValues[3]}
          style={mt10}
          required
        ></input>
        <input
          className="input"
          placeholder="Comentário"
          name="comment"
          value={formsValues[4]}
          style={mt10}
        ></input>
        <input
          className="input"
          placeholder="Data e hora"
          name="datetime"
          value={finalDate}
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
