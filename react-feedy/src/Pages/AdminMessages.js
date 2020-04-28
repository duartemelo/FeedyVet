import React, { Component } from "react";
import "../styles/global/Main.css";
import app from "../firebase";

class AdminMessages extends Component {
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
        <h1>Admin Messages Page</h1>
        <p>This is a test page</p>
      </div>
    );
  }
}

export default AdminMessages;