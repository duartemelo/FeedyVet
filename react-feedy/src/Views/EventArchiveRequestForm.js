import React from "react";
import "../styles/independent/EventArchiveRequest.css";

const EventArchiveRequestForm = (props) => {
  return (
    <div className="event-archive-request-container">
      <h3 style={{ marginTop: "40px" }}>Pedir cancelamento</h3>
      <p
        className="remove-event-text"
        style={{ paddingLeft: "20px", paddingRight: "20px", marginTop: "20px" }}
      >
        Tem a certeza que pretende pedir para cancelar evento com id:{" "}
        {props.eventBeingArchived}?
      </p>
      <button
        className="form-login-button"
        onClick={props.cancelFunction}
        style={{ backgroundColor: "#910000" }}
      >
        Pedir para cancelar
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

export default EventArchiveRequestForm;
