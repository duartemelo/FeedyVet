import React from "react";
import "../styles/independent/AdminSettingsForm.css";

const AdminSettingsForm = (props) => {
  return (
    <div className="change-admin-settings-container">
      <form>
        <input
          placeholder="Nome"
          className="input"
          defaultValue={props.vetContactInfo[3]}
          style={{ marginTop: "50px" }}
          ref={props.nameInput}
        />
        <input
          placeholder="Morada"
          className="input"
          defaultValue={props.vetContactInfo[0]}
          style={{ marginTop: "10px" }}
          ref={props.addressInput}
        />
        <input
          placeholder="E-mail"
          className="input"
          defaultValue={props.vetContactInfo[1]}
          style={{ marginTop: "10px" }}
          ref={props.emailInput}
        />
        <input
          placeholder="Telemóvel"
          className="input"
          defaultValue={props.vetContactInfo[2]}
          style={{ marginTop: "10px" }}
          ref={props.mobilePhoneInput}
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
