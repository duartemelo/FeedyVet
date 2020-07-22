import React, { Component } from "react";
import "../styles/global/Main.css";
import logo from "../Images/Logo_2_1600.png";
import "../styles/independent/AdminSettings.css";
import app from "../firebase";
import AdminSettingsForm from "../Views/AdminSettingsForm";

class AdminSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //array que vai guardar as informações de contacto
      vetContactInfoKey: [],
      vetContactInfo: [],
      userName: "",
      userEmail: "",
      changeAdminSettingsFormView: false,
    };
    this.addressInput = React.createRef();
    this.emailInput = React.createRef();
    this.mobilePhoneInput = React.createRef();
    this.nameInput = React.createRef();
  }

  redirectToPage = (page) => {
    const { history } = this.props;
    if (history) history.push(page);
  };

  redirectToIndexAndLogout = (page) => {
    const { history } = this.props;
    if (history) history.push("/");
    app.auth().signOut();
  };

  componentDidMount() {
    let currentComponent = this;
    currentComponent.getVetContactInfo();
    setTimeout(function () {
      console.log(currentComponent.state.vetContactInfo.length);
      if (currentComponent.state.vetContactInfo.length < 4) {
        currentComponent.setState({
          vetContactInfo: [],
        });
        currentComponent.getVetContactInfo();
      }
    }, 200);
  }

  getVetContactInfo() {
    const db = app.database();
    const ref = db.ref("vet-contact-info");
    let currentComponent = this;
    ref.on("child_added", function (snapshot) {
      var infoObtained = snapshot.val();
      var keyObtained = snapshot.key;
      currentComponent.setState({
        vetContactInfo: currentComponent.state.vetContactInfo.concat(
          infoObtained
        ),
        vetContactInfoKey: currentComponent.state.vetContactInfoKey.concat(
          keyObtained
        ),
      });
    });
  }

  openChangeAdminSettingsForm = () => {
    this.setState({
      changeAdminSettingsFormView: true,
    });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    if (this.addressInput.current.value !== "") {
      this.updateAddress(this.addressInput.current.value);
    }
    if (this.emailInput.current.value !== "") {
      this.updateEmail(this.emailInput.current.value);
    }
    if (this.mobilePhoneInput.current.value !== "") {
      this.updateMobilePhone(this.mobilePhoneInput.current.value);
    }
    if (this.nameInput.current.value !== "") {
      this.updateNameInput(this.nameInput.current.value);
    }
    this.closeChangeAdminSettingsForm();

    window.location.reload(false);
  };

  updateAddress = (value) => {
    app.database().ref("vet-contact-info").update({
      address: value,
    });
  };

  updateEmail = (value) => {
    app.database().ref("vet-contact-info").update({
      email: value,
    });
  };

  updateMobilePhone = (value) => {
    app.database().ref("vet-contact-info").update({
      mobilephone: value,
    });
  };

  updateNameInput = (value) => {
    app.database().ref("vet-contact-info").update({
      name: value,
    });
  };

  closeChangeAdminSettingsForm = () => {
    this.setState({
      changeAdminSettingsFormView: false,
    });
  };

  render() {
    return (
      <div>
        <a onClick={() => this.redirectToPage("/")}>
          <img
            src={logo}
            alt="Logo"
            className="feedy-logo-img logo-no-index"
          ></img>
        </a>
        <button
          className="button signout-btn"
          onClick={this.redirectToIndexAndLogout}
          style={{ position: "absolute", right: "0", top: "0" }}
        >
          Sair
        </button>
        <div className="background-div"></div>
        <div className="under-navbar">
          <h1 className="admin-settings-container-title">Admin Settings</h1>
          <h3 style={{ marginTop: "40px" }}>Veterinary info</h3>
          <div style={{ marginTop: "20px" }} className="info-text">
            {this.state.vetContactInfoKey[0] +
              ": " +
              this.state.vetContactInfo[0]}
          </div>
          <div className="info-text">
            {this.state.vetContactInfoKey[1] +
              ": " +
              this.state.vetContactInfo[1]}
          </div>
          <div className="info-text">
            {this.state.vetContactInfoKey[2] +
              ": " +
              this.state.vetContactInfo[2]}
          </div>
          <div className="info-text">
            {this.state.vetContactInfoKey[3] +
              ": " +
              this.state.vetContactInfo[3]}
          </div>
          <button
            className="button"
            style={{
              backgroundColor: "#3680c1",
              color: "#fff",
              marginTop: "20px",
            }}
            onClick={this.openChangeAdminSettingsForm}
          >
            Editar
          </button>
          {this.state.changeAdminSettingsFormView === true ? (
            <AdminSettingsForm
              closeForm={this.closeChangeAdminSettingsForm}
              handleSubmit={this.handleFormSubmit}
              addressInput={this.addressInput}
              emailInput={this.emailInput}
              mobilePhoneInput={this.mobilePhoneInput}
              nameInput={this.nameInput}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default AdminSettings;
