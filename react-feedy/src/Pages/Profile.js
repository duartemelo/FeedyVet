import React, { Component } from "react";
import "../styles/global/Main.css";
import app from "../firebase";

class Profile extends Component {
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
        <h1>Profile Page Test</h1>
        <p>This is a test page</p>
      </div>
    );
  }
}

export default Profile;
