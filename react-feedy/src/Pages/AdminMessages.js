import React, { Component } from "react";
import "../styles/global/Main.css";
import logo from "../Images/Logo_2_1600.png";
import "../styles/independent/AdminMessages.css";
import app from "../firebase";
import moment from "moment";
import * as firebase from "firebase";
import Loader from "react-loader-spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faComment, faClock } from "@fortawesome/free-solid-svg-icons";
import MessageArchiveRequestForm from "../Views/MessageArchiveRequestForm";

class AdminMessages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messagesID: [],
      messagesEmail: [],
      messagesBody: [],
      messagesTimeStamp: [],
      messagesState: [],
      messageArchiveFormState: false,
      messageToArchive: null,
    };
  }

  changeMessageArchiveFormState = (stateTo, id) => {
    this.setState({
      messageArchiveFormState: stateTo,
    });
    if (stateTo === true) {
      this.setState({
        messageToArchive: id,
      });
    }
  };

  redirectToPage = (page) => {
    const { history } = this.props;
    if (history) history.push(page);
  };

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
      .orderBy("datetime", "desc");
    messagesRef
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          let firestoreDate = doc.data().datetime;
          let firestoreDateToDate = moment(firestoreDate.toDate()).format(
            "DD-MM-YYYY, H:mm:ss"
          );

          const finalDate = firestoreDateToDate.toString();

          if (doc.data().messageState !== "archived") {
            this.setState({
              messagesID: this.state.messagesID.concat(doc.id),
              messagesEmail: this.state.messagesEmail.concat(doc.data().email),
              messagesBody: this.state.messagesBody.concat(doc.data().message),
              messagesTimeStamp: this.state.messagesTimeStamp.concat(finalDate),
              messagesState: this.state.messagesState.concat(
                doc.data().messageState
              ),
            });
          }
        });
      })
      .catch((err) => {
        console.log("Error getting documents", err);
      });
  };

  changeMessageState = (id, index) => {
    const db = firebase.firestore();

    if (this.state.messagesState[index] === "unread") {
      db.collection("messages").doc(id).update({
        messageState: "read",
      });

      let copiedMessagesState = [...this.state.messagesState];

      copiedMessagesState[index] = "read";

      this.setState({
        messagesState: copiedMessagesState,
      });
    } else {
      db.collection("messages").doc(id).update({
        messageState: "unread",
      });

      let copiedMessagesState = [...this.state.messagesState];

      copiedMessagesState[index] = "unread";

      this.setState({
        messagesState: copiedMessagesState,
      });
    }
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

        <h1 className="admin-messages-container-title">Admin Messages</h1>

        {this.state.messagesID.length === 0 &&
        this.state.messagesEmail.length === 0 &&
        this.state.messagesBody.length === 0 &&
        this.state.messagesTimeStamp.length === 0 ? (
          <div className="eventsLoadingContainer">
            <Loader type="TailSpin" color="#3680C1" width={50} height={50} />
          </div>
        ) : null}
        <div className="message-container-parent">
          {this.state.messagesID.map((id, index) => (
            <div
              key={id}
              className={
                "message-container " +
                (this.state.messagesState[index] === "read"
                  ? "message-read"
                  : "message-unread")
              }
            >
              <div style={{ paddingTop: "20px", paddingLeft: "20px" }}>
                <FontAwesomeIcon icon={faUser} style={{ color: "#1466ae" }} />{" "}
                {this.state.messagesEmail[index]}
              </div>
              <div
                style={{
                  paddingTop: "10px",
                  paddingLeft: "20px",
                }}
              >
                <FontAwesomeIcon
                  icon={faComment}
                  style={{ color: "#1466ae" }}
                />{" "}
                {this.state.messagesBody[index]}
              </div>
              <div style={{ paddingTop: "10px", paddingLeft: "20px" }}>
                <FontAwesomeIcon icon={faClock} style={{ color: "#1466ae" }} />{" "}
                {this.state.messagesTimeStamp[index]}
              </div>
              <button
                className="button"
                style={{
                  width: "200px",
                  backgroundColor: "#1466ae",
                  color: "#fff",
                  marginTop: "10px",
                  marginLeft: "20px",
                }}
                onClick={() => this.changeMessageState(id, index)}
              >
                {this.state.messagesState[index] === "read"
                  ? "Marcar como não lida"
                  : "Marcar como lida"}
              </button>
              <button
                className="button"
                style={{
                  width: "100px",
                  backgroundColor: "#910000",
                  color: "#fff",
                  marginTop: "10px",
                  marginLeft: "10px",
                }}
                onClick={() => this.changeMessageArchiveFormState(true, id)}
              >
                Arquivar
              </button>
            </div>
          ))}
        </div>
        {this.state.messageArchiveFormState === true ? (
          <MessageArchiveRequestForm
            messageBeingArchived={this.state.messageToArchive}
            closeForm={() => this.changeMessageArchiveFormState(false, null)}
          />
        ) : null}
      </div>
    );
  }
}

export default AdminMessages;
