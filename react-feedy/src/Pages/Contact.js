import React, { Component } from "react";
import "../styles/global/Main.css";
import app from "../firebase";

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vetContactInfo: [],
    };
  }

  componentDidMount() {
    let currentComponent = this;
    setTimeout(function () {
      currentComponent.getVetContactInfo();
    }, 10);
  }

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
        <h1>Contact Page Test</h1>
        <p>This is a test page</p>
        <p>Vet Contact Info below</p>
        <p>{this.state.vetContactInfo}</p>
      </div>
    );
  }
}

export default Contact;
