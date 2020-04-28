import React, { Component } from "react";
import "../styles/global/Main.css";
import app from "../firebase";

class AdminSettings extends Component {
  redirectToIndexAndLogout = (page) => {
    const { history } = this.props;
    if (history) history.push("/");
    app.auth().signOut();
  };

  render() {
    return (
      <div>
        <button
          className="button signout-btn"
          onClick={this.redirectToIndexAndLogout}
          style={{ position: "absolute", right: "0", top: "0" }}
        >
          Sair
        </button>
        <h1>Admin Settings Page</h1>
        <p>This is a test page</p>
      </div>
    );
  }
}

export default AdminSettings;
