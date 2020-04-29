import React, { Component } from "react";
import "../styles/global/Main.css";
import "../styles/independent/AdminMessages.css";
import app from "../firebase";
import moment from "moment";
import * as firebase from "firebase";
import Loader from "react-loader-spinner";

class AdminMessages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messagesID: [],
      messagesEmail: [],
      messagesBody: [],
      messagesTimeStamp: [],
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

  getMessages = () => {
    let messagesRef = firebase
      .firestore()
      .collection("messages")
      .orderBy("datetime", "asc");
    let allMessages = messagesRef
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          console.log(doc.data().datetime);
          this.setState({
            messagesID: this.state.messagesID.concat(doc.id),
            messagesEmail: this.state.messagesEmail.concat(doc.data().email),
            messagesBody: this.state.messagesBody.concat(doc.data().message),
            messagesTimeStamp: this.state.messagesTimeStamp.concat(
              JSON.stringify(doc.data().datetime.toDate())
            ),
          });
        });
      })
      .catch((err) => {
        console.log("Error getting documents", err);
      });
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
        <div className="background-div"></div>

        <h1 className="admin-messages-container-title">Admin Messages</h1>

        {this.state.messagesID.length === 0 &&
        this.state.messagesEmail.length === 0 &&
        this.state.messagesBody.length === 0 &&
        this.state.messagesTimeStamp.length ? (
          <div className="eventsLoadingContainer">
            <Loader type="TailSpin" color="#3680C1" width={50} height={50} />
          </div>
        ) : null}
        <div className="message-container-parent">
          {this.state.messagesID.map((id, index) => (
            <div key={id} className="message-container">
              <p>{this.state.messagesEmail[index]}</p>
              <p>{this.state.messagesBody[index]}</p>
              <p>{this.state.messagesTimeStamp[index]}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default AdminMessages;
