import React, { Component } from "react";
import "../styles/global/Main.css";
import app from "../firebase";
import * as firebase from "firebase";

class AdminMessages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    };
  }

  componentDidMount() {
    this.getMessages();
  }

  redirectToIndexAndLogout = (page) => {
    const { history } = this.props;
    if (history) history.push("/");
    app.auth().signOut();
  };

  getMessages() {
    let messagesRef = firebase.firestore().collection("messages");
    let allMessages = messagesRef
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          console.log(doc.id, "=>", doc.data().message);
        });
      })
      .catch((err) => {
        console.log("Error getting documents", err);
      });
  }

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
        <h1>Admin Messages Page</h1>
        <p>This is a test page</p>
      </div>
    );
  }
}

export default AdminMessages;
