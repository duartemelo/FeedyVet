import React from "react";
import "../styles/independent/ChangePassword.css";

const ChangePasswordForm = (props) => {
  return (
    <div className="change-password-container">
      <form onSubmit={props.submitFunction}>
        <input
          placeholder="Nova palavra-passe"
          type="password"
          className="input"
          style={{ marginTop: "50px" }}
          ref={props.password1Input}
        />
        <input
          placeholder="Nova palavra-passe"
          type="password"
          className="input"
          style={{ marginTop: "10px" }}
          ref={props.password2Input}
        />
        <button type="submit" className="form-login-button">
          Submeter
        </button>
        <button
          onClick={props.closeForm}
          className="form-login-button"
          style={{ backgroundColor: "#910000", marginTop: "10px" }}
        >
          Fechar
        </button>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
