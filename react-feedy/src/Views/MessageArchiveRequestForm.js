import React, { useCallback } from "react";
import * as firebase from "firebase";
import "../styles/independent/MessageArchiveRequestForm.css";

const MessageArchiveRequestForm = (props) => {
  const ArchiveMessage = (id) => {
    const db = firebase.firestore();
    db.collection("messages").doc(id).update({
      messageState: "archived",
    });
    setTimeout(function () {
      props.refreshMessages();
      props.closeForm();
    }, 500);
  };

  return (
    <div className="message-archive-request-container">
      <h3 style={{ marginTop: "40px" }}>Arquivar mensagem</h3>
      <p
        className="remove-event-text"
        style={{ paddingLeft: "20px", paddingRight: "20px", marginTop: "20px" }}
      >
        Tem a certeza que pretende arquivar a mensagem com id:{" "}
        {props.messageBeingArchived}
      </p>
      <button
        className="form-login-button"
        onClick={() => ArchiveMessage(props.messageBeingArchived)}
        style={{ backgroundColor: "#910000" }}
      >
        Arquivar
      </button>
      <button
        className="form-login-button"
        onClick={props.closeForm}
        style={{ marginTop: "10px" }}
      >
        Fechar
      </button>
    </div>
  );
};

export default MessageArchiveRequestForm;
