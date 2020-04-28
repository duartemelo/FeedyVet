import React, { Component, useCallback } from "react";
import "../styles/global/Main.css";
import "../styles/independent/Contact.css";
import app from "../firebase";
import * as firebase from "firebase";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //array que vai guardar as informações de contacto
      vetContactInfo: [],
      messageValue: "",
    };
    this.MessageToState = this.MessageToState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //esperar que o componente renderize para fazer a função de obter as informações de contacto
  componentDidMount() {
    let currentComponent = this;
    currentComponent.getVetContactInfo();
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

  MessageToState = (event) => {
    event.preventDefault();
    this.setState({
      messageValue: event.target.value,
    });
  };

  async handleSubmit(event) {
    event.preventDefault();
    let today = String(moment().format("DD-MM-YYYY, H:mm"));
    let userEmail = app.auth().currentUser.email;

    try {
      await firebase.firestore().collection("messages").add({
        message: this.state.messageValue,
        datetime: today,
        email: userEmail,
      });
      alert("Enviado.");
    } catch (error) {
      alert(error);
    }
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

        <div className="background-div"></div>

        <div className="under-navbar">
          <h1 className="contact-container-title">Contacto</h1>

          <div style={{ marginTop: "30px" }}>
            <div className="contact-form-container">
              <div className="contact-form-message-container">
                <form onSubmit={this.handleSubmit}>
                  <textarea
                    maxLength={250}
                    style={{
                      backgroundColor: "#E9E9E9",
                      border: "none",
                      outline: "none",
                      resize: "none",
                      marginTop: "10px",
                      marginLeft: "10px",
                      width: "430px",
                      height: "140px",
                      color: "#333",
                    }}
                    placeholder="Mensagem"
                    name="msg"
                    onChange={this.MessageToState}
                  ></textarea>
                  <button
                    type="submit"
                    style={{
                      backgroundColor: "#3680C1",
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      border: "none",
                      outline: "none",
                      float: "right",
                      marginRight: "20px",
                      color: "#fff",
                    }}
                  >
                    <FontAwesomeIcon icon={faArrowRight} />
                  </button>
                </form>
              </div>
            </div>
            <div className="separating-line"></div>
            <div className="contact-info-container">
              <div className="contact-info-container-text-container">
                <p>
                  <b>Morada:</b> {this.state.vetContactInfo[0]}
                </p>
                <p>
                  <b>Email:</b> {this.state.vetContactInfo[1]}
                </p>
                <p>
                  <b>Telemóvel:</b> {this.state.vetContactInfo[2]}
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
