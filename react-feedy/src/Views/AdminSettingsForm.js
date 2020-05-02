import React from "react";
import "../styles/independent/AdminSettingsForm.css";

const AdminSettingsForm = (props) => {
  return (
    <div className="change-admin-settings-container">
      <form>
        <input
          placeholder="address"
          className="input"
          style={{ marginTop: "40px" }}
          ref={props.addressInput}
        />
        <input
          placeholder="e-mail"
          className="input"
          style={{ marginTop: "10px" }}
          ref={props.emailInput}
        />
        <input
          placeholder="mobile-phone"
          className="input"
          style={{ marginTop: "10px" }}
          ref={props.mobilePhoneInput}
        />
        <input
          placeholder="name"
          className="input"
          style={{ marginTop: "10px" }}
          ref={props.nameInput}
        />

        <button onClick={props.handleSubmit} className="form-login-button">
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

export default AdminSettingsForm;
