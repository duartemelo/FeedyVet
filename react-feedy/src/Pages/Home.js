import React, { Component } from "react";
import app from "../firebase";
import "../styles/global/Main.css";
import "../styles/independent/Home.css";
import logo from "../Images/Logo_2_1600.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaw,
  faEnvelope,
  faUserCog,
  faColumns,
  faCog,
} from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.getUser(),
      isadmin: this.props.isAdmin,
      unReadMessagesCounter: 0,
    };
  }

  //redirecionar para pagina, recebe parametro com a página quando chamada
  redirectToPage = (page) => {
    const { history } = this.props;
    if (history) history.push(page);
  };

  getUnreadMessagesNumber = () => {
    let currentComponent = this;
    const messagesRef = app
      .firestore()
      .collection("messages")
      .orderBy("datetime", "desc");
    messagesRef.get().then((snapshot) => {
      snapshot.forEach((doc) => {
        if (doc.data().messageState === "unread") {
          currentComponent.setState({
            unReadMessagesCounter:
              currentComponent.state.unReadMessagesCounter + 1,
          });
        }
      });
    });
  };

  componentDidMount() {
    this.getUnreadMessagesNumber();
  }

  render() {
    let message = "Olá " + this.state.user + "!";

    return (
      <div>
        <div className="centered-container">
          <a onClick={() => this.redirectToPage("/")}>
            <img
              src={logo}
              alt="Logo"
              className="feedy-logo-img logo-no-index"
              style={{ marginLeft: "60px" }}
            ></img>
          </a>

          <button
            className="button signout-btn"
            onClick={() => app.auth().signOut()}
          >
            Sair
          </button>
          <div className="content-container">
            <div className="hello-user">{message}</div>
            <div className="user-menu">
              {/* caso o user nao seja admin, mostra uma serie de botoes, caso seja admin mostra o botao para ir para o painel de admin */}
              {this.state.isadmin === false ? (
                <div>
                  <div
                    className="user-menu-option"
                    style={{ marginRight: 40 }}
                    onClick={() => this.redirectToPage("/animal")}
                  >
                    <div className="icon-div">
                      <FontAwesomeIcon icon={faPaw} />
                    </div>
                  </div>
                  <div
                    className="user-menu-option"
                    style={{ marginRight: 40 }}
                    onClick={() => this.redirectToPage("/contact")}
                  >
                    <div className="icon-div">
                      <FontAwesomeIcon icon={faEnvelope} />
                    </div>
                  </div>
                  <div
                    className="user-menu-option"
                    onClick={() => this.redirectToPage("/profile")}
                  >
                    <div className="icon-div">
                      <FontAwesomeIcon icon={faUserCog} />
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div
                    className="user-menu-option"
                    style={{ marginRight: 40 }}
                    onClick={() => this.redirectToPage("/admin")}
                  >
                    <div className="icon-div">
                      <FontAwesomeIcon icon={faColumns} />
                    </div>
                  </div>
                  <div
                    className="user-menu-option"
                    style={{ marginRight: 40 }}
                    onClick={() => this.redirectToPage("/adminmessages")}
                  >
                    <div className="icon-div">
                      <FontAwesomeIcon icon={faEnvelope} />
                    </div>
                    {this.state.unReadMessagesCounter}
                  </div>
                  <div
                    className="user-menu-option"
                    style={{ marginRight: 40 }}
                    onClick={() => this.redirectToPage("/adminsettings")}
                  >
                    <div className="icon-div">
                      <FontAwesomeIcon icon={faCog} />
                    </div>
                  </div>
                  <div
                    className="user-menu-option"
                    onClick={() => this.redirectToPage("/profile")}
                  >
                    <div className="icon-div">
                      <FontAwesomeIcon icon={faUserCog} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  //obter o nome do utilizador, removendo o "@mail.com"
  getUser = () => {
    if (app.auth().currentUser.displayName !== null) {
      return app.auth().currentUser.displayName;
    } else {
      let userVar = app.auth().currentUser.email;
      let getChar = userVar.indexOf("@");
      let userFinal = userVar.slice(0, getChar);
      return userFinal;
    }
  };
}

export default Home;
