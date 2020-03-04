import React, { useCallback, useContext, Component } from "react";
import * as firebase from "firebase";
import app from "../firebase";
import { AuthContext } from "../auth";
import "../App.css";
import "../Home.css";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaw,
  faEnvelope,
  faUserCog,
  faColumns
} from "@fortawesome/free-solid-svg-icons";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.getUser(),
      isadmin: this.props.isAdmin
    };
  }

  redirectToAnimal = () => {
    const { history } = this.props;
    if (history) history.push("/animal");
  };

  redirectToContact = () => {
    const { history } = this.props;
    if (history) history.push("/contact");
  };

  redirectToProfile = () => {
    const { history } = this.props;
    if (history) history.push("/profile");
  };

  redirectToAdmin = () => {
    const { history } = this.props;
    if (history) history.push("/admin");
  };

  render() {
    let message = "Olá " + this.state.user + "!";

    return (
      <div>
        <button
          className="button signout-btn"
          onClick={() => app.auth().signOut()}
        >
          Sair
        </button>
        <div className="centered-container">
          <div className="content-container">
            <div className="hello-user">{message}</div>
            <div className="user-menu">
              {this.state.isadmin === false ? (
                <div>
                  <div
                    className="user-menu-option"
                    style={{ marginRight: 40 }}
                    onClick={this.redirectToAnimal}
                  >
                    <div className="icon-div">
                      <FontAwesomeIcon icon={faPaw} />
                    </div>
                  </div>
                  <div
                    className="user-menu-option"
                    style={{ marginRight: 40 }}
                    onClick={this.redirectToContact}
                  >
                    <div className="icon-div">
                      <FontAwesomeIcon icon={faEnvelope} />
                    </div>
                  </div>
                  <div
                    className="user-menu-option"
                    onClick={this.redirectToProfile}
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
                    style={{ float: "none", margin: "0 auto" }}
                    onClick={this.redirectToAdmin}
                  >
                    <div className="icon-div">
                      <FontAwesomeIcon icon={faColumns} />
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

  getUser = () => {
    let userVar = app.auth().currentUser.email;
    let getChar = userVar.indexOf("@");
    let userFinal = userVar.slice(0, getChar);
    return userFinal;
  };
}

export default Home;
