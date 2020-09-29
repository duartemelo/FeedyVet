import React, { useCallback } from "react";
import * as firebase from "firebase";
import "../styles/independent/AddEventForm.css";

const EditEventForm = (props) => {
  let eventBeingEdited = props.eventBeingEdited;

  const editEventHandler = useCallback(async (event) => {
    event.preventDefault();

    const { username, animal, comment, type, datetime } = event.target.elements;

    if (username.value !== "") {
      var usersRef = firebase.database().ref("users");

      usersRef.on("child_added", function (data) {
        if (data.val().username === username.value) {
          try {
            firebase
              .firestore()
              .collection("events")
              .doc(eventBeingEdited[0])
              .update({
                UID: data.key,
              });
          } catch (error) {
            alert(error);
          }
        }
      });
    }
    if (animal.value !== "") {
      try {
        await firebase
          .firestore()
          .collection("events")
          .doc(eventBeingEdited[0])
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
          .doc(eventBeingEdited[0])
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
          .doc(eventBeingEdited[0])
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
          .doc(eventBeingEdited[0])
          .update({
            datetime: datetime.value,
          });
      } catch (error) {
        alert(error);
      }
    }

    document.getElementById("closebutton").click();
    alert("Evento editado.");
    window.location.reload();
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
          defaultValue={formsValues[1]}
          required
        ></input>
        <input
          className="input"
          placeholder="Animal"
          name="animal"
          defaultValue={formsValues[2]}
          style={mt10}
          required
        ></input>
        <input
          className="input"
          placeholder="Tipo"
          name="type"
          defaultValue={formsValues[3]}
          style={mt10}
          required
        ></input>
        <input
          className="input"
          placeholder="Comentário"
          name="comment"
          defaultValue={formsValues[4]}
          style={mt10}
        ></input>
        <input
          className="input"
          placeholder="Data e hora"
          name="datetime"
          defaultValue={finalDate}
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
