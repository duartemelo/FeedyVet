import React, { Component } from "react";
import "../styles/global/Main.css";
import "../styles/independent/Contact.css";
import app from "../firebase";

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //array que vai guardar as informações de contacto
      vetContactInfo: [],
    };
  }

  //esperar que o componente renderize para fazer a função de obter as informações de contacto
  componentDidMount() {
    let currentComponent = this;
    setTimeout(function () {
      currentComponent.getVetContactInfo();
    }, 10);
  }

  //obter informações de contacto a partir do Firebase
  getVetContactInfo() {
    const db = app.database();
    const ref = db.ref("vet-contact-info");
    let currentComponent = this;
    ref.on("child_added", function (snapshot) {
      var infoObtained = snapshot.val();
      currentComponent.setState({
        vetContactInfo: currentComponent.state.vetContactInfo.concat(
          infoObtained
        ),
      });
    });
  }

  render() {
    return (
      <div>
        <button
          className="button signout-btn"
          onClick={() => app.auth().signOut()}
          style={{ position: "absolute", right: "0", top: "0" }}
        >
          Sair
        </button>
        <div className="under-navbar">
          <h1 className="contact-container-title">Contacto</h1>

          <div style={{ marginTop: "30px" }}>
            <div className="contact-form-container">
              <div className="contact-form-message-container">

              </div>
            </div>
            <div className="contact-info-container">
              <div className="contact-info-container-text-container">
                <p>
                  <b>Morada:</b> Clinica Veterinaria de São João
                </p>
                <p>
                  <b>Email:</b> clinica@clinica.pt
                </p>
                <p>
                  <b>Telemóvel:</b> 912345678
                </p>
              </div>
            </div>
          </div>

          {/* <p>Vet Contact Info below</p>
          <p>{this.state.vetContactInfo[0]}</p>
          <p>{this.state.vetContactInfo[1]}</p>
          <p>{this.state.vetContactInfo[2]}</p>
          <p>{this.state.vetContactInfo[3]}</p> */}
        </div>
      </div>
    );
  }
}

export default Contact;
