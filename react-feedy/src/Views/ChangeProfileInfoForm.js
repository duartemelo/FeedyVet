import React, { useCallback } from "react";
import * as firebase from "firebase";
import "../styles/independent/ChangeProfileInfo.css";

const ChangeProfileInfoForm = (props) => {
  return (
    <div className="change-profile-info-container">
      <form onSubmit={props.submitFunction}>
        <input
          type="file"
          accept="image/*"
          id="imageInput"
          ref={props.imageInputRef}
          style={{ marginTop: "40px" }}
        />
        <input
          type="text"
          placeholder="Nome"
          ref={props.nameInputRef}
          className="input"
          style={{ marginTop: "20px" }}
        />

        <button type="submit" className="form-login-button">
          Submeter
        </button>
      </form>
      <button
        onClick={props.closeForm}
        className="form-login-button"
        style={{ backgroundColor: "#910000", marginTop: "10px" }}
      >
        Fechar
      </button>
    </div>
  );
};

export default ChangeProfileInfoForm;
